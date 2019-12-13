<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJustinWarehousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('justin_warehouses', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('number');
            $table->string('adress')->nullable();
            $table->string('locality')->nullable();
            $table->string('type')->nullable();
            $table->string('delivery_branch_id')->nullable();
            $table->string('max_weight')->nullable();
            $table->string('description')->nullable();
            $table->string('shedule_description')->nullable();
            $table->tinyInteger('cardpay')->default(0);
            $table->string('navigation')->nullable();

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
        Schema::dropIfExists('justin_warehouses');
    }
}
