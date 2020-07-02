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

Route::get('test', 'TestController@email')->name('test');

Route::get('parse-products', 'ParserController@parseProducts')->name('parse.products');
Route::get('upload-products', 'ParserController@uploadProduct')->name('upload.products');
Route::get('parse-categories', 'ParserController@parseCategories')->name('parse.categories');
Route::get('justin', 'Warehouses\JustinController@import')->name('justin.import');

Route::get('sitemap.xml', 'SiteController@sitemap')->name('sitemap.xml');

Auth::routes();
Route::get('profile', 'ProfileController@profile')->name('profile'); // done
Route::post('change', 'ProfileController@change')->name('profile.change'); // done
Route::post('change-password', 'ProfileController@changePassword')->name('profile.change.password'); // done

Route::get('/', 'SiteController@index')->name('home'); // done

Route::prefix('shop')->group(function () {
    Route::get('/', 'ShopController@index')->name('shop.index'); // done
    Route::get('/{category}', 'ShopController@category')->name('shop.category'); // done
    Route::get('/{alias}/p{id}', 'ShopController@item')->name('shop.item'); // done
});

Route::prefix('news')->group(function () {
    Route::get('/', 'NewsController@index')->name('news.index');
    Route::get('/{alias}', 'NewsController@inner')->name('news.inner');
});

Route::get('/wishlist', 'WishlistController@wishlist')->name('wishlist'); // done

Route::get('/cart', 'CartController@cart')->name('cart'); // done
Route::get('/checkout', 'CheckoutController@checkout')->name('checkout'); // done
Route::get('/thank', 'CheckoutController@thank')->name('thank');

Route::get('/about', 'SiteController@about')->name('about'); // done
Route::get('/contact', 'SiteController@contacts')->name('contacts');
Route::get('/search', 'SiteController@search')->name('search');
Route::get('/{slug}', 'PagesController@page')->name('page');
