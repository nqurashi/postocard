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
        Schema::create('ProductList', function (Blueprint $table) {
            $table->id();
            $table->string('ProductName');
            $table->foreignId('SubCateogry')->references('id')->on('SubCategoryList')->onDelete('cascade')->onUpdate('cascade');
            $table->float('Price')->default(0.00);
            $table->string('Artist')->default('-');
            $table->string('File1')->nullable();
            $table->string('File2')->nullable();
            $table->string('File3')->nullable();
            $table->string('File4')->nullable();
            //is_active
            $table->string('UploadedBy');
            $table->string('UpdatedBy');
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
        Schema::dropIfExists('ProductList');
    }
};
