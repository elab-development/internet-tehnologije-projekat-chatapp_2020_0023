<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\SoftDeletes;

/*Pivot klasa u Laravelu je specijalna vrsta modela koja se koristi za upravljanje "many-to-many" (mnogo-prema-mnogo) 
odnosima između modela. U kontekstu Eloquent ORM-a, koji je deo Laravela, pivot klasa omogućava manipulaciju dodatnim 
podacima u pivot tabeli, koja je tabelarni predstavnik veze mnogo-prema-mnogo. */
class ChatRoomUser extends Pivot
{
  
    use HasFactory;
    use SoftDeletes; 

    // Definisanje da je ovaj model pivot model
    protected $table = 'chat_room_user'; // Pretpostavljajući da je ovo ime pivot tabele
  // Atributi koji se mogu masovno dodeljivati
    protected $fillable = [
        'user_id', 
        'chat_room_id',
        'joined_at',
        'role',
        'muted_until'
    ];

   
    protected $dates = ['joined_at', 'muted_until','deleted_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function chatRoom()
    {
        return $this->belongsTo(ChatRoom::class);
    }
}
