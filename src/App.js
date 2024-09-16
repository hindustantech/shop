import './App.css';
import { Home } from './Componenet/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Shop } from './Componenet/Shop';
import SignUp from './Componenet/SignUp';
import Login from './Componenet/Login';
import Dashboard from './Componenet/Dashboard';
import Profile from './Componenet/Profile';

function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop/>} /> 
          <Route path="/dashboard" element={<Dashboard/>} /> 
          <Route path="/profile" element={<Profile/>} /> 
          <Route path="/Login" element={<Login/>} /> 
          <Route path="/singup" element={<SignUp/>} /> 
          
          
          
        </Routes>
      </Router>

    </>


  );
}

export default App;
