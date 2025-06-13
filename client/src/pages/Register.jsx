import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios"; 
import Aurora from '../components/Dashboard/Aurora'; 
const Register = () => {
  const navigate=useNavigate();
  const [Values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    console.log("Registering with data:", Values); 
    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/register",
        Values,
        { withCredentials: true } // ✅ Include this to send/receive cookies
      );
      
      alert(res.data.success);
      navigate("/login");
        } catch (error) {
          alert(error?.response?.data?.error || "Server error. Please try again later.");

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
          <h1 className="text-white font-cinzel text-3xl p-4 text-center mb-1 font-bold ">
            TaskWand
          </h1>
        </div>

        <div className="justify-center w-[80vw] md:w-[50vw] lg:w-[40vw] m-[150px] items-center">
          <h2 className="text-white font-cinzel text-3xl p-4 text-center mb-1 font-bold ">
            Register with Taskly
          </h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              required
              placeholder="username"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%]"
              name="username"
              value={Values.username}
              onChange={change}
            />
            <input
              type="email"
              required
              placeholder="email"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%]"
              name="email"
              value={Values.email}
              onChange={change} // ✅ Fixed onChange
            />
            <input
              type="password"
              required
              placeholder="password"
              className="border rounded px-4 py-1 border-zinc-400 w-[100%]"
              name="password"
              value={Values.password}
              onChange={change} // ✅ Fixed onChange
            />
            <button type="submit"
              className="bg-yellow-500 text-white font-semibold py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={register}
            >
              Register
            </button>

            <p className="text-center font-semibold text-gray-900">
              Already have an account?
              <Link className="text-blue" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
  </div>
  );
};

export default Register;
