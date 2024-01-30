 
import { useState } from 'react';
import './App.css';
import AuthForm from './komponente/auth/AuthForm';
import UserProfile from './komponente/auth/UserProfile';
import Navbar from './komponente/navigacioniMeni/Navbar';
import Pocetna from './komponente/pocetna/Pocetna';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ChatRooms from './komponente/chatRooms/ChatRooms';
function App() {
  const [token,setToken] = useState(null);
  return (
    <Router>
      <Navbar token={token} setToken={setToken}></Navbar>
    <Routes>
     
      <Route path="/" element={<Pocetna />} />
      <Route path="/auth" element={<AuthForm setToken={setToken}/>} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/chatrooms" element={<ChatRooms />} />
    </Routes>
  </Router>
  );
}

export default App;
