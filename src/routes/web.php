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

Route::get('sitemap.xml', 'SiteController@sitemap')->name('sitemap.xml');

//$routes = function() {
    Route::get('/', 'SiteController@index')->name('home');
    Route::get('/about', 'SiteController@about')->name('about');
    Route::get('/contact', 'SiteController@contacts')->name('contacts');
    Route::get('/search', 'SiteController@search')->name('search');

    Route::prefix('shop')->group(function () {
        Route::get('/', 'ShopController@index')->name('shop.index');
        Route::get('/{category}', 'ShopController@category')->name('shop.category');
    });

    Route::get('/{alias}/p{id}', 'ShopController@item')->name('shop.item');

    Route::get('/cart', 'CartController@cart')->name('cart');
    Route::get('/checkout', 'CheckoutController@checkout')->name('checkout');
//};

//Route::domain('{localization}.' . config('app.original_domain'))->group($routes);
//Route::domain(config('app.original_domain'))->group($routes);
