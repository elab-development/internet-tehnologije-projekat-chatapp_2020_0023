import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserProfile.css';
import { FaBirthdayCake, FaEnvelope, FaMapMarkerAlt, FaUser, FaUserEdit } from 'react-icons/fa';
import useUserData from '../korDefKuke/useUserData';
const UserProfile = () => {
  const auth_token = localStorage.getItem('auth_token');
  const { userData, loading, error, setUserData } = useUserData(auth_token);  
  const [newPasswordData, setNewPasswordData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  });

  const [isEditing, setIsEditing] = useState(false); 

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setNewPasswordData({ ...newPasswordData, [name]: value });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/user/update', userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });
      console.log('Profile updated:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Profile update error:', error.response.data);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/change-password', newPasswordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
        },
      });
      console.log('Password changed:', response.data);
      setNewPasswordData({
        current_password: '',
        new_password: '',
        new_password_confirmation: '',
      });
    } catch (error) {
      console.error('Change password error:', error.response.data);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
return (
  <div className="user-profile-container">
  <div className="user-info-display">
        <img
          src={userData.profile_image ? `http://127.0.0.1:8000/storage/${userData.profile_image}` : 'default-profile.png'}
          alt="Profile"
          className="profile-image"
        />

        <h2><FaUser /> {userData.name}</h2>
        <p><FaEnvelope /> {userData.email}</p>
        <p><FaBirthdayCake /> {userData.date_of_birth}</p>
        <p><FaMapMarkerAlt /> {userData.location}</p>
        <p>{userData.bio}</p>
        <button onClick={() => setIsEditing(true)} className="edit-button">
          <FaUserEdit /> Uredi Profil
        </button>
      </div>
    
    {isEditing ? ( // Prikazivanje forme za uređivanje samo ako je isEditing true
      <>
        <h2>Profil</h2>
        <form onSubmit={handleProfileUpdate} className="profile-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={userData.name}
            onChange={handleUserInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userData.email}
            onChange={handleUserInputChange}
          />
          <input
            type="date"
            name="date_of_birth"
            placeholder="Date of Birth"
            value={userData.date_of_birth}
            onChange={handleUserInputChange}
          />
          <input
            type="text"
            name="bio"
            placeholder="Bio"
            value={userData.bio}
            onChange={handleUserInputChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={userData.location}
            onChange={handleUserInputChange}
          />
          <button type="submit">Ažuriraj Profil</button>
          <button onClick={() => setIsEditing(false)} className="close-button">
            Zatvori
          </button>

        </form>
      </>
    ) : null}

      {/* <h2>Promena Lozinke</h2>
      <form onSubmit={handleChangePassword}>
        <input
          type="password"
          name="current_password"
          placeholder="Trenutna Lozinka"
          value={newPasswordData.current_password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          name="new_password"
          placeholder="Nova Lozinka"
          value={newPasswordData.new_password}
          onChange={handlePasswordChange}
        />
        <input
          type="password"
          name="new_password_confirmation"
          placeholder="Potvrda Nove Lozinke"
          value={newPassword}
            onChange={handlePasswordChange}
            />
            <button type="submit">Promeni Lozinku</button>
          </form>
         */}
         </div>
      );
    };
    
    export default UserProfile;
    