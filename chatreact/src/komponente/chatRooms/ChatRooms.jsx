import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ChatRooms.css'; 
import ReactPaginate from 'react-paginate';
const ChatRooms = () => {
  const authToken = localStorage.getItem('auth_token');
  const userId = localStorage.getItem('auth_id');
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 5;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const fetchChatRooms = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/chat-rooms', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setChatRooms(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  const handleJoinRoom = async (chatRoomId) => {
    try {
      await axios.post(
        'http://127.0.0.1:8000/api/chat-room-users',
        {
          user_id: userId,
          chat_room_id: chatRoomId,
          joined_at: new Date().toISOString(),
          role: 'member',
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      fetchChatRooms();  
    } catch (error) {
      console.error('Error joining room:', error.response.data);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  const displayedChatRooms = chatRooms.slice(currentPage * perPage, (currentPage + 1) * perPage);
  return (
    <div className="chat-rooms-container">
      <h1>Available chat rooms</h1>
      <table className="chat-rooms-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Private</th>
            <th>Max Participants</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         {displayedChatRooms.map((room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.is_private ? 'Yes' : 'No'}</td>
              <td>{room.max_participants}</td>
              <td>{room.description || 'N/A'}</td>
              <td>
                <button onClick={() => handleJoinRoom(room.id)} className="join-button">
                  Pridruži se
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={'Prethodna'}
        nextLabel={'Sledeća'}
        breakLabel={'...'}
        pageCount={Math.ceil(chatRooms.length / perPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
     
    </div>
  );
};

export default ChatRooms;
