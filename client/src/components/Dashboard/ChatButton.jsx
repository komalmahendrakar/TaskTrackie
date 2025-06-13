
import React, { useState } from 'react';


const ChatButton = ({setchatbotdiv}) => {
 
  
  
  return ( 

    <>
  
 
    
     
      <button
      onClick ={()=>{setchatbotdiv(true)}}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ease-out hover:shadow-2xl hover:scale-105"
        style={{
          background: 'linear-gradient(135deg, #8a2be2, #5d3fd3, #4169e1)',
          boxShadow: '0 4px 30px rgba(138, 43, 226, 0.5)',
          animation: 'float 4s ease-in-out infinite',
          
        }}
        
      >
       
        
      
        <div className="relative w-8 h-8 flex items-center justify-center">
          
          <div className="relative w-5 h-18 text-purple-700 font-bold text-lg z-10"> ⚡</div>
        </div>
      </button>

      
      {/* Global styles */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.5); }
        }
        
        .magical-glow {
          animation: glow 1.5s infinite alternate;
        }
        
        @keyframes glow {
          from { box-shadow: 0 0 10px -10px #a0a7ff; }
          to { box-shadow: 0 0 20px 5px #8a2be2; }
        }
      `}</style>
    </>
  );
};

export default ChatButton;
