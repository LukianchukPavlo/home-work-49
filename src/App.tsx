import './App.css'
import User from './Pages/User'
import { useIdleTimer } from "react-idle-timer";
import { Routes,Route, useNavigate, Navigate } from 'react-router';

import Home from './Pages/Home';


function App() {
  const navigate = useNavigate();
  
  const onIdle = () => {
    setTimeout(() => navigate("/home"), 2000);
    }
  

  useIdleTimer({
    timeout: 15*1000,
    onIdle,
    debounce: 500
  })

  return (
    <>
    <Routes>
      <Route path="/" element={<Navigate to="/user" replace />} />
      <Route path="/user" element={<User/>}/>
      <Route path="/home" element={<Home/> }/>
    </Routes>
    </>
  )
}

export default App
