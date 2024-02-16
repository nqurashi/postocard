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
        Schema::table('users', function (Blueprint $table) {

            #$table->foreignId('AccessRole')->references('id')->on('AccessRoleList')->onDelete('cascade')->onUpdate('cascade')->default(1);
            $table->foreign('AccessRole')->references('id')->on('AccessRoleList')->onDelete('cascade')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

    }
};
