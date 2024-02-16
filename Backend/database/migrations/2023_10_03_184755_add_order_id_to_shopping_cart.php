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
        Schema::table('ShoppingCart', function (Blueprint $table) {
            $table->foreignId('OrderId')->nullable()->references('id')->on('Orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ShoppingCart', function (Blueprint $table) {
            $table->dropColumn('OrderId');
        });
    }
};
