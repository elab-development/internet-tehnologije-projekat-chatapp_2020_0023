<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\ChatRoom;
use App\Models\ChatRoomUser;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
         User::factory(10)->create();
         ChatRoom::factory(10)->create();
         Message::factory(10)->create();
         ChatRoomUser::factory(10)->create();

    }
}
