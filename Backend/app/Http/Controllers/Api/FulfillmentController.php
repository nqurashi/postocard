<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItems;
use App\Models\Vendors;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\PersonalAccessTokenResult;

class FulfillmentController extends Controller
{

    function CreateVendor(Request $request) {
        try {
            $request->validate([
                'VendorName' => 'required',
                'Address' => 'required',
                'Rate' => 'required',
                'Email' => 'required|email|unique:vendors',
                'BankAccountNo' => 'required',
                'ContactNumber' => 'required',
            ]);

            $existingVendor = Vendors::where('Email', $request->Email)->first();

            if ($existingVendor) {
                return response()->json(['status' => false, 'message' => 'Email already exists'], 422);
            }

            $NV = new Vendors;
            $NV->VendorName = $request->VendorName;
            $NV->Address = $request->Address;
            $NV->Rate = $request->Rate;
            $NV->Email = $request->Email;
            $NV->BankAccountNo = $request->BankAccountNo;
            $NV->ContactNumber = $request->MobileNo;

            $password = Str::random(8);
            $NV->password = $password;

            $NV->save();

            return response()->json(['message' => 'Saved Successfully', 'password' => $password], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }



function VendorList() {
    $data = Vendors::all();

    $data->makeVisible(['password']);

    return response()->json(['data' => $data], 200);
}



function AssigntoVendor(Request $request) {

    try{

        $validate = Validator::make($request->all(),
            [
                'LineId' => 'required',
                'VendorId' => 'required',

            ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'validation error',
                'errors' => $validate->errors()
            ], 401);
        }
        // return($request);
        $orderline = CartItems::find($request->LineId);

        if (!$orderline) {
            return response()->json([
                'status' => false,
                'message' => 'Order line not found',
            ], 404);
        }

        $orderline->AssignedVendor = $request->VendorId;
        $orderline->save();
        return response()->json(['message'=>'Assigned Succesfully'], 200);
    }
    catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 501);
    }


}



function UpdateOrderStatus(Request $request) {
    try {
        $Item = CartItems::find($request->OrderItemId);

        if (!$Item) {
            return response()->json([
                'status' => false,
                'message' => 'Item not found for OrderItemId ' . $request->OrderItemId
            ], 404);
        }

        $Item->Status = $request->ItemStatus;
        $Item->save();

        $AllItems = CartItems::where('CartID', $Item->CartID)->where('Status', '!=', 'Completed')->get();

        if (count($AllItems) == 0) {
            $cart = Cart::find($Item->CartID);

            if ($cart) {
                $cart->IsCompleted = true;
                $cart->save();
            }
        }

        return response()->json([
            'message' => 'Status for ItemNo ' . $request->OrderItemId . ' updated successfully to ' . $request->ItemStatus
        ], 200);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 501);
    }
}


function vendorLogin(Request $request) {
    try {
        $request->validate([
            'Email' => 'required|email',
            'password' => 'required',
        ]);

        $email = $request->input('Email');
        $password = $request->input('password');

        $vendor = Vendors::where('Email', $email)->first();

        if ($vendor && $password === $vendor->password) {
            $vendor->makeVisible(['password']);
            $token = $vendor->createToken("VendorApiToken")->plainTextToken;

            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'vendor' => $vendor,
            ], 200);
        } else {
            return response()->json(['status' => false, 'message' => 'Invalid credentials'], 401);
        }
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 501);
    }
}

public function verifyToken(Request $request)
{
    try {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['status' => false, 'message' => 'Unauthorized'], 401);
        }

        $user = Auth::user();

        if ($user) {
            $user->makeVisible(['password']);

            $packageUses = $user->packageUses()->with('package')->get();

            return response()->json([
                'status' => true,
                'message' => 'Token is valid',
                'user' => $user,
                'Packages' => $packageUses,
            ], 200);
        } else {
            return response()->json(['status' => false, 'message' => 'Unauthorized'], 401);
        }
    } catch (\Throwable $th) {
        return response()->json(['status' => false, 'message' => $th->getMessage()], 501);
    }
}


function getAssignedOrders() {
    try {
        $vendor = Auth::user();

        $assignedOrders = CartItems::
        with(['Address','ProductDetails'])
        // with('ProductDetails')
            ->where('AssignedVendor', $vendor->id)
            ->get();

        return response()->json([
            'status' => true,
            'assigned_orders' => $assignedOrders,
        ], 200);
    } catch (\Throwable $th) {
        return response()->json([
            'status' => false,
            'message' => $th->getMessage()
        ], 500);
    }
}

function UserUpdateOrderStatus(Request $request) {
    try {
        if (Auth::check()) {
            $vendorEmail = Auth::user()->Email;
            $vendor = Vendors::where('Email', $vendorEmail)->first();

            if ($vendor) {
                $orderId = $request->OrderItemId;

                $item = CartItems::find($orderId);

                if ($item && $item->AssignedVendor == $vendor->id) {
                    $item->Status = $request->ItemStatus;
                    $item->save();

                    $allItems = CartItems::where('CartID', $item->CartID)->where('Status', '!=', 'Completed')->get();

                    if (count($allItems) == 0) {
                        $cart = Cart::find($item->CartID);
                        $cart->IsCompleted = true;
                        $cart->save();
                    }

                    return response()->json(['message' => 'Status from ItemNo ' . $orderId . ' updated successfully to ' . $request->ItemStatus], 200);
                } else {
                    return response()->json(['status' => false, 'message' => 'Unauthorized. Order item not assigned to the vendor.'], 401);
                }
            } else {
                return response()->json(['status' => false, 'message' => 'Unauthorized'], 401);
            }
        } else {
            return response()->json(['status' => false, 'message' => 'Unauthorized'], 401);
        }
    } catch (\Throwable $th) {
        return response()->json(['status' => false, 'message' => $th->getMessage()], 501);
    }
}

}
