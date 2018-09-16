<?php

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

Route::prefix('v1')->group(function () {
    Route::post('register', 'Api\Auth\RegisterController@register')->name('register');
    Route::post('login', 'Api\Auth\LoginController@login')->name('login');
    Route::post('refresh', 'Api\Auth\LoginController@refresh')->name('refresh');

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', 'Api\Auth\LoginController@logout')->name('logout');
    });


    Route::prefix('admin')->group(function () {
        Route::prefix('pages')->group(function () {
            Route::get('/list', 'Admin\PagesController@list')->name('pages.list');
            Route::post('/store', 'Admin\PagesController@store')->name('pages.store');
            Route::post('/edit', 'Admin\PagesController@update')->name('pages.update');
        });

        Route::prefix('news')->group(function () {
            Route::post('/store', 'Admin\NewsController@store')->name('news.store');
            Route::post('/edit', 'Admin\NewsController@update')->name('news.update');
        });
    });
});