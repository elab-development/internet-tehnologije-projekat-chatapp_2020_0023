import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ChatRoom = ({ match }) => {
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('auth_id');
  const authToken = localStorage.getItem('auth_token'); 
  const { id: chatRoomId } = useParams();  //citamo id iz linka
  const handleSubmit = async (e) => {
    e.preventDefault();
 

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/messages', {
            body: message,
            user_id: userId,
            chat_room_id: chatRoomId,
            }, {
            headers: {
                Authorization: `Bearer ${authToken}`,  
            },
            });

      console.log('Poruka uspešno kreirana:', response.data);

     
    } catch (error) {
      console.error('Greška pri kreiranju poruke:', error);
    }
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Poruka:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
};

export default ChatRoom;
