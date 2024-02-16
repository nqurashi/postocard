<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CartItems;
use App\Models\ProductList;
use App\Models\ShoppingCartItems;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;
use Intervention\Image\ImageManager;

class ImageProcessing extends Controller
{

    public Function OrderPrintingImages(Request $request){
        $canvasWidth = 1280;
        $canvasHeight = 900;
        $TextPlacemenetX = $canvasWidth*0.594;
        $TextPlacemenety = $canvasHeight * 0.155;
        $SignPlacemenetX = $canvasWidth * 0.75;
        $SignPlacemenety = $canvasHeight * 0.933;
        global $FontSize;
        $FontSize = ($canvasHeight*$canvasWidth)/16941.1765;
        $CartItemId = $request->CardOrderId;
        // $CartItemId = 181;
        // return('Images');
        // $data = ProductList::find(7);
        $dataAll = CartItems::with('ProductDetails')->find($CartItemId);
        // return($CartItemId);
        if ($dataAll === null) {
            return response()->json(['error' => 'Data not found.'], 404);
        }

        $data = $dataAll->ProductDetails;

        $file1Name = 'app\\CardImages\\Temp\\'.$dataAll->id.'In.jpg';
        $file2Name = 'app\\CardImages\\Temp\\'.$dataAll->id.'Out.jpg';
        $file11Name = '/CardImages/Temp/'.$dataAll->id.'In.jpg';
        $file22Name = '/CardImages/Temp/'.$dataAll->id.'Out.jpg';
        // return($data);
        // return response()->json(['data'=>$data], 200);
        $File1 = storage_path('app/CardImages/'. $data->File1);
        $File1 = Image::make($File1)->resize($canvasWidth/2,$canvasHeight);
        // return($File1);
        $File2 = storage_path('app/CardImages/'. $data->File2);
        $File2 = Image::make($File2)->resize($canvasWidth/2,$canvasHeight);
        $File3 = storage_path('app/CardImages/'. $data->File3);
        $File3 = Image::make($File3)->resize($canvasWidth/2,$canvasHeight);
        $File4 = storage_path('app/CardImages/'. $data->File4);
        $File4 = Image::make($File4)->resize($canvasWidth/2,$canvasHeight);

        // return(Storage::files('Storage/Fonts/DS.ttf'));
        // return($data->File1);
        // return(storage_path('appFonts\DancingScript-Medium.ttf'));


        $img = Image::canvas($canvasWidth,$canvasHeight);
        $img->insert($File2, 'top-left',0,0);
        $img->insert($File3,'top-right',0,0);

        // $img = Image::make($img);
        // return(storage_path('Fonts\DancingScript-Medium.ttf'));

        // return($dataAll->Message);
        // return($this->wrapText($dataAll->Message));
        //Text Processing preg_replace( '~((?:\S*?\s){6})~', "$1\n", $dataAll->Message )
        $img->text($this->wrapText($dataAll->Message,34), $TextPlacemenetX, $TextPlacemenety, function($font) {
            $font->file(storage_path('Fonts/DancingScript-Medium.ttf')); // Dancing Script Font

            $font->size(32); // Size 17 in relevance to 640 x 450
            // $font->lineHeight(90);
            // $font->color('#fdf6e3');6
            // $font->width(200);
            // $font->align('justify');
            // $font->valign('top');
            // $font->angle(45);
        });
        $img->text($dataAll->Signature, $SignPlacemenetX, $SignPlacemenety, function($font) {

            $font->file(storage_path('Fonts/DancingScript-Medium.ttf')); // Dancing Script Font
            $font->size(32);
            // $font->lineHeight(90);
            // $font->color('#fdf6e3');6
            // $font->width(200);
            // $font->align('justify');
            // $font->valign('top');
            $font->angle(20);
        });
        $img->save(storage_path($file1Name));


        $img2 = Image::canvas($canvasWidth,$canvasHeight);
        $img2->insert($File1, 'top-left',0,-5);
        $img2->insert($File4,'top-right',-5,-5);
        $img2->save(storage_path($file2Name));


        // return response()->download($file1Name, 'Download');
        // return Response::make($img, 200);
        return response()->json(['data'=> [ 'image1' =>$file11Name, 'image2'=> $file22Name] ], 200);
    }


    function wrapText($text, $maxLineLength = 100) {
        $output = '';
        $line = '';

        foreach (explode(' ', $text) as $word) {
            if (strlen($line . $word) > $maxLineLength) {
                $output .= trim($line) . "\n";
                $line = '';
            }
            $line .= $word . ' ';
        }

        $output .= trim($line);
        return $output;
}
}
