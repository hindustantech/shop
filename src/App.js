import './App.css';
import { Home } from './Componenet/Home';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Shop } from './Componenet/Shop';
import SignUp from './Componenet/SignUp';
import Login from './Componenet/Login';
import Dashboard from './Componenet/Dashboard';

function App() {
  return (

    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop/>} /> 
          <Route path="/dahboard" element={<Dashboard/>} /> 
          <Route path="/profile" element={<SignUp/>} /> 
          <Route path="/Login" element={<Login/>} /> 
      
          
        </Routes>
      </Router>
      

    </>


  );
}

export default App;
