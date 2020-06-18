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

Route::get('parse-products', 'ParserController@parseProducts')->name('parse.products');
Route::get('upload-products', 'ParserController@uploadProduct')->name('upload.products');
Route::get('parse-categories', 'ParserController@parseCategories')->name('parse.categories');

Route::get('justin', 'Warehouses\JustinController@import')->name('justin.import');

Route::get('sitemap.xml', 'SiteController@sitemap')->name('sitemap.xml');

Route::post('/login', 'Auth\LoginController@login')->name('login');
Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
Route::post('/register', 'Auth\RegisterController@register')->name('register');

//$routes = function() {
    Route::get('/', 'SiteController@index')->name('home');
    Route::get('/about', 'SiteController@about')->name('about');
    Route::get('/contact', 'SiteController@contacts')->name('contacts');
    Route::get('/search', 'SiteController@search')->name('search');

    Route::prefix('shop')->group(function () {
        Route::get('/', 'ShopController@index')->name('shop.index');
        Route::get('/{category}', 'ShopController@category')->name('shop.category');
        Route::get('/{alias}/p{id}', 'ShopController@item')->name('shop.item');
    });

    Route::get('/cart', 'CartController@cart')->name('cart');

    Route::get('/checkout', 'CheckoutController@checkout')->name('checkout');
    Route::get('/thank', 'CheckoutController@thank')->name('thank');
//};

//Route::domain('{localization}.' . config('app.original_domain'))->group($routes);
//Route::domain(config('app.original_domain'))->group($routes);
