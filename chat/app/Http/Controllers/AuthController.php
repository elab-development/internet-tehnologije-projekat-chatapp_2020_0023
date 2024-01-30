<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'profile_image' => 'nullable|image|max:2048',
            'date_of_birth' => 'required|date|before:today',
            'status' => 'sometimes|string|max:255',
            'last_online_at' => 'sometimes|date',
            'bio' => 'nullable|string',
            'location' => 'nullable|string|max:255',
             
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Učitavanje slike profila, ako je prisutna
        $profileImagePath = null;
        if ($request->hasFile('profile_image')) {
            $profileImagePath = $request->file('profile_image')->store('profile_images', 'public');
        }

        // Kreiranje korisnika
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'profile_image' => $profileImagePath,
            'date_of_birth' => $request->date_of_birth,
            'status' => $request->status ?? 'offline',  
            'last_online_at' => now(),  
            'bio' => $request->bio,
            'location' => $request->location,
        ]);

        return response()->json($user, 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Neispravni podaci za prijavu'], 401);
        }

        $token = $user->createToken(Str::random(40))->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Uspešno ste se odjavili']);
    }
 
    public function userProfile(Request $request)  //profil ulogovanog korisnika
    {
        return response()->json($request->user());
    }


    public function updateUser(Request $request)
    {
        $user = $request->user();
    
        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'email' => 'string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'sometimes|min:6',
            'profile_image' => 'nullable|image|max:2048',
            'date_of_birth' => 'date|before:today',
            'bio' => 'nullable|string',
            'location' => 'string|max:255',
          
        ]);
    
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
    
        // Ažuriranje podataka
        if ($request->has('name')) {
            $user->name = $request->name;
        }
        if ($request->has('email')) {
            $user->email = $request->email;
        }
        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }
        if ($request->hasFile('profile_image')) {
            $profileImagePath = $request->file('profile_image')->store('profile_images', 'public');
            $user->profile_image = $profileImagePath;
        }
        if ($request->has('date_of_birth')) {
            $user->date_of_birth = $request->date_of_birth;
        }
        if ($request->has('bio')) {
            $user->bio = $request->bio;
        }
        if ($request->has('location')) {
            $user->location = $request->location;
        }
    
        $user->save();
    
        return response()->json($user);
    }
     
    public function searchUsers(Request $request)
{
    $query = User::query();

    // Filtriranje na osnovu imena
    if ($request->has('name')) {
        $query->where('name', 'like', '%' . $request->name . '%');
    }

    // Filtriranje na osnovu emaila
    if ($request->has('email')) {
        $query->where('email', 'like', '%' . $request->email . '%');
    }

    // Filtriranje na osnovu datuma rođenja
    if ($request->has('date_of_birth')) {
        $query->whereDate('date_of_birth', '=', $request->date_of_birth);
    }

    // Filtriranje na osnovu statusa
    if ($request->has('status')) {
        $query->where('status', 'like', '%' . $request->status . '%');
    }

    // Filtriranje na osnovu poslednjeg online statusa
    if ($request->has('last_online_at')) {
        $query->whereDate('last_online_at', '=', $request->last_online_at);
    }

    // Filtriranje na osnovu biografije
    if ($request->has('bio')) {
        $query->where('bio', 'like', '%' . $request->bio . '%');
    }

    // Filtriranje na osnovu lokacije
    if ($request->has('location')) {
        $query->where('location', 'like', '%' . $request->location . '%');
    }

    // Izvršavanje upita i vraćanje rezultata
    $users = $query->get();
    return response()->json($users);
    }
    public function changePassword(Request $request)
    {
        $user = $request->user();

        // Validacija podataka
        $request->validate([
            'current_password' => 'required',
            'new_password' => 'required|string|min:6|confirmed',
        ]);

        // Provera da li trenutna lozinka odgovara
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Trenutna lozinka nije tačna'], 400);
        }

        // Ažuriranje lozinke
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Lozinka je uspešno promenjena']);
    }

}
