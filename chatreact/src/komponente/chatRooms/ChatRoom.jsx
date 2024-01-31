import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ChatRoom.css';
const ChatRoom = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);  
    const userId = localStorage.getItem('auth_id');
    const authToken = localStorage.getItem('auth_token');
    const { id: chatRoomId } = useParams();
  
    useEffect(() => { 
        const fetchChatRoomMessages = async () => {
          try {
            const authToken = localStorage.getItem('auth_token');  
            const response = await axios.get(`http://127.0.0.1:8000/api/chat-rooms/messages/${chatRoomId}`, {
              headers: {
                Authorization: `Bearer ${authToken}`, 
              },
            });
            setMessages(response.data.data);
          } catch (error) {
            console.error('Greška pri dobijanju poruka:', error);
          }
        };
      
        fetchChatRoomMessages();
      }, [chatRoomId]);
      
  
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
  
        
        setMessages([...messages, response.data]);
     
        setMessage('');
      } catch (error) {
        console.error('Greška pri kreiranju poruke:', error);
      }
    };
  
    return (
        <div className="chat-room-container">  
          <h1>Chat Room</h1> 
          <table className="chat-room-table">  
            <thead>
              <tr>
                <th>ID</th>
                <th>Poruka</th>
                <th>Korisnik</th>
              </tr>
            </thead>
            <tbody>
                {messages.slice(-5).map((msg) => ( // Koristimo slice(-5) da bismo dobili poslednjih 5 poruka
                <tr key={msg.id}>
                <td>{msg.id}</td>
                <td>{msg.body}</td>
                <td>{msg.user.name}</td>
                </tr>
            ))}
            </tbody>
          </table><br />
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
            <button type="submit" className="chat-room-submit-button">Pošalji</button>   
          </form>
        </div>
      );
      
  };
  
  export default ChatRoom;
  