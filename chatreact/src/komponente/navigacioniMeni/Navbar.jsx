import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">Company Logo</Link>
      <div className="nav-links">
        <Link to="/" className="nav-item">Početna</Link>
        <Link to="/auth" className="nav-item">Autentifikacija</Link>
        <Link to="/profile" className="nav-item">Moj Profil</Link>
      </div>
    </nav>
  );
};

export default Navbar;
