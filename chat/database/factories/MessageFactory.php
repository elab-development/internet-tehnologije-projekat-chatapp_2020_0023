<?php

namespace Database\Factories;

use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'body' => $this->faker->paragraph,
            'user_id' => function () {
                return User::factory()->create()->id;
            },
            'chat_room_id' => function () {
                return ChatRoom::factory()->create()->id;
            },
            'sent_at' => $this->faker->dateTimeThisYear,
            'read_at' => $this->faker->optional()->dateTimeThisYear,
            'deleted_at' => $this->faker->optional()->dateTimeThisYear,
        ];
    }
}
