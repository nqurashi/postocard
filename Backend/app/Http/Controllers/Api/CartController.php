<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\User;
use App\Models\CartItems;
use App\Models\ProductList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CartController extends Controller
{
    public function CreateCart(){

        $CartCode = Str::random(32).time();
        $cartcount = Cart::where('CartCode',$CartCode)->count();
        if($cartcount > 0){
            $CartCode = Str::random(32).time();
        }

        $cart = new Cart;
        $cart->CartCode = $CartCode;
        $cart->save();
        return($CartCode);
    }

    public function AddToCart(Request $request) {

        try
            {
                if ($request->CartCode) {
                    $CartCode = $request->CartCode;
                }
                else {
                    $CartCode = $this->CreateCart();
                }

            $cart = Cart::where('CartCode',$CartCode)->where('IsCheckedOut',false)->get();

            if(count($cart)==0){
                $cart = new Cart;
                $cart->CartCode = $CartCode;
                $cart->save();
            }else{
                $cart = $cart[0];
            }
            // return($cart);
            $prod = ProductList::find($request->ProductId);
            if (!$prod) {
                return response()->json([
                    'status' => false,
                    'message' => 'Product_id not found',
                ], 404);
            }

            $Discount = $prod->Discount;
            // Adding Items
            $item = new CartItems;
            $item->Product = $prod->id;
            $item->CartID = $cart->id;
            $item->GrossAmount = $prod->Price;
            $item->Discount = $Discount;
            $item->NetAmount = $prod->Price-$Discount;
            $item->Message = $request->Message;
            // $item->Signature = $request->Signature;
            if ($request->NewAddress != true) {
                $item->user_address_id = $request->user_address_id;
            }
            $item->FullName = $request->FullName;
            $item->StreetAddress = $request->StreetAddress;
            $item->City = $request->City;
            $item->State = $request->State;
            $item->Country = $request->Country;
            $item->MobileNo = $request->MobileNo;
            $item->NewAddress = true;
            $item->save();
            // Editing The Cart
            $SCart = Cart::find($cart->id);
            $SCart->GrossAmount += $prod->Price;
            $SCart->Discount += $Discount;
            $SCart->NetAmount += $prod->Price-$Discount;
            $SCart->ProductCount += 1;
            $SCart->save();

            $Cdata =  Cart::where('CartCode',$CartCode)->get();
            $data = $this->CartWithItems($Cdata[0]->id);
            return response()->json(['status'=> true,'message'=>'Product Added','data'=>['Items'=>$data,'CartData'=>$Cdata[0],'Discount' => $Discount,]], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }


    public function GetCart(Request $request) {
        try{
        $Cdata = Cart::where('CartCode',$request->CartCode)->get(['id','NetAmount','Discount','GrossAmount']);
        // return($data);
        $data = $this->CartWithItems($Cdata[0]->id);
        return response()->json(['data'=>['Items'=>$data,'CartData'=>$Cdata[0]],'message'=>'Cart Fetch'], 200);}
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }

    public function DeleteItem(Request $request) {
        try{

            $item = CartItems::find($request->ItemId);
            $Cart = Cart::find($item->CartID);
            $Cart->GrossAmount -= $item->GrossAmount;
            $Cart->Discount -= $item->Discount;
            $Cart->NetAmount -= $item->NetAmount;
            $Cart->save();
            $item->delete();
            return response()->json(['message'=>'Item Deleted'], 200);
        }
        catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }

    public function CartWithItems($CartId) {
        $data =CartItems::where('CartID',$CartId)->with('ProductDetails')->get();
        return($data);
    }

    public function CartUserWithAddress($userId)
    {
        $user = User::findOrFail($userId);

        $userAddresses = $user->addresses()->with('shoppingCartItems')->get();

        return response()->json(['user_addresses' => $userAddresses]);
    }
}
