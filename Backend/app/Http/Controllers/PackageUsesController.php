<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Package;
use App\Models\User;
use App\Models\Orders;
use App\Models\PackageUses;
use Illuminate\Support\Facades\DB;

class PackageUsesController extends Controller
{

    public function showAllUsersWithPackageUses()
    {
        try {
            $usersWithPackageUses = User::with('packageUses.package')->get();

            return response()->json([
                'status' => true,
                'users_with_package_uses' => $usersWithPackageUses,
            ], 200);

        } catch (\Exception $e) {
            // Handle exceptions
            $errorMessage = $e->getMessage();

            return response()->json([
                'status' => false,
                'message' => 'An error occurred while retrieving users and their package uses: ' . $errorMessage,
            ], 500);
        }
    }

    public function index()
    {
        try {
            $user = auth()->user();

            $packageUses = $user->packageUses()->with('package')->get();

            return response()->json([
                'status' => true,
                'package_uses' => $packageUses,
            ], 200);

        } catch (\Exception $e) {
            // Handle exceptions
            $errorMessage = $e->getMessage();

            return response()->json([
                'status' => false,
                'message' => 'An error occurred while retrieving package uses: ' . $errorMessage,
            ], 500);
        }
    }



    public function upgradePackage(Request $request, $package_id)
    {
        try {
            $request->validate([
                'card_count' => 'nullable|integer',
                'package_detail' => 'array|nullable',
            ]);

            $user = auth()->user();
            $package = Package::find($package_id);

            if (!$package) {
                return response()->json([
                    'status' => false,
                    'message' => 'Package not found.',
                ], 404);
            }

                if ($user->packageUses()->where('package_id', $package->id)->exists()) {
                    return response()->json([
                        'status' => false,
                        'message' => 'You are already subscribed to this package.',
                    ], 400);
                }
            $totalProductCount = $package->card_count;

            $subscriptionData = [
                'package_id' => $package->id,
                'count' => $totalProductCount,
                'details' => json_encode($package->package_detail),
            ];

            $subscription = $user->packageUses()->updateOrCreate(
                ['user_id' => $user->id],
                $subscriptionData
            );

            return response()->json([
                'subscription' => $subscription,
                'status' => true,
                'message' => 'You have successfully subscribed to this package.',
            ], 200);

        } catch (\Exception $e) {
            // Handle exceptions
            $errorMessage = $e->getMessage();

            return response()->json([
                'status' => false,
                'message' => 'An error occurred during subscription upgrade: ' . $errorMessage,
            ], 500);
        }
    }
}

