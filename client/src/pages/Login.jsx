import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Aurora from '../components/Dashboard/Aurora';

const Login = () => {
  const navigate = useNavigate();
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/login",
        Values,
        { withCredentials: true } 
      );
  
      // If login was successful (status 200), navigate
      if (res.status === 200) {
        localStorage.setItem("isLoggedIn", "true");
    

        navigate("/Choose");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Login failed";
      alert(errorMessage);
    }
  };
  
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden">
       <div className="absolute fixed inset-0 z-10 pointer-events-none">
      <Aurora
        colorStops={["#FFF56D", "#00FFDD", "#49FF00"]}
        blend={0.1}
        amplitude={1}
        speed={0.7}
      />
      </div>
    <div className="flex h-[75px] flex-col fixed inset-0 z-50 items-center  ">
      <div className='w-[60vw] md:[50vw] lg:w-[30vw]'>
        <h1 className='text-white font-cinzel text-3xl p-4 text-center mb-1 font-bold '>Welcome to TaskWand 🪄<br></br></h1>
        <p className='text-[#FFF338]  font-cinzel text-center text-md'>Let the Magic Begin!!</p>
      </div>

      <div className='justify-center w-[80vw] md:w-[50vw] lg:w-[40vw] m-[150px] items-center '> 
        <h2 className='text-center  font-cinzel text-lg font-semibold text-white'>Login with Taskly</h2>
        <form className='flex flex-col gap-4'>
          <input 
            type='email' 
            required 
            placeholder='Email'
            className='border text-white rounded px-4 py-1 border-white w-[100%]'
            name='email'
            value={Values.email}
            onChange={change}
          />

          <input 
            type='password' 
            required 
            placeholder='Password' 
            className='border text-white rounded px-4 py-1 border-white w-[100%]'
            name='password'
            value={Values.password}
            onChange={change}
          />

          <button
            className='bg-[#FEBA17] text-white font-semibold py-2 rounded hover:bg-white transition-all duration-300'
            onClick={login}
          >
            Login
          </button>
        
          <p className='text-center font-semibold text-white'>
            Don't have an account?
            <Link className='text-blue-600 ml-1' to='/register'>Signup</Link>
          </p>
        </form>
      </div>
    </div>
    </div>
   
  )
}

export default Login;