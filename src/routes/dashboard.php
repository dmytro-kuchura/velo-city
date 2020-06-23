<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'Dashboard\MainController@dashboard')->name('dashboard');

Route::prefix('order')->group(function () {
    Route::get('/{order}', 'Dashboard\OrderController@edit')->name('dashboard.order.edit');
});

Route::prefix('banners')->group(function () {
    Route::get('/', 'Dashboard\BannersController@index')->name('dashboard.banners.index');
    Route::get('/create', 'Dashboard\BannersController@create')->name('dashboard.banners.create');
    Route::get('/{id}', 'Dashboard\BannersController@edit')->name('dashboard.banners.edit');
});

Route::prefix('categories')->group(function () {
    Route::get('/', 'Dashboard\CategoriesController@index')->name('dashboard.categories.index');
    Route::get('/create', 'Dashboard\CategoriesController@create')->name('dashboard.categories.create');
    Route::get('/{id}', 'Dashboard\CategoriesController@edit')->name('dashboard.categories.edit');
});

Route::prefix('brands')->group(function () {
    Route::get('/', 'Dashboard\BrandsController@index')->name('dashboard.brands.index');
    Route::get('/create', 'Dashboard\BrandsController@create')->name('dashboard.brands.create');
    Route::get('/{id}', 'Dashboard\BrandsController@edit')->name('dashboard.brands.edit');
});

Route::prefix('products')->group(function () {
    Route::get('/', 'Dashboard\ProductsController@index')->name('dashboard.products.index');
    Route::get('/create', 'Dashboard\ProductsController@create')->name('dashboard.products.create');
    Route::get('/{id}', 'Dashboard\ProductsController@edit')->name('dashboard.products.edit');
});

Route::prefix('news')->group(function () {
    Route::get('/', 'Dashboard\NewsController@index')->name('dashboard.news.index');
    Route::get('/create', 'Dashboard\NewsController@create')->name('dashboard.news.create');
    Route::get('/{id}', 'Dashboard\NewsController@edit')->name('dashboard.news.edit');
});

Route::prefix('orders')->group(function () {
    Route::get('/', 'Dashboard\OrdersController@index')->name('dashboard.orders.index');
    Route::get('/{id}', 'Dashboard\OrdersController@edit')->name('dashboard.orders.edit');
});
