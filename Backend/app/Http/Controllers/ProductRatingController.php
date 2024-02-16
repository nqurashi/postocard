<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\ProductRating;
use Illuminate\Http\Request;
use App\Http\Requests\ProductRatingRequest;
use Illuminate\Support\Facades\Auth;

class ProductRatingController extends Controller
{
    public function index($productId)
    {
        $ratingCounts = [
            '1_star' => ProductRating::where('product', $productId)->where('rating', 1)->count(),
            '2_star' => ProductRating::where('product', $productId)->where('rating', 2)->count(),
            '3_star' => ProductRating::where('product', $productId)->where('rating', 3)->count(),
            '4_star' => ProductRating::where('product', $productId)->where('rating', 4)->count(),
            '5_star' => ProductRating::where('product', $productId)->where('rating', 5)->count(),
            'total_ratings' => ProductRating::where('product', $productId)->count(),
        ];

        $totalRatingsSum = ProductRating::where('product', $productId)->sum('rating');
        $totalRatings = $ratingCounts['total_ratings'];

        $averageRating = ($totalRatings > 0) ? ($totalRatingsSum / $totalRatings) : 0;
        $averageRating = round($averageRating, 1);

        $ratingCounts['average_rating'] = $averageRating;

        return response()->json([
            'status' => true,
            'message' => 'Product Rating Created Successfully.',
            'data' => $ratingCounts,
        ], 200);
    }

    public function storeProductRating(ProductRatingRequest $request, $productId)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Unauthorized',
            ], 400);
        }

        $productRating = ProductRating::updateOrCreate([
            'user_id' => $user->id,
            'product' => $productId,
        ], [
            'rating' => $request->rating,
            'review' => $request->review,
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Product Rating Created Successfully.',
            'data' => $productRating,
        ], 200);
    }

}
