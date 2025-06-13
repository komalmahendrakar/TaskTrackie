import React, { useState } from 'react';
import axios from 'axios';
const AddTask = ({ setShowAddTask, onTaskAdded }) => { 
  const [Values, setValues] = useState({
    title: "",
    description: "",
    priority: "low",
    status: "yettobedone",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {

      await axios.post("http://localhost:1000/api/v1/tasks/addTask", Values, {
        withCredentials: true,
      });

      alert("Task added successfully!");

      if (typeof onTaskAdded === 'function') {
        onTaskAdded(); 
      }

      setShowAddTask(false);
    } catch (error) {
      const message = error.response?.data?.error || "Something went wrong";
      alert(message);
    }
  };

  return (
    <div className='bg-[#FFA500] rounded-2xl p-4 w-[40%]'>
      <h1 className='text-center font-bold font-cinzel text-xl'>Add task</h1>
      <hr className='mb-4 mt-2' />
      <form method='POST' className="flex flex-col gap-4">
        <input
          type='text'
          className=' px-2 py-1 rounded border-zinc-500 outline-none text-black'
          placeholder='Title'
          name='title'
          value={Values.title}
          onChange={change}
        />

        <div className='flex items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <h3 className='mb-2'>Select Priority</h3>
            <select
              name='priority'
              className='border px-2 py-1 rounded border-zinc-500'
              onChange={change}
              value={Values.priority}
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
              className='border px-2 py-1 rounded border-zinc-500'
              onChange={change}
              value={Values.status}
            >
              <option value="yettobedone">Yet to be Done</option>
              <option value="inProgress">In progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <textarea
          className='border px-2 py-1 rounded border-zinc-500'
          name='description'
          placeholder='Description'
          value={Values.description}
          onChange={change}
        ></textarea>

        <div className='flex items-center justify-between gap-4'>
          <button
            className='px-2 w-full py-2 bg-[#27548A] hover:bg-[#DDA853] transition-all duration-300 rounded-xl'
            onClick={addTask}
          >
            Add
          </button>
          <button
            className='px-2 py-2 w-full rounded-xl bg-[#27548A] hover:bg-zinc-500 transition-all duration-300'
            onClick={() => setShowAddTask(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
