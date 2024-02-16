<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Orders;
use App\Models\UserAddress;

class VendorController extends Controller
{
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
            $orders = Orders::with(['user'])->get();

            return response()->json(['orders' => $orders]);
        } catch (\Exception $e) {
            Log::error("Error fetching all orders: {$e->getMessage()}");
            return response()->json(['error' => "Failed to fetch all orders. Exception: {$e->getMessage()}"], 500);
        }
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

    public function getUserAnalytics()
    {
        $totalUsers = User::count();
        $activeUsers = User::where('spending', '>', 0)->count();

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

        public function showAllUsersWithPackageUses()
    {
        try {
            $usersWithPackageUses = User::with('packageUses.package')->get();

            return response()->json([
                'status' => true,
                'users_with_package_uses' => $usersWithPackageUses,
            ], 200);

        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();

            return response()->json([
                'status' => false,
                'message' => 'An error occurred while retrieving users and their package uses: ' . $errorMessage,
            ], 500);
        }
    }
}
