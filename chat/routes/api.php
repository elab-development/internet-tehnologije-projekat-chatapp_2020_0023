<?php

use App\Http\Controllers\ChatRoomController;
use App\Http\Controllers\ChatRoomUserController;
use App\Http\Controllers\MessageController;
use Illuminate\Http\Request; 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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


// Ruta za registraciju
Route::post('/register', [AuthController::class, 'register']);

// Ruta za prijavu
Route::post('/login', [AuthController::class, 'login']);

 
Route::get('/users/search', [AuthController::class, 'searchUsers']);

Route::get('/chat-rooms/search', [ChatRoomController::class, 'search']);  //http://127.0.0.1:8000/api/chat-rooms/search?name="aa"&is_private=false


 


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user/profile', [AuthController::class, 'userProfile']);
    Route::put('/user/update', [AuthController::class, 'updateUser']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    Route::prefix('chat-room-users')->group(function () {
        Route::get('/', [ChatRoomUserController::class, 'index']);
        Route::get('/{id}', [ChatRoomUserController::class, 'show']);
        Route::post('/', [ChatRoomUserController::class, 'store']);
        Route::put('/{id}', [ChatRoomUserController::class, 'update']);
        Route::delete('/{id}', [ChatRoomUserController::class, 'destroy']);
        Route::post('/restore/{id}', [ChatRoomUserController::class, 'restore']);
        Route::delete('/force-delete/{id}', [ChatRoomUserController::class, 'forceDestroy']);
    });

    Route::apiResource('chat-rooms', ChatRoomController::class);

    Route::apiResource('messages', MessageController::class);

});