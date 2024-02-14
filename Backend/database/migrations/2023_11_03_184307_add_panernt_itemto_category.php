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
        Schema::create('ParentItem', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name', 100);
            $table->timestamps();
        });

        DB::table('ParentItem')->insert([
            'name'=>'Occasions'
        ]);
        DB::table('ParentItem')->insert([
            'name'=>'Holidays'
        ]);

        Schema::table('CategoryList', function (Blueprint $table) {
            $table->foreignid('ParentItem')->nullable()->default(1)->references('id')->on('ParentItem')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ParentItem');
        Schema::table('CategoryList', function (Blueprint $table) {
            $table->dropColumn('ParentItem');
        });
    }
};
