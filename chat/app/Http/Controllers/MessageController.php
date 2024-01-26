<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
     // Prikazuje sve poruke
     public function index()
     {
         $messages = Message::all();
         return response()->json($messages);
     }
 
     // Prikazuje specifičnu poruku
     public function show($id)
     {
         $message = Message::findOrFail($id);
         return response()->json($message);
     }
 
     // Kreira novu poruku
     public function store(Request $request)
     {
         $validator = Validator::make($request->all(), [
             'body' => 'required|string',
             'user_id' => 'required|integer|exists:users,id',
             'chat_room_id' => 'required|integer|exists:chat_rooms,id',
             'sent_at' => 'sometimes|date',
             'read_at' => 'nullable|date',
             'deleted_at' => 'nullable|date'
         ]);
 
         if ($validator->fails()) {
             return response()->json($validator->errors(), 400);
         }
 
         $message = Message::create($validator->validated());
         return response()->json($message, 201);
     }
 
     // Ažurira postojeću poruku
     public function update(Request $request, $id)
     {
         $message = Message::findOrFail($id);
 
         $validator = Validator::make($request->all(), [
             'body' => 'string',
             'user_id' => 'integer|exists:users,id',
             'chat_room_id' => 'integer|exists:chat_rooms,id',
             'sent_at' => 'date',
             'read_at' => 'nullable|date',
             'deleted_at' => 'nullable|date'
         ]);
 
         if ($validator->fails()) {
             return response()->json($validator->errors(), 400);
         }
 
         $message->update($validator->validated());
         return response()->json($message);
     }
 
     // Briše poruku
     public function destroy($id)
     {
         $message = Message::findOrFail($id);
         $message->delete();
         return response()->json(null, 204);
     }
}
