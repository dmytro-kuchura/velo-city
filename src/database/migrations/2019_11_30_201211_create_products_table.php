<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');
            $table->string('alias');
            $table->integer('category_id')->default(0);
            $table->tinyInteger('status')->default(1);

            $table->tinyInteger('new')->default(0);
            $table->tinyInteger('sale')->default(0);
            $table->tinyInteger('top')->default(0);
            $table->tinyInteger('available')->default(1);

            $table->decimal('cost', 14, 2);
            $table->decimal('cost_old', 14, 2);

            $table->integer('views')->default(0);
            $table->integer('brand')->default(0);

            $table->string('artikul')->nullable();
            $table->string('image')->nullable();

            $table->longText('specifications')->nullable();
            $table->longText('information')->nullable();

            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->longText('keywords')->nullable();

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
        Schema::dropIfExists('products');
    }
}
