import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
const AuthForm = ({setToken}) => {
  let navigate= useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    date_of_birth: '',
    bio: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: formData.email,
          password: formData.password,
        });
        console.log(response.data);
        localStorage.setItem("auth_token",response.data.token);
        setToken(response.data.token)
        navigate('/chatrooms')
      } catch (error) {
        console.error('Login error:', error.response.data);
        alert(error.response.data.message.toString()); 
      }
    } else {
      try {
        const registerFormData = new FormData();
        Object.keys(formData).forEach((key) => {
          if (key !== 'confirmPassword') {
            registerFormData.append(key, formData[key]);
          }
        });
        const response = await axios.post('http://127.0.0.1:8000/api/register', registerFormData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error('Registration error:', error.response.data);
        alert(error.response.data.message.toString()); 
      }
    }
  };

  return (
    <div className="auth-form">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <InputField
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputField
              type="date"
              name="date_of_birth"
              placeholder="Date of Birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleInputChange}
            />
            <InputField
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <InputField
              type="file"
              name="profile_image"
              onChange={handleFileChange}
            />
          </>
        )}
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <InputField
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        {!isLogin && (
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Register" : 'Have an account? Login'}
      </button>
    </div>
  );
};

export default AuthForm;
