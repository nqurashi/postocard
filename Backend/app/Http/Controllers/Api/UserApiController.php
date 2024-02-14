<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Orders;
use App\Models\Package;
use App\Models\Cart;
use App\Models\CartItem;
use App\Http\Controllers\Api\OrderPrcessing;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\Auth\ResetPasswordRequest;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UpdateProfileRequest;

class UserApiController extends Controller
{

// For Admin
    public function getUserAnalytics()
    {
        $totalUsers = User::count();
        $activeUsers = User::where('is_active', '>', 0)->count();

        return response()->json([
            'total_users' => $totalUsers,
            'active_users' => $activeUsers,
        ]);
    }

    public function getUserSpending()
    {
        $orders = Orders::with(['user:id,name,spending,current_package'])
            ->select('id', 'user_id', 'PaymentMethod')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    public function getUserPaymentMethod()
    {
        $paymentMethods = User::select('payment_method')->distinct()->get();

        return response()->json($paymentMethods);
    }

    public function showAllUserAddresses()
    {
        try {
            $userAddresses = UserAddress::all();

            return response()->json(['userAddresses' => $userAddresses]);
        } catch (\Exception $e) {
            Log::error("Error fetching user addresses: {$e->getMessage()}");
            return response()->json(['error' => 'Failed to fetch user addresses'], 500);
        }
    }

    public function toggleUserAddressStatus(UserAddress $userAddress)
    {
        try {
            $newStatus = !$userAddress->is_enabled;

            $userAddress->update(['is_enabled' => $newStatus]);

            return response()->json(['message' => 'User address status updated successfully']);
        } catch (\Exception $e) {
            Log::error("Error updating user address status: {$e->getMessage()}");
            return response()->json(['error' => 'Failed to update user address status'], 500);
        }
    }

    public function getUserList()
    {
        $userList = User::select('id', 'name', 'email','role','created_at','is_active')->get();

        return response()->json(['userList' => $userList]);
    }

    public function toggleEnableDisable(User $user)
    {
        try {
            $user->update(['is_active' => !$user->is_active]);
            return response()->json(['message' => 'User activation status updated successfully']);
        } catch (\Exception $e) {
            Log::error("Error updating user activation status: {$e->getMessage()}");
            return response()->json(['error' => "Failed to update user activation status. Exception: {$e->getMessage()}"], 500);
        }
    }

    public function getAllOrders()
    {
        try {
            $orders = Orders::with('user')->get();

            return response()->json(['orders' => $orders]);
        } catch (\Exception $e) {
            Log::error("Error fetching all orders: {$e->getMessage()}");
            return response()->json(['error' => "Failed to fetch all orders. Exception: {$e->getMessage()}"], 500);
        }
    }


    // For User Uses

    public function updatePackage(Request $request)
    {

        $user = Auth::user();

        if (!$user) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $totalProductCount = $user->carts()->sum('ProductCount');

        if ($totalProductCount == 30) {

            User::find($userId)->update(['package_code' => $request->input('package_code')]);

            User::find($userId)->cart()->delete();

            return response()->json(['message' => 'Package updated successfully']);
        } else {
            return response()->json(['message' => 'Product count is not 30 yet']);
        }
    }

    public function index(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $orders = Orders::where('user_id', $user->id)
                ->with('cart')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'message' => 'User Order status show successfully',
                'user' => $user,
                'orders' => $orders,
            ], 200);

        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function UserLogin(Request $request) {

       try {$validateUser = Validator::make($request->all(),
            [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if($validateUser->fails()){
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validateUser->errors()
                ], 401);
            }

            if(!Auth::attempt($request->only(['email', 'password']))){
                return response()->json([
                    'status' => false,
                    'message' => 'Email & Password does not match with our record.',
                ], 401);
            }

            $user = User::where('email', $request->email)->first();

            $packageUses = $user->packageUses()->with('package')->get();

            return response()->json([
                'user' => $user,
                'Packages' => $packageUses,
                'status' => true,
                'message' => 'User Logged In Successfully',
                'token' => $user->createToken("ApiLoginToken")->plainTextToken
            ], 200);}
            catch (\Throwable $th) {
                return response()->json([
                    'status' => false,
                    'message' => $th->getMessage()
                ], 500);
            }
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        try {
            $request->user()->forceFill([
                'password' => Hash::make($request->password),
            ])->save();

            return response()->json([
                'status' => true,
                'message' => 'Reset password Successfully',
                'data' => [],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 500);
        }
    }

    public function updatePassword(Request $request)
    {
        try {
            $user = Auth::user();

            $validator = Validator::make($request->all(), [
                'old_password' => 'required',
                'new_password' => 'required|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 400);
            }

            if (!Hash::check($request->old_password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Old password is incorrect',
                ], 400);
            }

            $user->password = Hash::make($request->new_password);
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Password updated successfully',
                'data' => [],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function updateProfile(UpdateProfileRequest $request)
    {
        try {
            $user = Auth::user();

            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $user->save();

            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully',
                'data' => $user,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 500);
        }
    }
}
