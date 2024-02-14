<?php

use App\Models\AccessRoleList;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('AccessRoleList', function (Blueprint $table) {
            $table->id();
            $table->string('RoleName');
            //Created By Updated By
            $table->timestamps();
        });

        AccessRoleList::insert([
            'RoleName' => 'Default'
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('AccessRoleList');
    }
};
