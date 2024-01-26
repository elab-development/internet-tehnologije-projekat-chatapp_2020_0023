<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatRoomController extends Controller
{
    // Prikazuje sve chat sobe
    public function index()
    {
        $chatRooms = ChatRoom::all();
        return response()->json($chatRooms);
    }

    // Prikazuje specifičnu chat sobu
    public function show($id)
    {
        $chatRoom = ChatRoom::findOrFail($id);
        return response()->json($chatRoom);
    }

    // Kreira novu chat sobu
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'is_private' => 'required|boolean',
            'max_participants' => 'required|integer',
            'description' => 'string|nullable'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $chatRoom = ChatRoom::create($validator->validated());
        return response()->json($chatRoom, 201);
    }

    // Ažurira postojeću chat sobu
    public function update(Request $request, $id)
    {
        $chatRoom = ChatRoom::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'is_private' => 'boolean',
            'max_participants' => 'integer',
            'description' => 'string|nullable'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $chatRoom->update($validator->validated());
        return response()->json($chatRoom);
    }

    // Briše chat sobu
    public function destroy($id)
    {
        $chatRoom = ChatRoom::findOrFail($id);
        $chatRoom->delete();
        return response()->json(null, 204);
    }
}