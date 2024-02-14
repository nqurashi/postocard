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
        Schema::table('ProductList', function (Blueprint $table) {
            $table->boolean('IsFeatured')->nullable()->default(false);
            $table->float('Discount')->default(0.00);

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('ProductList', function (Blueprint $table) {
            $table->dropColumn('IsFeatured');
            $table->dropColumn('Discount');
        });
    }
};
