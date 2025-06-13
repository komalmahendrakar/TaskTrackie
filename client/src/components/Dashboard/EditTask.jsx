import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SplashCursor from './SplashCursor';

const EditTask = ({ editTaskId, setShowEditTask ,onTaskAdded }) => {
  const [Values, setValues] = useState({
    title: '',
    priority: 'low',
    status: 'yettobedone',
    description: '',
    id: editTaskId || ''
  });

  // Fetch task details when component mounts
 useEffect(() => {
  if (!editTaskId || editTaskId === 'undefined') {
    console.warn("No valid editTaskId; skipping fetch.");
    return;
  }
    const fetchTask = async () => {
      console.log("found:",editTaskId );
      try {
        console.log("found:",editTaskId );
        const res = await axios.get(`http://localhost:1000/api/v1/tasks/getTask/${editTaskId}`, {
          withCredentials: true,
        });
        console.log("Fetched task:", res.data);

        setValues({
  title: res.data.taskdetails.title ?? '',
  priority: res.data.taskdetails.priority ?? 'low',
  status: res.data.taskdetails.status ?? 'yettobedone',
  description: res.data.taskdetails.description ?? '',
  id: editTaskId
});

      } catch (error) {
        alert("Failed to fetch task data");
        console.error(error);
      }
    };

    if (editTaskId) {
      fetchTask();
    }
  }, [editTaskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const editTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/api/v1/tasks/editTask/${editTaskId}`, Values, {
        withCredentials: true,
      });
      alert("Task updated successfully!");
      cleanup();
    } catch (error) {
      const message = error.response?.data?.error || "Something went wrong";
      alert(message);
    }
  };

  const deleteTask = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:1000/api/v1/tasks/deleteTask/${editTaskId}`, {
        withCredentials: true,
      });
      alert("Task deleted successfully!");
      cleanup();
    } catch (error) {
      const message = error.response?.data?.error || "Failed to delete task";
      alert(message);
    }
  };

  const cleanup = () => {
  window.sessionStorage.removeItem("editTaskId");
  setShowEditTask(false); // 
  if (typeof onTaskAdded === 'function') {
    onTaskAdded();
  }
};


  return (
    

    <div className='bg-[#F3F3E0] rounded p-4 w-[40%]'>
      <SplashCursor />
      <h1 className='text-center font-bold text-xl'>Edit Task</h1>
      <hr className='mb-4 mt-2' />
      <form method='POST' className="flex flex-col gap-4">
        <input
          type='text'
          name='title'
          value={Values.title}
          onChange={handleChange}
          className='border px-2 py-1 rounded border-zinc-500 outline-none text-black'
          placeholder='Title'
        />

        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <h3 className='mb-2'>Select Priority</h3>
            <select
              name='priority'
              value={Values.priority}
              onChange={handleChange}
              className='border px-2 py-1 rounded border-zinc-500'
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className='flex items-center gap-4'>
            <h3 className='mb-2'>Select Status</h3>
            <select
              name='status'
              value={Values.status}
              onChange={handleChange}
              className='border px-2 py-1 rounded border-zinc-500'
            >
              <option value="yettobedone">Yet to be Done</option>
              <option value="inProgress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          name='description'
          value={Values.description}
          onChange={handleChange}
          placeholder='Description'
          className='border px-2 py-1 rounded border-zinc-500'
        ></textarea>

        <div className='flex items-center justify-between gap-4'>
          <button
            className='px-2 w-full py-2 bg-[#27548A] hover:bg-[#DDA853] transition-all duration-300 rounded-xl'
            onClick={editTask}
          >
            Edit Task
          </button>
          <button
            className='px-2 py-2 w-full rounded-xl bg-[#27548A] hover:bg-red-500 transition-all duration-300'
           onClick={(e) => {
  e.preventDefault(); // if you want to prevent form submission
  deleteTask(e);

}}

          >
            Delete Task
          </button>
          <button
            className='px-2 py-2 w-full rounded-xl bg-[#27548A] hover:bg-zinc-500 transition-all duration-300'
           onClick={() => setShowEditTask(false)}

             
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
