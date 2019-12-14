<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNewsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('news', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('name');
            $table->string('image')->nullable();
            $table->string('alias')->unique();
            $table->text('content');
            $table->text('short')->nullable();
            $table->string('title');
            $table->text('keywords');
            $table->text('description');
            $table->tinyInteger('status')->default(0);
            $table->integer('author')->default(0);

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
        Schema::dropIfExists('news');
    }
}
