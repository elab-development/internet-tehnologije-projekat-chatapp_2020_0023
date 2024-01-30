// useChatRooms.js

import { useState, useEffect } from 'react';
import axios from 'axios';

const useChatRooms = (authToken) => {
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
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
    };

    if (authToken) {
      fetchChatRooms();
    }
  }, [authToken]);

  return { chatRooms, loading, error };
};

export default useChatRooms;
