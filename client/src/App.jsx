import React, { useEffect } from 'react';
import { Routes,Route, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { Choose } from './pages/Choose';
import Dashboard from './pages/Dashboard';
import Dashboard2 from './pages/Dashboard2';
import SplashCursor from '../src/components/Dashboard/SplashCursor'


const App = () => {
  const navigate = useNavigate();
 
  useEffect(() => {
    if(localStorage.getItem("isLoggedIn")){

      navigate("/Choose");
    } else {
      navigate("/login");
    }
  }, []);
  

  return (

    <>

<SplashCursor/>
  <Routes>
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/dashboard2" element={<Dashboard2 />} />
  <Route path="/Choose" element={<Choose />}/>
  </Routes>
    </>
  );
}

export default App;