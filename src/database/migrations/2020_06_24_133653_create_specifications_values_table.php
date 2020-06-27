<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpecificationsValuesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('specifications_values', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('alias')->unique();
            $table->string('name')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->integer('sort')->default(1);
            $table->integer('specification_id');
            $table->string('color')->nullable();

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
        Schema::dropIfExists('specifications_values');
    }
}
