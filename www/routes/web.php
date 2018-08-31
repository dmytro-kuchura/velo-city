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
    Route::get('/dashboard', 'AdminController@dashboard')->name('dashboard');

//    Route::get('/', 'BlogController@index')->name('blog.index');
//    Route::get('/create', 'BlogController@create')->name('blog.create');
//    Route::post('/store', 'BlogController@store')->name('blog.store');
//    Route::get('/edit/{id}', 'BlogController@edit')->name('blog.edit');
//    Route::post('/edit', 'BlogController@update')->name('blog.update');
//    Route::get('/delete/{id}', 'BlogController@delete')->name('blog.delete');
//    Route::get('/status/{id}', 'BlogController@status')->name('blog.status');
});
