<?php

namespace App\Models;

use App\Models\SubCategoryList;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Artist;

class ProductList extends Model
{
    use HasFactory;
    protected $table = 'ProductList';



    /**
     * Get the SubCategoryDetails that owns the ProductList
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function SubCategoryDetails()
    {
        return $this->belongsTo(SubCategoryList::class, 'SubCateogry', 'id')->with('CategoryDetails');
    }

    public function productRatings()
    {
        return $this->hasMany(ProductRating::class, 'product');
    }

    public function artist()
    {
        return $this->belongsTo(Artist::class, 'artist_id');
    }
}
