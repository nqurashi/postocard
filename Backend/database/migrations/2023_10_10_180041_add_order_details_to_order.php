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
            $table->string('StreetAddress')->nullable()->default('-');
            $table->string('City')->nullable()->default('City');
            $table->string('State')->nullable()->default('State');
            $table->string('Country')->nullable()->default('United States');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ShoppingCartItems', function (Blueprint $table) {
            $table->dropColumn('StreetAddress');
            $table->dropColumn('City');
            $table->dropColumn('State');
            $table->dropColumn('Country');
        });
    }
};
