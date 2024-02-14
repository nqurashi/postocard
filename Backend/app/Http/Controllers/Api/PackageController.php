<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Package;
use App\Models\User;
use App\Models\Transaction;
use App\Http\Resources\PackageResource;
use App\Http\Resources\TransactionResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Http\Response;
use App\Http\Controllers\Api\PackageController;
use Illuminate\Support\Facades\Validator;
use App\Http\Requests\PackageRequest;

class PackageController extends Controller
{

    /**
     * Retrieve the transaction history for a specific package.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */

    public function index()
    {
        return PackageResource::collection(Package::all());
    }

    public function show($id)
    {
        return new PackageResource(Package::findOrFail($id));
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'card_count' => 'required|integer',
                'package_detail' => 'array|nullable',
                'discount' => 'numeric|between:0,100',
                'price' => 'required|integer',
            ]);

            $user = auth()->user();

            $existingPackage = $user->packages()->where('name', $request->input('name'))->first();

            if ($existingPackage) {
                return response()->json([
                    'status' => false,
                    'message' => 'A package with the same name already exists. Please choose a different name.',
                ], 422);
            }

            $packageCode = $request->input('package_code', Str::random(6));

            $package = $user->packages()->create([
                'name' => $request->input('name'),
                'package_code' => $packageCode,
                'card_count' => $request->input('card_count'),
                'package_detail' => $request->input('package_detail'),
                'discount' => $request->input('discount', 0.00),
                'price' => $request->input('price'),
            ]);

            return response()->json([
                'package' => $package,
                'status' => true,
                'message' => 'Package created successfully',
            ], 200);
        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();
            if (strpos($errorMessage, 'UNIQUE constraint failed: packages.package_code') !== false) {
                $customMessage = 'Package code already exists. Please choose a different package code.';
            } else {
                $customMessage = 'An error occurred during package creation.';
            }

            return response()->json([
                'status' => false,
                'message' => $customMessage,
            ], 400);
        }
    }

public function update(Request $request, $package_id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'nullable|string|max:255',
                'card_count' => 'nullable|integer',
                'package_detail' => 'array|nullable',
                'discount' => 'numeric|between:0,100',
                'price' => 'nullable|integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $packages = Package::find($package_id);

            if (!$packages) {
                return response()->json([
                    'status' => false,
                    'message' => 'Package not found.',
                ], 404);
            }

            $packages->name = $request->has('name') ? $request->name : $packages->name;
            $packages->card_count = $request->input('card_count', $packages->card_count);
            $packages->package_detail = $request->input('package_detail', $packages->package_detail);
            $packages->discount = $request->input('discount', $packages->discount);
            $packages->price = $request->input('price', $packages->price);
            $packages->updated_at = \Carbon\Carbon::now();

            $packages->save();

            return response()->json([
                'status' => true,
                'message' => 'Package updated successfully.',
                'package' => $packages,
            ], 200);


        } catch (\Exception $e) {
            // Handle exceptions
            $errorMessage = $e->getMessage();

            return response()->json([
                'status' => false,
                'message' => 'An error occurred during package update: ' . $errorMessage,
            ], 500);
        }
    }

// public function update(PackageRequest $request, Package $Package)
// {
//     $Package->update($request->safe()->all());
//     $response = new PackageResource($Package);

//     return $this->sendResponse($response, 'Package Updated Successfully');
// }


    public function destroy($id)
    {
        $package = Package::find($id);

        if (!$package) {
            return response()->json(['message' => 'Package not found'], 400);
        }

        $package->delete();

        return response()->json(null, 200);
    }

}
