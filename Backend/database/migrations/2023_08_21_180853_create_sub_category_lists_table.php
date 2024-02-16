<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('SubCategoryList', function (Blueprint $table) {
            $table->id();
            $table->string('SubCategoryName');
            $table->foreignId('Category')->references('id')->on('CategoryList')->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('IsActive');
            //Created By Updated By.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('SubCategoryList');
    }
};
