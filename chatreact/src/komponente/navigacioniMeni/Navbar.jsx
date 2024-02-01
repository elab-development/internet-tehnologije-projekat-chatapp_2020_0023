import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

const Navbar = ({token,setToken}) => {
  let navigate = useNavigate();
  const handleLogout = async () => {
    try {
      
      await axios.post('http://127.0.0.1:8000/api/logout', null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      
      localStorage.clear();

      
      setToken(null);

     
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        ITEH ChatApp
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-item">
          Početna
        </Link>
        {token ? (  
          <>          <button onClick={handleLogout} className="nav-item">
            Odjavi se
          </button>
           <Link to="/profile" className="nav-item">
           Moj Profil
         </Link></>

        ) : (
          <Link to="/auth" className="nav-item">
            Autentifikacija
          </Link>
        )}
       
      </div>
    </nav>
  );
};

export default Navbar;
