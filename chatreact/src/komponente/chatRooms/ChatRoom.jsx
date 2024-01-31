import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ChatRoom.css';
import Message from './Message';

const ChatRoom = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userId = localStorage.getItem('auth_id');
  const authToken = localStorage.getItem('auth_token');
  const { id: chatRoomId } = useParams();

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
          </tr>
        </thead>
        <tbody>
          {filteredMessages.slice(-5).map((msg) => (
            <Message
                key={msg.id}
                id={msg.id}
                body={msg.body}
                userName={msg.user.name}
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
