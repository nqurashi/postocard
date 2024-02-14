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
        Schema::table('ShoppingCartItems', function (Blueprint $table) {
            $table->string('FullName', 100)->nullable()->default('FullName');
            $table->string('MobileNo', 100)->nullable()->default('-');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('s_c_i', function (Blueprint $table) {
            //
        });
    }
};
