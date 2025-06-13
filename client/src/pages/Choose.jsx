import React from 'react'
import Aurora from '../components/Dashboard/Aurora';
import Dashboard from './Dashboard';
import { Link, useNavigate } from "react-router-dom";
export const Choose = () => {
    const navigate = useNavigate();
 return (
  
  

    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
        
      <h1 className="text-2xl font-semibold mb-8 text-gray-800">
        What do you want to work on today?
      </h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="px-6 py-3 bg-blue-600 text-white rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          Personal Tasks
        </button>

        <button
          onClick={() => navigate("/dashboard2")}
          className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow-md hover:bg-green-700 transition"
        >
          Projects / Team
        </button>
      </div>
    </div>
  );

  

  
}
