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

        Route::prefix('regions')->group(function () {
            Route::get('list', 'Api\RegionController@list')->name('api.regions.list');
        });

        Route::prefix('cities')->group(function () {
            Route::get('/{region}', 'Api\CityController@list')->name('api.cities.list');
        });

        Route::prefix('deliveries')->group(function () {
            Route::get('list', 'Api\DeliveryController@list')->name('api.deliveries.list');
        });

        Route::prefix('payments')->group(function () {
            Route::get('list', 'Api\PaymentController@list')->name('api.payments.list');
        });

        Route::prefix('upload')->group(function () {
            Route::post('/image', 'Api\UploadController@image')->name('api.upload.image');
        });

        Route::prefix('orders')->group(function () {
            Route::post('create', 'Api\OrderController@create')->name('api.order.create');
            Route::get('list', 'Api\OrderController@list')->name('api.order.list');
        });

        Route::prefix('banners')->group(function () {
            Route::get('/', 'Api\BannersController@index')->name('api.banners.index');
            Route::post('/create', 'Api\BannersController@create')->name('api.banners.create');
            Route::get('/{id}', 'Api\BannersController@show')->name('api.banners.show');
            Route::put('/{id}', 'Api\BannersController@update')->name('api.banners.update');
            Route::delete('/{id}', 'Api\BannersController@delete')->name('api.banners.delete');
        });
    });
});
