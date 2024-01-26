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

// Ruta za odjavu
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('chat-rooms', ChatRoomController::class);
Route::get('/chat-rooms/search', [ChatRoomController::class, 'search']);

Route::apiResource('messages', MessageController::class);
Route::prefix('chat-room-users')->group(function () {
    Route::get('/', [ChatRoomUserController::class, 'index']);
    Route::get('/{id}', [ChatRoomUserController::class, 'show']);
    Route::post('/', [ChatRoomUserController::class, 'store']);
    Route::put('/{id}', [ChatRoomUserController::class, 'update']);
    Route::delete('/{id}', [ChatRoomUserController::class, 'destroy']);
    Route::post('/restore/{id}', [ChatRoomUserController::class, 'restore']);
    Route::delete('/force-delete/{id}', [ChatRoomUserController::class, 'forceDestroy']);
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
