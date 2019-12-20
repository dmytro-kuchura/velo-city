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
Route::get('/auth', 'Dashboard\MainController@auth')->name('dashboard.auth');

Route::prefix('order')->group(function () {
    Route::get('/{order}', 'Dashboard\OrderController@edit')->name('dashboard.order.edit');
});

