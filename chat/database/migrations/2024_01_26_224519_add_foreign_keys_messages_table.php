<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('messages', function (Blueprint $table) {
           
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('chat_room_id')->constrained('chat_rooms');
      
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('messages', function (Blueprint $table) {
           
            $table->dropForeign('user_id');
            $table->dropForeign('chat_room_id');
      
        });
    }
};
