// ova kuka vraca podatke o trenutno ulogovanom korisniku

import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserData = (token) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    date_of_birth: '',
    bio: '',
    location: '',
    profile_image: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError(error.response ? error.response.data : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);

  return { userData, loading, error, setUserData };
};

export default useUserData;
