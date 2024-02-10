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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState(null); // State for sorting
  const perPage = 5;

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(0);
  };

  const handleSort = () => {
    // Toggle sorting between ascending and descending order
    setSortBy(sortBy === 'asc' ? 'desc' : 'asc');
  };

  const sortedChatRooms = chatRooms.sort((a, b) => {
    // Sort alphabetically by room name
    if (sortBy === 'asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'desc') {
      return b.name.localeCompare(a.name);
    } else {
      return 0; // No sorting
    }
  });

  const filteredChatRooms = sortedChatRooms.filter(
    (room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
  const displayedChatRooms = filteredChatRooms.slice(currentPage * perPage, (currentPage + 1) * perPage);
  return (
    <div className="chat-rooms-container">
      <h1>Available chat rooms</h1>
      <input
        type="text"
        placeholder="Pretraga chat soba"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <button onClick={handleSort}>
        Sortiraj {sortBy === 'asc' ? 'Opadajuće' : 'Rastuće'}
      </button>
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
