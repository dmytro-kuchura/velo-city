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

Route::get('/', 'SiteController@home')->name('home');
Route::get('/contacts', 'SiteController@contacts')->name('contacts');

Route::prefix('admin')->group(function () {
    Route::get('/', 'AdminController@index')->name('auth');
    Route::get('/create', 'AdminController@create')->name('create');
    Route::get('/reset-password', 'AdminController@reset')->name('reset');

    Route::get('/dashboard', 'AdminController@dashboard')->name('dashboard');

    Route::prefix('pages')->group(function () {
        Route::get('/', 'Admin\PagesController@index')->name('pages.index');
        Route::get('/create', 'Admin\PagesController@create')->name('pages.create');
        Route::get('/edit/{id}', 'Admin\PagesController@edit')->name('pages.edit');
    });

    Route::prefix('news')->group(function () {
        Route::get('/', 'Admin\NewsController@index')->name('news.index');
        Route::get('/create', 'Admin\NewsController@create')->name('news.create');
        Route::get('/edit/{id}', 'Admin\NewsController@edit')->name('news.edit');
    });
});
