import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ChatRoom.css';
import Message from './Message';
import { useQuery, useQueryClient } from 'react-query'; //za keseiranje

//za implementaciju web soketa
import Echo from 'laravel-echo';

window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'fe8b8e72f5dfc49bfe8d',
  cluster: 'eu',
  forceTLS: true
});

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
 // const [funFact, setFunFact] = useState(''); // Dodajemo state za fun fact
  const userId = localStorage.getItem('auth_id');
  const authToken = localStorage.getItem('auth_token');
  const { id: chatRoomId } = useParams();


  //posto radimo kesiranje podataka za funFact, malo menjamo kod 
  const queryClient = useQueryClient();
  const { data: funFact, isLoading: isLoadingFunFact, error: funFactError } = useQuery('funFact', async () => {
    const apiKey = 'QxMU0Daw1G4sRqVm6vPxjIB216188KMvISmtSJ1K';
    const response = await axios.get('https://api.api-ninjas.com/v1/facts?limit=1', {
      headers: {
        'X-Api-Key': apiKey
      }
    });
    return response.data[0].fact;
  });

  useEffect(() => { 
    // Implementacija web soketa
    
    const channel = window.Echo.private(`chat.${chatRoomId}`);
  
    channel.listen('.message.sent', (e) => {
      // Dodajte novu poruku na listu poruka
      setMessages(messages => [...messages, e.message]);
    });
  
    // Očistite i prekinite slušanje na kanalu kada se komponenta demontira
    return () => {
      channel.stopListening('.message.sent');
      window.Echo.leaveChannel(`chat.${chatRoomId}`);
    };
  }, []);  
  
  
  const fetchChatRoomMessages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/chat-rooms/messages/${chatRoomId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      console.error('Greška pri dobijanju poruka:', error);
    }
  };
  
  // const fetchFunFact = async () => {  //ovo nam ne treba vise jer smo ucitali podatk ena drugi nacin zbog kesiranja
  //   const apiKey = 'QxMU0Daw1G4sRqVm6vPxjIB216188KMvISmtSJ1K';  
  //   const apiUrl = 'https://api.api-ninjas.com/v1/facts?limit=1';
  
  //   try {
  //     const response = await axios.get(apiUrl, {
  //       headers: {
  //         'X-Api-Key': apiKey
  //       }
  //     });
  
  //     if (response.data) {
  //       setFunFact(response.data[0].fact);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching Fun Fact:', error);
  //   }
  // };
  
 // useEffect(() => {
  //   fetchFunFact(); // Pozivamo funkciju za dohvatanje fun fact-a
  // }, []); // Prazan niz znači da će se pozvati samo jednom prilikom montiranja komponente

  
  useEffect(() => {
    fetchChatRoomMessages();
    // Postavljanje intervala za periodično osvežavanje svakih 5 sekundi
    const intervalId = setInterval(fetchChatRoomMessages, 5000);

    // Očisti interval pri povlačenju komponente
    return () => clearInterval(intervalId);
  }, [chatRoomId]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/messages',
        {
          body: message,
          user_id: userId,
          chat_room_id: chatRoomId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log('Poruka uspešno kreirana:', response.data);

      setMessages([...messages, response.data]);

      setMessage('');
    } catch (error) {
      console.error('Greška pri kreiranju poruke:', error);
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMessages = messages.filter((msg) => {
    const userMatch = msg.user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const bodyMatch = msg.body.toLowerCase().includes(searchTerm.toLowerCase());
    return userMatch || bodyMatch;
  });

  return (
    <div className="chat-room-container">
      <h1>Chat Room</h1>
    
      <div className="fun-fact">
        <p>{funFact}</p>
      </div>
      <div className="search-input-container">
        <label>Pretraga:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <table className="chat-room-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Poruka</th>
            <th>Korisnik</th>
            <th>Akcije</th>
          </tr>
        </thead>
        <tbody>
          {filteredMessages.slice(-5).map((msg) => (
            <Message
              key={msg.id}
              id={msg.id}
              body={msg.body}
              userName={msg.user.name}
              userId={msg.user_id}
              loggedInUserId={Number(userId)}
              onDelete={(deletedMessageId) => {
                setMessages(messages.filter((msg) => msg.id !== deletedMessageId));
              }}
              authToken={authToken}
              messages={messages}
              setMessages={setMessages}
            />
          ))}
        </tbody>
      </table>
      <br />
      <form className="chat-room-form" onSubmit={handleSubmit}>
        <div>
          <label>Poruka:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="chat-room-input"
          />
        </div>
        <button type="submit" className="chat-room-submit-button">
          Pošalji
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
