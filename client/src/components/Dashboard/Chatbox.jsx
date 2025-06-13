import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { parseGemMsg } from "../../utility/gemini";



const Chatbox = ({ setchatbotdiv }) => {
  console.log("API KEY: ", import.meta.env.VITE_GEMINI_API_KEY);

    const [chatHistory, setChatHistory] = useState([]);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { sender: "gemini", text: "Greetings, seeker of knowledge! ✨ I am your magical assistant. Ask me anything..." }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!message.trim()) return;

  const userMsg = message.trim();

  // Step 0: Show user message in chat immediately
  setMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
  setMessage("");
  setLoading(true);
  setError("");

  try {
    // Step 1: Send to Gemini to detect intent and/or reply
    const parsed = await parseGemMsg(userMsg);

    if (parsed.intent === "addTask" || parsed.intent === "updateTask" || parsed.intent === "deleteTask") {
      // Step 2A: Handle task-based logic
      await axios.post("http://localhost:1000/api/v1/tasks/addTask", parsed, {
        withCredentials: true,
      });

      // Step 3A: Show confirmation
      setMessages((prev) => [
        ...prev,
        { sender: "gemini", text: `✅ Task "${parsed.title}" ${parsed.intent === "addTask" ? "added" : parsed.intent === "updateTask" ? "updated" : "deleted"}.` },
      ]);
    } else if (parsed.intent === "chat" && parsed.reply) {
      // Step 2B: Regular Gemini reply
      setMessages((prev) => [
        ...prev,
        { sender: "gemini", text: parsed.reply },
      ]);

      // Optional: maintain chat history if you use it later
      const updatedHistory = [
        ...chatHistory,
        { role: "user", parts: [{ text: userMsg }] },
        { role: "model", parts: [{ text: parsed.reply }] },
      ];
      setChatHistory(updatedHistory);
    } else {
      // Unknown intent fallback
      setMessages((prev) => [
        ...prev,
        { sender: "gemini", text: "🤔 I'm not sure how to respond to that." },
      ]);
    }
  } catch (err) {
    if (err.response && err.response.status === 429) {
      setTimeout(() => handleSubmit(e), 10000); // Retry after 10 seconds
    }

    console.error("Error handling message:", err.message);
    setError("The magical connection has been disrupted.");
    setMessages((prev) => [
      ...prev,
      { sender: "gemini", text: "Something went wrong. Try again." },
    ]);
  } finally {
    setLoading(false);
  }
};






 

  return (
    <div className="relative max-w-xl mx-auto rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[85vh] bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-800 border-2 border-purple-400 min-h-screen">
      {/* Magical Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-pink-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-40 animate-ping"></div>
      </div>
      
      {/* Header with Magical Elements */}
      <div className="relative z-10 flex justify-between items-center px-5 py-4 bg-gradient-to-r from-black-800/80 to-indigo-800/80 backdrop-blur-sm border-b border-purple-400">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-purple-300">Arcane Oracle</h2>
            <p className="text-xs text-purple-200">Whisper your questions to the cosmos</p>
          </div>
        </div>
        <button
          onClick={() => setchatbotdiv(false)}
          className="p-2 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Chat History with Magical Scroll */}
      <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl backdrop-blur-sm shadow-lg transition-all duration-300 transform ${
                msg.sender === "user"
                  ? "bg-gradient-to-br from-blue-600/80 to-indigo-700/80 text-white rounded-br-none"
                  : "bg-gradient-to-br from-purple-800/70 to-fuchsia-800/70 text-purple-100 rounded-bl-none"
              } ${idx === messages.length - 1 ? 'animate-fadeIn' : ''}`}
            >
              <p className="whitespace-pre-wrap text-sm">{msg.text}</p>
              <div className="absolute bottom-0 w-4 h-4">
                {msg.sender === "user" ? (
                  <div className="absolute -bottom-4 right-0 w-4 h-4 overflow-hidden">
                    <div className="w-4 h-4 bg-blue-600/80 rotate-45 transform origin-top-left"></div>
                  </div>
                ) : (
                  <div className="absolute -bottom-4 left-0 w-4 h-4 overflow-hidden">
                    <div className="w-4 h-4 bg-purple-800/70 -rotate-45 transform origin-top-right"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[60%] px-4 py-3 rounded-2xl bg-gradient-to-br from-purple-800/70 to-fuchsia-800/70 backdrop-blur-sm shadow-lg rounded-bl-none">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-150"></div>
                </div>
                <span className="text-xs text-purple-200 italic">Consulting the stars...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Error Message */}
      {error && (
        <div className="relative z-10 text-center px-4 py-2 bg-red-900/60 backdrop-blur-sm text-red-100 text-sm border-t border-red-800/50">
          <div className="flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Magical Input Area */}
      <div className="relative z-10 p-4 border-t border-purple-700/50 bg-gradient-to-r from-purple-900/60 to-indigo-900/60 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Whisper your question to the cosmos..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-purple-900/40 backdrop-blur-sm text-purple-100 rounded-2xl border border-purple-600/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder:text-purple-400/70"
              disabled={loading}
            />
            <div className="absolute right-3 top-3 text-purple-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !message.trim()}
            className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
        
       
      </div>
      
   
      
      {/* Custom Styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(99, 102, 241, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(192, 132, 252, 0.4);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(217, 70, 239, 0.6);
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
          
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
          }
          
          .animate-float {
            animation: float linear infinite;
          }
        `}
      </style>
    </div>
  );
};



export default Chatbox;