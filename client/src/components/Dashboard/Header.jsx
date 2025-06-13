import React from 'react';
import {IoLogOutOutline} from "react-icons/io5";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import ShinyText from './ShinyText';
  




  

const Header = ({setShowAddTask}) => {
  const navigate=useNavigate();
  const ToLogout =async () => {
   try {
   
    const res = await axios.post("http://localhost:1000/api/v1/logout", {}, { withCredentials: true });
    alert(res.data.message || "Default: Logged out");

   
    localStorage.removeItem("userLoggedIn");

    navigate("/login");
   } catch (error) {
    alert("Logout failed");
    navigate("/login");
   } 
  }
  return (
    <div className="flex px-12 items-center justify-between z-10 relative py-4">
     

    <h1 className="text-[35px] font-cinzel font-title font-extrabold tracking-wide drop-shadow-lg bg-gradient-to-r from-[#FFD700] via-[#FFC300] to-[#FFB300] text-transparent bg-clip-text">
  Task_Wand 🪄
</h1>

          <ShinyText text="Spell it.Do it.Nail it." disabled={true} speed={3} className='text-[20px] text-white/80 ' />
          
  

          

     
        
        <div className='flex gap-8'>
          <button className='text-xl bg-[#483AA0] hover:bg-[#27548A] p-4 transition-all duration-300 rounded-xl' onClick={()=>{
            setShowAddTask(true)}}>Add Task</button>
          <button className=' bg-[#483AA0] hover:bg-red-800 p-4 transition-all duration-300 rounded-xl' onClick={ToLogout}><IoLogOutOutline/></button>
        </div>
            </div>
  )
}

export default Header;