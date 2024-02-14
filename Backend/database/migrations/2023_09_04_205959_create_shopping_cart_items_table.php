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
        Schema::create('ShoppingCartItems', function (Blueprint $table) {
            $table->id();
            $table->foreignId('Product')->references('id')->on('ProductList')->onDelete('cascade');
            $table->foreignId('CartID')->references('id')->on('ShoppingCart')->onDelete('cascade');
            $table->float('GrossAmount');
            $table->float('Discount')->nullable()->default(0);
            $table->float('NetAmount');
            $table->string('Message')->nullable()->default('Message');
            $table->string('Signature', 100)->nullable()->default('Signature');
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
        Schema::dropIfExists('ShoppingCartItems');
    }
};
