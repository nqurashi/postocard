<?php

namespace App\Http\Controllers\Api;

use \Throwable;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Orders;
use App\Models\PackageUses;
use App\Models\Transaction;
use Illuminate\Http\Request;
use PayPal\Exception\PayPalConnectionException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Srmklive\PayPal\Services\PayPal as PayPalClient;

class OrderPrcessing extends Controller
{
    public function AdminOrders() {
        try {
            $Data = Cart::where('IsCheckedOut',true)->with(['Items','Order'])->orderBy('id','desc')->get();
        return response()->json(['orders'=>$Data], 200);
        } catch (Throwable $th) {
            return response()->json(['message'=> $th->getMessage() ], 200);
        }

    }



    public function OrderCheckout(Request $request){
        try {
            $user = Auth::user();
            $validateRules = [
                'CartCode' => 'required',
                'FullName' => 'required',
                'PayerName' => 'required|string',
                'StreetAddress' => 'required',
                'City' => 'required',
                'State' => 'required',
                'Country' => 'required',
                'PaymentMethod' => 'required',
                'PostalCode' => 'required',
                'Email' => 'required',
                'Mobile' => 'required',
            ];

            if (!$user || !$user->packageUses()) {
                $validateRules['OrderId'] = 'required';
            }

            $validate = Validator::make($request->all(), $validateRules);

            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validate->errors()
                ], 401);
            }

            $user = Auth::user();

            $Ord = new Orders;
            $Ord->user_id = $user ? $user->id : null;
            $Ord->FullName = $request['FullName'];
            $Ord->StreetAddress = $request['StreetAddress'];
            $Ord->City = $request['City'];
            $Ord->State = $request['State'];
            $Ord->Country = $request['Country'];
            $Ord->PostalCode = $request['PostalCode'];
            $Ord->Email = $request['Email'];
            $Ord->Mobile = $request['Mobile'];
            $Ord->PaymentReference = $request['OrderId'];
            $Ord->PaymentMethod = $request['PaymentMethod'];

            $OrderStatus = '';

            if ($user && $user->packageUses()) {
                $packageUses = PackageUses::where('user_id', $user->id)->first();

                if ($packageUses) {
                    $cartData = Cart::where('CartCode', $request['CartCode'])->first();

                    if ($cartData) {
                        $productCount = $cartData->ProductCount;

                        if ($packageUses->count >= $productCount) {
                            $packageUses->count -= $productCount;
                            $packageUses->save();
                        } else {
                            return response()->json([
                                'status' => false,
                                'message' => 'Insufficient count. Upgrade package',
                                'remaining_count' => $packageUses->count,
                                'check_order' => true,
                            ], 400);
                        }
                    } else {
                        return response()->json(['status' => false, 'message' => 'Cart not found'], 404);
                    }

                    $OrderStatus = 'COMPLETED';
                }
                else {
                    if ($request->has('OrderId')) {
                        $provider = new PayPalClient;
                        $provider = \PayPal::setProvider();
                        $apitoken = $provider->getAccessToken();
                        $order = $provider->showOrderDetails($request->OrderId);

                        $OrderStatus = isset($order['status']) ? $order['status'] : 'Unknown';

                        if ($OrderStatus != 'COMPLETED') {
                            return response()->json([
                                'status' => false,
                                'message' => 'Payment not completed',
                                'order_status' => $OrderStatus,
                            ], 400);
                        }
                    } else {
                        if ($user && $user->packageUses()) {
                            $OrderStatus = 'COMPLETED';
                        } else {
                            $OrderStatus = 'COMPLETED';
                        }
                    }
                }
            }

            $Ord->save();

            $cartData = Cart::where('CartCode', $request['CartCode'])->first();

            if ($cartData) {
                $cart = $cartData;
                $cart->CartCode = '';
                $cart->IsCheckedOut = true;
                $cart->OrderId = $Ord->id;

                if ($OrderStatus == 'COMPLETED') {
                    $msg = 'success';
                    $cart->IsPaid = true;
                } else {
                    $msg = 'success';
                }

                $cart->save();

                $productCount = $cart->ProductCount;
                $netAmount = $cart->NetAmount;

                if ($user) {
                    $packageUses = PackageUses::where('user_id', $user->id)->first();

                    if ($packageUses) {
                        if ($packageUses->count >= $productCount) {
                            $packageUses->count -= $productCount;
                            $packageUses->save();
                        } else {
                            $remainingCount = $packageUses->count;
                            $packageUses->count -= $productCount;
                            $packageUses->save();

                            return response()->json(['status' => false, 'message' => 'Insufficient count. Upgrade package', 'remaining_count' => $packageUses->count], 400);
                        }
                    }
                }

                $transaction = new Transaction([
                    'user_id' => $user ? $user->id : null,
                    'ProductCount' => $productCount,
                    'order_created_date' => now(),
                    'amount' => $netAmount,
                    'order_id' => $Ord->id,
                ]);
                $transaction->save();

                $userDetails = $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'image' => $user->image,
                ] : null;

                return response()->json([
                    'message' => $msg,
                    'user' => $userDetails,
                    'orders' => $Ord,
                    'cart' => $cart,
                    'transaction' => $transaction,
                    'remaining_count' => isset($packageUses) ? $packageUses->count : null
                ], 200);
            } else {
                return response()->json(['status' => false, 'message' => 'Cart not found'], 404);
            }
        } catch (Throwable $th) {
            return response()->json(['message' => $th->getMessage()], 501);
        }
    }



public function verifyPayPalOrder($orderId)
{
    try {
        $provider = new PayPalClient;
        $provider = \PayPal::setProvider($provider);
        $apiToken = $provider->getAccessToken();
        $orderData = $provider->showOrderDetails($orderId);

        if (!empty($orderData) && isset($orderData['status']) && $orderData['status'] === 'COMPLETED') {
            return response()->json(['status' => true, 'message' => 'success', 'order' => $orderData], 200);
        } else {
            $orderStatus = isset($orderData['status']) ? $orderData['status'] : null;
            return response()->json(['status' => false, 'message' => 'failed', 'order_status' => $orderStatus, 'error' => 'Payment verification failed.'], 500);
        }
    } catch (\Throwable $th) {
        return response()->json(['status' => false, 'message' => 'failed', 'error' => $th->getMessage()], 500);
    }
}


}
