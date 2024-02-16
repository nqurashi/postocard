<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserAddressRequest;
use App\Http\Requests\UpdateUserAddressRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserAddressResource;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\Response;

class UserAddressController extends Controller
{

    public function index()
    {
        $userId = Auth::id();

        $userAddresses = UserAddress::where('user_id', $userId)->latest()->paginate(10);

        if ($userAddresses->isEmpty()) {
            return $this->sendResponse([], 'No specific addresses found for the user.');
        }

        $response = UserAddressResource::collection($userAddresses);

        return $this->sendResponse($response, 'User addresses retrieved successfully.');
    }

    protected function sendResponse($data, $message = 'Success', $statusCode = 200)
    {
        return response([
            'message' => $message,
            'data' => $data,
        ], $statusCode);
    }

    public function store(UserAddressRequest $request)
    {
        $user = auth()->user();

        $userAddress = $user->userAddress()->create($request->safe()->all());

        if ($request->has('associate_with_cart_item') && $request->associate_with_cart_item) {
            $cartItemId = $request->input('cart_item_id');
            $shoppingCartItem = ShoppingCartItem::find($cartItemId);

            if ($shoppingCartItem) {
                $shoppingCartItem->userAddress()->associate($userAddress);
                $shoppingCartItem->save();
            }
        }

        $response = new UserAddressResource($userAddress);

        return $this->sendResponse($response, 'Address created successfully');
    }

    public function update(Request $request, $id)

    {
        try {
            $validatedData = $request->validate([
                'full_name' => 'nullable|string|max:255',
                'country' => 'nullable|string|max:255',
                'address_name' => 'nullable|string|max:255',
                'city' => 'nullable|string|max:255',
                'street_address' => 'nullable|string|max:255',
                'town' => 'nullable|string|max:255',
                'state' => 'nullable|string|max:255',
                'postal_code' => 'nullable|max:20',
                'phone' => 'nullable|max:20',
            ]);

            $resource = UserAddress::findOrFail($id);

            if ($request->has('dissociate_from_cart_item') && $request->dissociate_from_cart_item) {
                $userAddress->shoppingCartItem()->dissociate();
            }

            $resource->update($validatedData);

            $message = 'Address updated successfully';
            $response = ['result' => $resource, 'message' => $message];

            return response()->json($response, Response::HTTP_OK);
        } catch (\Exception $e) {
            $message = 'Error updating Address: ' . $e->getMessage();
            return response()->json(['message' => $message], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    // public function update(Request $request, $id)
    // {
    //     // dd([
    //     //     'request_data' => $request->all(),
    //     //     'id' => $id,
    //     // ]);
    //     $validatedData = [
    //         'full_name' => $request->input('full_name'),
    //         'country' => $request->input('country'),
    //         'address_name' => $request->input('address_name'),
    //         'street_address' => $request->input('street_address'),
    //         'city' => $request->input('city'),
    //         'town' => $request->input('town'),
    //         'state' => $request->input('state'),
    //         'postal_code' => $request->input('postal_code'),
    //         'phone' => $request->input('phone'),
    //     ];

    //     $validator = validator($validatedData, [
    //         'full_name' => 'required',
    //         'country' => 'required',
    //         'address_name' => 'required',
    //         'street_address' => 'required',
    //         'city' => 'required',
    //         'town' => 'required',
    //         'state' => 'required',
    //         'postal_code' => 'required',
    //         'phone' => 'required',
    //     ]);

    //     if ($validator->fails()) {
    //         return response()->json(['errors' => $validator->errors()], 422);
    //     }

    //     $address = UserAddress::find($id);

    //     if ($address) {
    //         $address->update($request->all());
    //         return response()->json(['message' => 'User address updated successfully'], Response::HTTP_OK);
    //     } else {
    //         return response()->json(['message' => 'User address not found'], Response::HTTP_NOT_FOUND);
    //     }

    // }

    // public function update(UpdateUserAddressRequest $request, UserAddress $userAddress)
    // {

    //     $userAddress->update($request->safe()->all());

    //     $response = new UserAddressResource($userAddress->refresh());

    //     return $this->sendResponse($response,'Address updated successfully');
    // }
    // public function update(UserAddressRequest $request, $userAddressId)
    // {
    //     dd($userAddressId);
    //     $userAddress = Auth::user()->userAddress()->find($userAddressId);

    //     if (!$userAddress) {
    //         return $this->sendError('Not Found', 'User address not found.', 404);
    //     }

        // $validatedData = $request->validated();

        // $userAddress->update($validatedData);

        // $response = new UserAddressResource($userAddress);

    //     return $this->sendResponse($response, 'Address updated successfully');
    // }
    // public function updateOrCreateUserAddress(UserAddressRequest $request, $userAddressId = null)
    // {
    //     $user = Auth::user();

    //     if (!$user) {
    //         return response()->json(['error' => 'Unauthenticated.'], 400);
    //     }

    //     $request->merge($request->except('user_id'));


    //     if ($userAddressId) {
    //         $userAddress = $user->userAddress()->find($userAddressId);

    //         if (!$userAddress) {
    //             return response()->json(['error' => 'User Address not found.'], 40);
    //         }

    //         $userAddress->update($request->all());
    //         $message = 'User Address Updated Successfully';
    //     } else {
    //         $userAddress = $user->userAddress()->create($request->all());
    //         $message = 'User Address Added Successfully';
    //     }

    //     $response = new UserAddressResource($userAddress);

    //     return response()->json(['result' => $response, 'message' => $message], Response::HTTP_OK);
    // }

    public function destroy($userAddressId)
    {
        $userAddress = Auth::user()->userAddress()->find($userAddressId);

        if (!$userAddress) {
            return $this->sendError('Not Found', 'User address not found.', 404);
        }

        $userAddress->delete();

        return $this->sendResponse([], 'Address deleted successfully');
    }
}
