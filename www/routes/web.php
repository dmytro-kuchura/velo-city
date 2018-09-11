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
        Route::get('/', 'PagesController@index')->name('pages.index');
        Route::get('/create', 'PagesController@create')->name('pages.create');
        Route::post('/store', 'PagesController@store')->name('pages.store');
        Route::get('/edit/{id}', 'PagesController@edit')->name('pages.edit');
        Route::post('/edit', 'PagesController@update')->name('pages.update');
        Route::get('/delete/{id}', 'PagesController@delete')->name('pages.delete');
        Route::get('/status/{id}', 'PagesController@status')->name('pages.status');
    });

    Route::prefix('news')->group(function () {
        Route::get('/', 'NewsController@index')->name('news.index');
        Route::get('/create', 'NewsController@create')->name('news.create');
        Route::post('/store', 'NewsController@store')->name('news.store');
        Route::get('/edit/{id}', 'NewsController@edit')->name('news.edit');
        Route::post('/edit', 'NewsController@update')->name('news.update');
        Route::get('/delete/{id}', 'NewsController@delete')->name('news.delete');
        Route::get('/status/{id}', 'NewsController@status')->name('news.status');
    });
});
