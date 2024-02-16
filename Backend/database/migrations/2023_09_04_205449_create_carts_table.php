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
        Schema::create('ShoppingCart', function (Blueprint $table) {
            $table->id();
            $table->string('CartCode');
            $table->foreignId('UserID')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->float('GrossAmount')->default(0.00);
            $table->float('Discount')->default(0.00);
            $table->float('NetAmount')->default(0.00);
            $table->integer('ProductCount')->default(0);
            $table->string('Currency')->nullable()->default('USD');
            $table->boolean('IsCompleted')->nullable()->default(false);
            $table->boolean('IsCheckedOut')->nullable()->default(false);
            $table->boolean('IsPaid')->nullable()->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *s
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ShoppingCart');
    }
};
