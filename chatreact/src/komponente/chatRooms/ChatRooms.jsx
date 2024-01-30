 import React from 'react';
import './ChatRooms.css';
import useChatRooms from '../korDefKuke/useChatRooms';
 
const ChatRooms = () => {
  const authToken = localStorage.getItem('auth_token');
  const { chatRooms, loading, error } = useChatRooms(authToken);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="chat-rooms-container">
      <h1>Chat Rooms</h1>
      <table className="chat-rooms-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Private</th>
            <th>Max Participants</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {chatRooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.is_private ? 'Yes' : 'No'}</td>
              <td>{room.max_participants}</td>
              <td>{room.description || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChatRooms;
