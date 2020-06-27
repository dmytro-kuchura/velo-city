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
            Route::get('chart', 'Api\OrderController@chart')->name('api.order.chart');
        });
        Route::prefix('specifications')->group(function () {
            Route::get('list', 'Api\SpecificationsController@list')->name('api.specifications.list');
            Route::post('create', 'Api\SpecificationsController@create')->name('api.specifications.create');
            Route::get('/{id}', 'Api\SpecificationsController@show')->name('api.specifications.show');
            Route::put('/{id}', 'Api\SpecificationsController@update')->name('api.specifications.update');
            Route::delete('/{id}', 'Api\SpecificationsController@delete')->name('api.specifications.delete');
        });
        Route::prefix('specifications-values')->group(function () {
            Route::post('create', 'Api\SpecificationsValuesController@create')->name('api.specifications-values.create');
            Route::delete('/{id}', 'Api\SpecificationsValuesController@delete')->name('api.specifications-values.delete');
        });
        Route::prefix('banners')->group(function () {
            Route::get('/', 'Api\BannersController@index')->name('api.banners.index');
            Route::post('/', 'Api\BannersController@create')->name('api.banners.create');
            Route::put('/image-update', 'Api\BannersController@image')->name('api.banners.image');
            Route::get('/{id}', 'Api\BannersController@show')->name('api.banners.show');
            Route::put('/{id}', 'Api\BannersController@update')->name('api.banners.update');
            Route::delete('/{id}', 'Api\BannersController@delete')->name('api.banners.delete');
        });
        Route::prefix('brands')->group(function () {
            Route::get('/', 'Api\BrandsController@index')->name('api.brands.index');
            Route::get('/all', 'Api\BrandsController@all')->name('api.brands.all');
            Route::post('/', 'Api\BrandsController@create')->name('api.brands.create');
            Route::put('/image-update', 'Api\BrandsController@image')->name('api.brands.image');
            Route::get('/{id}', 'Api\BrandsController@show')->name('api.brands.show');
            Route::put('/{id}', 'Api\BrandsController@update')->name('api.brands.update');
            Route::delete('/{id}', 'Api\BrandsController@delete')->name('api.brands.delete');
        });
        Route::prefix('products')->group(function () {
            Route::get('/', 'Api\ProductsController@index')->name('api.products.index');
            Route::post('/', 'Api\ProductsController@store')->name('api.products.create');
            Route::put('/image-update', 'Api\ProductsController@image')->name('api.products.image');
            Route::post('/images', 'Api\ProductsController@images')->name('api.products.images');
            Route::get('/{id}', 'Api\ProductsController@show')->name('api.products.show');
            Route::put('/{id}', 'Api\ProductsController@update')->name('api.products.update');
            Route::delete('/{id}', 'Api\ProductsController@delete')->name('api.products.delete');
        });
        Route::prefix('categories')->group(function () {
            Route::get('/', 'Api\CategoriesController@index')->name('api.categories.index');
            Route::get('/all', 'Api\CategoriesController@all')->name('api.categories.all');
        });
        Route::prefix('subscribe')->group(function () {
            Route::post('/', 'Api\SubscribeController@subscribe')->name('api.subscribe');
        });
        Route::prefix('contacts')->group(function () {
            Route::post('/', 'Api\ContactsController@contacts')->name('api.contacts');
        });
    });
});
