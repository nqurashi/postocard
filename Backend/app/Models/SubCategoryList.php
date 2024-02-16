<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategoryList extends Model
{
    use HasFactory;
    protected $table = 'SubCategoryList';



    /**
     * Get the CategoryDetails that owns the SubCategoryList
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function CategoryDetails()
    {
        return $this->belongsTo(CategoryList::class, 'Category', 'id');
    }
}
