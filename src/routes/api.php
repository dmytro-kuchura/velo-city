<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('authentication')->group(function () {
    Route::prefix('v1')->group(function () {
        Route::prefix('cart')->group(function () {
            Route::get('list', 'Api\CartController@list')->name('api.cart.list');
            Route::post('add', 'Api\CartController@add')->name('api.cart.add');
            Route::delete('delete/{item}', 'Api\CartController@delete')->name('api.cart.delete');
            Route::post('update', 'Api\CartController@update')->name('api.cart.update');
        });

        Route::prefix('wishlist')->group(function () {
            Route::get('list', 'Api\WishlistController@list')->name('api.wishlist.list');
            Route::post('add', 'Api\WishlistController@add')->name('api.wishlist.add');
            Route::delete('delete/{item}', 'Api\WishlistController@delete')->name('api.wishlist.delete');
        });
    });
});
