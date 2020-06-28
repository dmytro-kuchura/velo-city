<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSpecificationsCatalogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('specifications_catalog', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->integer('catalog_id');
            $table->integer('specifications_id');
            $table->integer('specifications_value_id');

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
        Schema::dropIfExists('specifications_catalog');
    }
}
