<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CategoryList;
use App\Models\ProductList;
use App\Models\SubCategoryList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Artist;

class ProductController extends Controller
{

    public function getProductListWithArtists()
    {
        $products = ProductList::with('artist')->get();

        return response()->json(['products' => $products]);
    }

    public function ProductCreate(Request $request)
    {
        // return($request);
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'ProductName' => 'required',
                    'Price' => "required",
                    'SubCategory' => "required",
                    'File1' => 'required|image|mimes:jpeg,png,jpg',
                    'File2' => 'required|image|mimes:jpeg,png,jpg',
                    // 'File3' => 'required|image|mimes:jpeg,png,jpg',
                    // 'File4' => 'required|image|mimes:jpeg,png,jpg',
                    'artist_id' => 'sometimes|exists:artists,id',

                ]
            );

            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }



            // return($path);
            $FileName1 = $imageName = time() . '-file1.' . $request->File1->extension();
            $FileName2 = $imageName = time() . '-file2.' . $request->File2->extension();
            // $FileName3 = $imageName = time() . '-file3.' . $request->File3->extension();
            // $FileName4 = $imageName = time() . '-file4.' . $request->File4->extension();

            // $request->File1->move($path,$FileName1);

            Storage::putFileAs("CardImages/", $request->File1, $FileName1);
            Storage::putFileAs("CardImages/", $request->File2, $FileName2);
            // Storage::putFileAs("CardImages/", $request->File3,$FileName3);
            // Storage::putFileAs("CardImages/", $request->File4,$FileName4);

            // $fileurl = Storage::url("CardImages/".$FileName1);
            // return($fileurl);
            $Product = new ProductList;
            $Product->ProductName = $request['ProductName'];
            $Product->Price = $request['Price'];
            $Product->SubCateogry = $request['SubCategory'];
            $Product->UploadedBy = $request->user()->name;
            $Product->UpdatedBy = $request->user()->name;
            $Product->File1 = $FileName1;
            $Product->File2 = $FileName2;
            // $Product->File3 = $FileName3;
            // $Product->File4 = $FileName4;
            $artist = Artist::find($request->artist_id);
            $Product->artist_id = $artist ? $artist->id : null;

            $Product->save();
            // ProductList::insert([
            //     'ProductName' => $request['ProductName'],
            //     'Price' => $request['Price'],
            //     'SubCateogry' => 1,
            //     'UploadedBy' => $request->user()->name,
            //     'UpdatedBy' => $request->user()->name,
            //     'File1' => $FileName1,
            //     'File2' => $FileName2,
            //     'File3' => $FileName3,
            //     'File4' => $FileName4,
            // ]);
            $productWithArtist = ProductList::with('artist')->find($Product->id);

            return response()->json([
                'status' => true,
                'message' => 'Product successfully saved!',
                'product' => $productWithArtist,
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage(),
            ], 501);
        }
    }

    public function ProductEdit(Request $request)
    {
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'ProductId' => 'required',
                    'ProductName' => 'required',
                    'Price' => "required",
                    'SubCategory' => "required",
                    'IsActive' => "required",

                ]
            );

            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }

            $Product = ProductList::find($request['ProductId']);
            // return($Product);
            $Product->ProductName = $request['ProductName'];
            $Product->Price = $request['Price'];
            $Product->IsActive = $request['IsActive'];
            $Product->SubCateogry = $request['SubCategory'];
            $Product->UpdatedBy = $request->user()->name;
            $Product->save();

            return response()->json(['status' => true, 'message' => 'Form Successfully Saved!'], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }

    public function ProductList()
    {
        try {
            $data = ProductList::where('IsActive', true)->with('SubCategoryDetails','artist')->get(['id', 'ProductName', 'Price', 'File1', 'File2', 'SubCateogry', 'Discount', 'artist_id']);
            foreach ($data as $item) {
                $item->File1 = Storage::url('CardImages/' . $item->File1);
                $item->File2 = Storage::url('CardImages/' . $item->File2);
                // $item->File3 = Storage::url('CardImages/'. $item->File3);
                // $item->File4 = Storage::url('CardImages/' .$item->File4);
            }
            return response()->json(['status' => true, 'message' => 'List Fetched Succesfully', 'data' => $data], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }
    public function ProductListAdmin()
    {
        try {
            $data = ProductList::with('SubCategoryDetails','artist')->get();
            foreach ($data as $item) {
                $item->File1 = Storage::url('CardImages/' . $item->File1);
                $item->File2 = Storage::url('CardImages/' . $item->File2);
                // $item->File3 = Storage::url('CardImages/'. $item->File3);
                // $item->File4 = Storage::url('CardImages/' .$item->File4);
            }
            return response()->json(['status' => true, 'message' => 'List Fetched Succesfully', 'data' => $data], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }
    public function SingleProduct($id)
    {
        try {
            $data = ProductList::where('id', $id)->with('SubCategoryDetails','artist')->get();
            $data = $data[0];
            $data->File1 = Storage::url('CardImages/' . $data->File1);
            $data->File2 = Storage::url('CardImages/' . $data->File2);
            // $data->File3 = Storage::url('CardImages/'. $data->File3);
            // $data->File4 = Storage::url('CardImages/' .$data->File4);
            return response()->json(['status' => true, 'message' => 'List Fetched Succesfully', 'data' => $data], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }
    public function CategoryCreate(Request $request)
    {
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'CategoryName' => 'required',
                    'ParentItem' =>     'required',

                ]
            );

            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }
            if (count(CategoryList::where('CategoryName', $request['CategoryName'])->get()) > 0) {
                //
                return response()->json(['message' => 'Category Already Exists!'], 400);
            } else {
                CategoryList::insert([
                    'CategoryName' => $request['CategoryName'],
                    'ParentItem'    => $request['ParentItem'],
                    'IsActive' => true,
                ]);
            }


            return response()->json(['message' => 'Saved Succesfully'], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }
    public function CategoryList()
    {
        try {
            $data = CategoryList::all();
            return response()->json(['status' => true, 'message' => 'List Fetched Succesfully', 'data' => $data], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }

    public function NavCategoryList()
    {
        try {
            $data = CategoryList::where('IsActive', true)->get(['id', 'CategoryName', 'ParentItem']);
            return response()->json(['status' => true, 'message' => 'List Fetched Succesfully', 'data' => $data], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }

    public function SubCategoryCreate(Request $request)
    {
        try {
            $validate = Validator::make(
                $request->all(),
                [
                    'SubCategoryName' => 'required',
                    'CategoryId'      => 'required',

                ]
            );

            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'validation error',
                    'errors' => $validate->errors()
                ], 401);
            }

            SubCategoryList::insert([
                'SubCategoryName' => $request['SubCategoryName'],
                'Category' => $request['CategoryId'],
                'IsActive' => true,
            ]);

            return response()->json(['message' => 'Saved Succesfully'], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }
    public function SubCategoryList()
    {
        try {
            $data = SubCategoryList::where('IsActive', true)->with('CategoryDetails')->get();
            return response()->json(['status' => true, 'message' => 'List Fetched Succesfully', 'data' => $data], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }

    public function updateOrCreate(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'ProductId' => 'required',
                'Discount' => 'required|numeric|between:0,100',
            ]);

            if ($validate->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validate->errors()
                ], 401);
            }

            $product = ProductList::find($request['ProductId']);

            if (!$product) {
                return response()->json([
                    'status' => false,
                    'message' => 'Product not found'
                ], 404);
            }

            $discount = floatval($request['Discount']);
            $discount = max(0, min(100, $discount));

            $product->Discount = $discount;

            if (Auth::check()) {
                $product->UpdatedBy = $request->user()->name;
            } else {
                $product->UpdatedBy = 'Anonymous';
            }

            $product->save();

            return response()->json([
                'status' => true,
                'message' => 'Discount Successfully Saved!',
                'data' => [
                    'product' => $product,
                    'discount' => $discount,
                ]
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => $th->getMessage()
            ], 501);
        }
    }
}
