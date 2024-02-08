<?php

namespace App\Events;

use App\Models\Message;  
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast  
{  
    /*Glavna uloga MessageSent klase je da omogući real-time komunikaciju između servera i klijenata. Kada se nova poruka kreira i event MessageSent se emituje, svi klijenti koji slušaju na odgovarajućem kanalu (chat.{chat_room_id}) će u realnom vremenu primiti tu poruku. Ovo omogućava dinamičnu interakciju unutar aplikacije bez potrebe za osvežavanjem stranice. */
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message)  
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()  //Metoda broadcastOn definiše na kojem kanalu će se event emitovati. U vašem slučaju, to je privatni kanal koji je specifičan za svaku chat sobu, omogućavajući vam da ograničite pristup porukama samo članovima te chat sobe. Korišćenje privatnih kanala takođe pomaže u očuvanju privatnosti i sigurnosti komunikacije.
    {
        return new PrivateChannel('chat.' . $this->message->chat_room_id);
    }
    

    /**
     * The event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'message.sent';  
    }
}
