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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('role')->default('user');
            $table->string('country')->nullable();
            $table->string('street_address')->nullable();
            $table->string('City')->nullable();
            $table->string('town')->nullable();
            $table->string('state')->nullable();
            $table->integer('postal_code')->nullable();
            $table->string('phone')->nullable();
            $table->string('payment_method')->default('default_value_here');
            $table->decimal('spending', 10, 2)->default(0.00);
            $table->string('current_package')->default('basic');
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
};
