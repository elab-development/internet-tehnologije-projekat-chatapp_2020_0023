<?php

namespace Database\Factories;

use App\Models\ChatRoom;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ChatRoomUser>
 */
class ChatRoomUserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'user_id' => function () {
                return User::factory()->create()->id;
            },
            'chat_room_id' => function () {
                return ChatRoom::factory()->create()->id;
            },
            'joined_at' => $this->faker->dateTimeThisYear,
            'role' => $this->faker->randomElement(['admin', 'member']),
            'muted_until' => $this->faker->optional()->dateTimeThisYear,
        ];
    }
}
