import React, { useState, useEffect } from 'react';
import Header from '../components/Dashboard/Header';
import AddTask from '../components/Dashboard/AddTask';
import Title from '../components/Dashboard/Title';
import Yettostart from '../components/Dashboard/Yettostart';
import Completed from '../components/Dashboard/Completed';
import Inprogress from '../components/Dashboard/Inprogress';
import EditTask from '../components/Dashboard/EditTask';
import axios from 'axios';
import ChatButton from '../components/Dashboard/ChatButton';
import Chatbox from '../components/Dashboard/Chatbox';



function Dashboard() {
  const [chatbotdiv, setchatbotdiv] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  
  const [tasks, setTasks] = useState({
    yettobedone: [],
    inProgress: [],
    completed: []
  });

  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1000/api/v1/userDetails", 
        {withCredentials: true}
      );

      const taskArray = res.data.tasks;
      setTasks({
        yettobedone: taskArray.find(t => t.yettobedone)?.yettobedone || [],
        inProgress: taskArray.find(t => t.inProgress)?.inProgress || [],
        completed: taskArray.find(t => t.completed)?.completed || []
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleTaskClick = (taskId) => {
    setEditTaskId(taskId);
    setShowEditTask(true);
  };

  return (
   <div className="relative w-full min-h-screen bg-black overflow-hidden">

    
       
<div className="bg-[url('/bg3.png')] bg-cover bg-center">


{chatbotdiv && (<div className="fixed inset-0 bg-[#000000bd] bg-opacity-80 flex items-center justify-center z-50"><div className='block absolute right-0 z-20 bg-gradient-to-br from-gray-900 via-gray-500 to-white min-h-screen w-[30%] '><Chatbox 
setchatbotdiv={setchatbotdiv}/> </div></div>)}


 
<ChatButton setchatbotdiv={setchatbotdiv}/>

<Header setShowAddTask={setShowAddTask} />


     
      {showAddTask && (
        <div className="fixed inset-0 bg-[#000000bd] bg-opacity-80 flex items-center justify-center z-50">
          <AddTask 
            setShowAddTask={setShowAddTask} 
            onTaskAdded={fetchDetails}
          />
        </div>
      )}

      
      {showEditTask && editTaskId && (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50">
          <EditTask
            editTaskId={editTaskId}
            setShowEditTask={setShowEditTask}
            onTaskAdded={fetchDetails}
          />
        </div>
      )}

      <div className="relative z-10 px-10 py-4 flex gap-3 min-h-[89vh]">
        <div className='w-1/3 '>
          <Title title="In Progress🧪" />
          <div className='pt-2'>
            <Inprogress task={tasks.inProgress}
            onTaskClick={handleTaskClick} />
          </div>
        </div>
        
        <div className='w-1/3'>
          <Title title="Yet to be done 🔮" />
          <div className='pt-2'>
            <Yettostart 
              task={tasks.yettobedone} 
              onTaskClick={handleTaskClick}
            />
          </div>
        </div>
        
        <div className='w-1/3'>
          <Title title="Completed ✨" />
          <div className='pt-2'>
            <Completed task={tasks.completed} 
            onTaskClick={handleTaskClick}/>
          </div>
        </div>
      </div>
      
    </div>
  
</div>
  );
}

export default Dashboard;