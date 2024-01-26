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
        Schema::table('users', function (Blueprint $table) {
            $table->string('profile_image')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->string('status')->nullable();
            $table->timestamp('last_online_at')->nullable();
            $table->text('bio')->nullable();
            $table->string('location')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('profile_image');
            $table->dropColumn('date_of_birth');
            $table->dropColumn('status');
            $table->dropColumn('last_online_at');
            $table->dropColumn('bio');
            $table->dropColumn('location');
        });
    }
};
