<?php

use Illuminate\Support\Facades\Route;



// Auth Route Start
Route::namespace('App\Http\Controllers')->group(function(){

    // // Movie Start
    Route::namespace('Movie')->group(function(){

        // User
        Route::namespace('User')->group(function(){

            Route::namespace('Auth')->prefix('auth')->group(function(){
                Route::get('/login', 'IndexController@login');
                Route::post('/register', 'IndexController@register');
            });


            Route::get('{any?}', 'IndexController@index');
        });
    });
    // // Movie End

});