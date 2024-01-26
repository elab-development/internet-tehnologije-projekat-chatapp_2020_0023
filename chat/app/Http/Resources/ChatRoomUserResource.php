<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChatRoomUserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'chat_room_id' => $this->chat_room_id,
            'joined_at' => $this->joined_at,
            'role' => $this->role,
            'muted_until' => $this->muted_until,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
