<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\Order;
use App\Models\Transaction;
use App\Http\Controllers\Api\OrderPrcessing;
use Illuminate\Support\Facades\Log;
use App\Models\Artist;


class AdminController extends Controller
{
    public function usersOrders()
    {
        try {
            if (!Auth::check()) {
                return response()->json(['error' => 'Unauthorized'], 401);
            }

            $user = Auth::user();

            Log::info("User Roles: " . $user->roles->pluck('name')->implode(', '));

            if ($user->roles->contains('name', 'admin') || $user->roles->contains('name', 'employe')) {
                $orders = Order::with('user')->orderBy('order_date', 'desc')->get();

                return response()->json(['orders' => $orders]);
            } else {
                return response()->json(['error' => 'Permission denied'], 403);
            }
        } catch (\Exception $e) {
            Log::error("Error fetching orders: {$e->getMessage()}");

            return response()->json(['error' => 'Failed to fetch orders'], 500);
        }
    }

    public function index()
    {
        $transactions = Transaction::with(['user', 'cart'])->get();

        $formattedTransactions = $transactions->map(function ($transaction) {
            return [
                'id' => $transaction->id,
                'user' => $transaction->user ? [
                    'id' => $transaction->user->id,
                    'name' => $transaction->user->name,
                    'email' => $transaction->user->email,
                    'image' => $transaction->user->image,
                ] : null,
                'ProductCount' => $transaction->cart->ProductCount,
                'order_created_date' => $transaction->order_created_date,
                'amount' => $transaction->cart->amount,
            ];
        });

        return response()->json(['data' => $formattedTransactions]);
    }


    public function show($id)
    {
        $transaction = Transaction::with(['user', 'cart'])->find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 400);
        }

        return response()->json(['data' => $transaction]);
    }


    public function createArtist(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:artists',
        ]);

        $existingArtist = Artist::where('Email', $request->Email)->first();

        if ($existingArtist) {
            return response()->json(['status' => false, 'message' => 'Email already exists'], 422);
        }

        $artist = Artist::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ]);

        return response()->json($artist, 200);
    }

    public function getArtists()
    {
        $artists = Artist::all();

        return response()->json($artists);
    }

    public function getArtist($id)
    {
        $artist = Artist::find($id);

        if (!$artist) {
            return response()->json(['message' => 'Artist not found'], 400);
        }

        return response()->json($artist);
    }

    public function updateArtist(Request $request, $id)
    {
        $artist = Artist::find($id);

        if (!$artist) {
            return response()->json(['message' => 'Artist not found'], 400);
        }

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:artists,email,' . $id,
        ]);

        $artist->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ]);

        return response()->json($artist);
    }

    public function deleteArtist($id)
    {
        $artist = Artist::find($id);

        if (!$artist) {
            return response()->json(['message' => 'Artist not found'], 400);
        }

        $artist->delete();

        return response()->json(['message' => 'Artist deleted successfully']);
    }
}
