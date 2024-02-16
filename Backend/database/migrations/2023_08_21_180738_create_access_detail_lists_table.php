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
        Schema::create('AccessDetailsList', function (Blueprint $table) {
            $table->id();
            $table->string('DocName');
            $table->foreignId('AccessRole')->references('id')->on("AccessRoleList")->onDelete('cascade')->onUpdate('cascade');
            $table->boolean('Read');
            $table->boolean('Create');
            $table->boolean('Submit');
            $table->boolean('Delete');
            $table->boolean('Export');
            $table->boolean('Edit');
            $table->boolean('IsActive');
            $table->string('CreatedBy');
            //Upadted By
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
        Schema::dropIfExists('AccessDetailsList');
    }
};
