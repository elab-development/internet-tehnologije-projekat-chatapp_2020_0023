 
import './App.css';
import Pocetna from './komponente/pocetna/Pocetna';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Pocetna />} />
      
    </Routes>
  </Router>
  );
}

export default App;
