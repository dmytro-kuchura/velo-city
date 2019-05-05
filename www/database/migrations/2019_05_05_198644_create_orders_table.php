<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');

            $table->string('number', 8);
            $table->string('status', 32);
            $table->integer('user_id')->nullable();
            $table->integer('purchaser_id')->nullable();
            $table->integer('self_shipping')->default(0);
            $table->integer('shipping_address_id')->nullable();
            $table->text('notes')->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users');
            $table->foreign('purchaser_id')
                ->references('id')
                ->on('purchasers');
            $table->foreign('shipping_address_id')
                ->references('id')
                ->on('addresses');

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
        Schema::dropIfExists('orders');
    }
}
