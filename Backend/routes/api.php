<?php

use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\FulfillmentController;
use App\Http\Controllers\Api\ImageProcessing;
use App\Http\Controllers\Api\OrderPrcessing;
use App\Http\Controllers\Api\PaymentHandling;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UserAddressController;
use App\Http\Controllers\ProductRatingController;
use App\Http\Controllers\Api\PackageController;
use App\Http\Controllers\Vendor\VendorController;
use App\Http\Controllers\PackageUsesController;
use Illuminate\Http\Request;
use App\Models\UserAddress;
use App\Models\PackageUses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ResetPasswordController;




Route::post('/guest/cart/order/success', [OrderPrcessing::class, 'OrderCheckout']);


Route::post('/cart/get',[CartController::class, 'GetCart']);

// Product List
Route::get('/product/list', [ProductController::class, 'ProductList']);
Route::get('/product/adminlist', [ProductController::class, 'ProductListAdmin']);



Route::middleware('auth:sanctum')->group(function(){

    //User Urls
    Route::get('/user', function (Request $request) {
        $user = $request->user();

        $packageUses = PackageUses::where('user_id', $user->id)
        ->with('package')
        ->get();
        $user['package'] = $packageUses;
        return response()->json([
            'user' => $user
        ]);
    });

    Route::get('/check', function(){
        return(['Data'=>'123']);
    });

    Route::get('/verify/token', [FulfillmentController::class, 'verifyToken']);


});

    // Create Product
    Route::get('/product/{id}', [ProductController::class, 'SingleProduct']);
    Route::get('/nav/category/list', [ProductController::class, 'NavCategoryList']);

        // Order Process Complete
    Route::get('/user/shopping-cart/{userId}', [CartController::class, 'CartUserWithAddress']);

    // Category And SubCategory
    Route::get('/category/list', [ProductController::class, 'CategoryList']);
    Route::get('/subcategory/list', [ProductController::class, 'SubCategoryList']);


    // Cart Product
    Route::post('/cart/add',[CartController::class, 'AddToCart']);
    Route::post('/cart/create',[CartController::class, 'CreateCart']);
    Route::post('/cart/delete',[CartController::class, 'DeleteItem']);

    // User Shopping Cart
    // Route::get('/user/shopping-cart', [CartController::class, 'show']);


    // Vendor Login
    Route::post('/vendor/login', [FulfillmentController::class,'vendorLogin']);

    // Resister And Login
    Route::post('/login', [UserApiController::class,'UserLogin']);
    Route::post('/register', [RegisteredUserController::class, 'store']);

    // Show Packages
    Route::resource('/user/packages', PackageController::class);

Route::middleware(['auth:sanctum', 'check.role:admin'])->group(function () {

    // Product Assign to Artist
    Route::get('/products', [ProductController::class, 'getProductListWithArtists']);

    // Artist
    Route::post('/artist/create', [AdminController::class, 'createArtist']);
    Route::get('/artists', [AdminController::class, 'getArtists']);
    Route::get('/artist/{id}', [AdminController::class, 'getArtist']);
    Route::put('/artist/{id}', [AdminController::class, 'updateArtist']);
    Route::delete('/artist/{id}', [AdminController::class, 'deleteArtist']);

    // Vendor Create
    Route::post('/admin/vendor/create', [FulfillmentController::class,'CreateVendor']);
    Route::get('/admin/vendor/list', [FulfillmentController::class,'VendorList']);
    Route::post('/admin/vendor/assign', [FulfillmentController::class,'AssigntoVendor']);
    Route::get('/vendor/assigned-orders', [FulfillmentController::class, 'getAssignedOrders']);
    Route::post('vendor/order/status/update',[FulfillmentController::class,'UserUpdateOrderStatus']);


    // Card Image Download
    Route::post('/admin/order/images',[ImageProcessing::class,'OrderPrintingImages']);


    // Product List , Order Status Update
    Route::post('admin/order/status/update',[FulfillmentController::class,'UpdateOrderStatus']);

    // update Card Bought Count , update Package
    Route::post('/update-card-bought-count/{cartId}', [CartController::class, 'updateCardBoughtCount']);
    Route::post('/update-package', [UserApiController::class, 'updatePackage']);

    // Packages Create
    Route::resource('/admin/packages', PackageController::class);
    Route::get('/packages/{id}/transactions', [PackageController::class, 'transactionsHistory']);
    Route::get('/package_uses', [PackageUsesController::class, 'index']);
    Route::get('admin/users_with_package_uses', [PackageUsesController::class, 'showAllUsersWithPackageUses']);

    Route::get('transactions', [AdminController::class, 'index']);
    Route::get('transactions/{id}', [AdminController::class, 'show']);

    Route::get('/admin/user-list', [UserApiController::class, 'getUserList']);
    Route::get('admin/useraddresses', [UserApiController::class, 'showAllUserAddresses'])
    ->name('useraddresses.index');
    Route::patch('admin/useraddresses/{userAddress}/toggle-status', [UserApiController::class, 'toggleUserAddressStatus'])
   ->name('useraddresses.toggleStatus');
    Route::patch('admin/user-address/{userAddress}', 'Api\UserApiController@toggleEnableDisable');
    Route::get('/admin/orders', [OrderPrcessing::class,  'AdminOrders']);
    Route::patch('/admin/users/{user}/toggleactivation', [UserApiController::class, 'toggleEnableDisable'])
    ->name('admin.users.toggleActivation');
    Route::get('admin/all-orders', [UserApiController::class, 'getAllOrders'])->name('all.orders');

    Route::get('admin/user-analytics', [UserApiController::class, 'getUserAnalytics']);
    Route::get('admin/user-spending', [UserApiController::class, 'getUserSpending']);
    Route::get('admin/user-payment-method', [UserApiController::class, 'getUserPaymentMethod']);

    //Category
    Route::post('/category/create',[ProductController::class, 'CategoryCreate'] );

    //SubCategory
    Route::post('/subcategory/create',[ProductController::class, 'SubCategoryCreate'] );// admin

});

Route::middleware(['auth:sanctum', 'check.role:user'])->group(function () {

    // User Can Upgrate Package
    Route::post('/upgrade-package/{package_id}', [PackageUsesController::class, 'upgradePackage']);

    Route::post('/cart/order/success', [OrderPrcessing::class, 'OrderCheckout']);
    Route::post('/cart/paypal/order/PaymentVerified/{order_id}', [OrderPrcessing::class, 'verifyPayPalOrder']);


    // User Address
    Route::get('/user/addresses', [UserAddressController::class, 'index']);
    Route::post('/user-address/store', [UserAddressController::class, 'store']);
    Route::put('/user-address/update/{userAddressId}', [UserAddressController::class, 'update']);
    Route::delete('/user-address/delete/{userAddressId}', [UserAddressController::class, 'destroy']);

    // User Order
    Route::get('/user/orders', [UserApiController::class, 'index']);

     //Product Urls
    Route::post('/product/create',[ProductController::class, 'ProductCreate'] );
    Route::get('/product/list/admin', [ProductController::class, 'ProductListAdmin']);

    Route::post('/product/edit', [ProductController::class, 'ProductEdit']);
    Route::post  ('/product-discount/{id}', [ProductController::class, 'updateOrCreate']);

    Route::post('/payment/make', [PaymentHandling::class,  'MakePayment'])->name('MakePayment');
    Route::get('/payment/cancel', [PaymentHandling::class,  'CancelPayment'])->name('CancelPayment');
    Route::get('/payment/success', [PaymentHandling::class,  'SuccessPayment'])->name('SuccessPayment');


    // Rating at Product
    Route::get('/products/{productId}/ratings', [ProductRatingController::class, 'index']);
    Route::post('/products/{productId}/ratings', [ProductRatingController::class, 'storeProductRating']);

    // Logout , Password Reset , Password Update , Profile Update
    Route::post('/logout', [AuthenticationController::class, 'logout']);
    Route::post('/forget-password', [UserApiController::class, 'resetPassword']);
    Route::post('/user/update-password', [UserApiController::class, 'updatePassword']);
    Route::post('/user/update-profile', [UserApiController::class, 'updateProfile']);
});

Route::middleware(['auth:sanctum', 'check.role:employee'])->group(function () {

});
