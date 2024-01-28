 
import './App.css';
import AuthForm from './komponente/auth/AuthForm';
import UserProfile from './komponente/auth/UserProfile';
import Navbar from './komponente/navigacioniMeni/Navbar';
import Pocetna from './komponente/pocetna/Pocetna';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<Pocetna />} />
      <Route path="/auth" element={<AuthForm />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  </Router>
  );
}

export default App;
