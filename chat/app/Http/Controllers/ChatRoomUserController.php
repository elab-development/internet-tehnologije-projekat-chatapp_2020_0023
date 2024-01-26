<?php

namespace App\Http\Controllers;

use App\Models\ChatRoomUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatRoomUserController extends Controller
{
     // Prikazuje sve zapise iz pivot tabele
     public function index()
     {
         $chatRoomUsers = ChatRoomUser::all();
         return response()->json($chatRoomUsers);
     }
 
     // Prikazuje specifičan zapis iz pivot tabele
     public function show($id)
     {
         $chatRoomUser = ChatRoomUser::findOrFail($id);
         return response()->json($chatRoomUser);
     }
 
     // Kreira novi zapis u pivot tabeli
     public function store(Request $request)
     {
         $validator = Validator::make($request->all(), [
             'user_id' => 'required|integer|exists:users,id',
             'chat_room_id' => 'required|integer|exists:chat_rooms,id',
             'joined_at' => 'required|date',
             'role' => 'required|string',
             'muted_until' => 'nullable|date'
         ]);
 
         if ($validator->fails()) {
             return response()->json($validator->errors(), 400);
         }
 
         $chatRoomUser = ChatRoomUser::create($validator->validated());
         return response()->json($chatRoomUser, 201);
     }
 
     // Ažurira postojeći zapis u pivot tabeli
     public function update(Request $request, $id)
     {
         $chatRoomUser = ChatRoomUser::findOrFail($id);
 
         $validator = Validator::make($request->all(), [
             'user_id' => 'integer|exists:users,id',
             'chat_room_id' => 'integer|exists:chat_rooms,id',
             'joined_at' => 'date',
             'role' => 'string',
             'muted_until' => 'nullable|date'
         ]);
 
         if ($validator->fails()) {
             return response()->json($validator->errors(), 400);
         }
 
         $chatRoomUser->update($validator->validated());
         return response()->json($chatRoomUser);
     }
 
     // Briše zapis iz pivot tabele
     public function destroy($id)
     {
         $chatRoomUser = ChatRoomUser::findOrFail($id);
         $chatRoomUser->delete();
         return response()->json(null, 204);
     }
}
