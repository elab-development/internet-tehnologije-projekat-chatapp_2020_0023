 
import './App.css';
import AuthForm from './komponente/auth/AuthForm';
import Pocetna from './komponente/pocetna/Pocetna';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Pocetna />} />
      <Route path="/auth" element={<AuthForm />} />
    </Routes>
  </Router>
  );
}

export default App;
