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
        Schema::create('Orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->references('id')->on('users')->onDelete('cascade');
            $table->string('FullName', 100)->nullable()->default('Full Name');
            $table->text('StreetAddress')->nullable()->default('Address');
            $table->string('City', 100)->nullable()->default('City');
            $table->string('State', 100)->nullable()->default('State');
            $table->string('Country', 100)->nullable()->default('Country');
            $table->string('PostalCode', 100)->nullable()->default('postal code');
            $table->string('Email', 100)->nullable()->default('Email');
            $table->string('Mobile', 100)->nullable()->default('+1');
            $table->string('PaymentReference', 100)->nullable()->default('-');
            $table->string('PaymentMethod', 100)->nullable()->default('PayPal');
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
        Schema::dropIfExists('Orders');
    }
};
