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
        Route::post('logout', 'Api\Auth\LoginController@logout');
    });
});