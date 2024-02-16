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
        Schema::create('Vendors', function (Blueprint $table) {
            $table->id();
            $table->string('VendorName', 100)->nullable()->default('-');
            $table->string('Address', 200)->nullable()->default('-');
            $table->string('BankAccountNo', 100)->nullable()->default('-');
            $table->string('ContactNumber', 100)->nullable()->default('text');
            $table->float('Rate')->nullable()->default(0.00);
            $table->string('CreatedBy', 100)->nullable()->default('-');
            $table->string('UpdatedBy', 100)->nullable()->default('text');
            $table->string('Email', 100)->nullable()->default('text');
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
        Schema::dropIfExists('vendors');
    }
};
