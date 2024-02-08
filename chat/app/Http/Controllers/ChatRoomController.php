<?php

namespace App\Http\Controllers;

use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatRoomController extends Controller
{
    // Prikazuje sve chat sobe koje su javne i kojima ulogovani korisnik vec nije pridruzen //ovu metodu koristimo na frontu da omogucimo useru da moze da se pridruzi nekom chat roomu kako bi mogao da salje poruke, ne zelimo da mu prikazemo chat rooms u koje je vec uclanjen
    public function index()
    {
        $user = auth()->user(); //uzimamo ulogovanog usera 
        $chatRooms = ChatRoom::where('is_private', false)
                ->whereDoesntHave('participants', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })
                ->get();
        return response()->json($chatRooms);
    }
    public function myChatRooms() //dodata metoda koja vraca sve chat rooms u koje je ulogovan korisnik koji je ulogovan
    {
        $user = auth()->user(); // Uzimamo trenutno ulogovanog korisnika
    
        // Dohvatanje svih chat soba kojima je korisnik pridružen
        $myChatRooms = ChatRoom::whereHas('participants', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->get();
    
        return response()->json($myChatRooms);
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


    // Metoda za pretragu chat soba
    public function search(Request $request)
    {
        $query = ChatRoom::query();

        // Pretraga po imenu sobe
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        // Filtriranje na osnovu privatnosti sobe
        if ($request->has('is_private')) {
            $query->where('is_private', $request->is_private);
        }

        // Filtriranje na osnovu maksimalnog broja učesnika
        if ($request->has('max_participants')) {
            $query->where('max_participants', $request->max_participants);
        }

        // Pretraga na osnovu opisa sobe
        if ($request->has('description')) {
            $query->where('description', 'like', '%' . $request->description . '%');
        }

        // Izvršavanje upita i vraćanje rezultata
        $chatRooms = $query->get();
        return response()->json($chatRooms);
    }



    

    public function statistics()
    {
        // Dohvati sve chat sobe sa brojem korisnika koji su im pridruženi
        $chatRooms = ChatRoom::withCount('participants')->get();
    
        // Ukupan broj svih korisnika
        $totalUsers = User::count();
    
        // Ukupan broj chat soba
        $totalChatRooms = ChatRoom::count();
        
        // Kreiraj asocijativni niz sa dodatnim informacijama
        $statisticsData = [
            'chat_rooms' => $chatRooms,
            'total_users' => $totalUsers,
            'total_chat_rooms' => $totalChatRooms
        ];
    
        // Vrati rezultat kao JSON
        return response()->json($statisticsData);
    }
    

}