import React from 'react'
import Taskcard from './Taskcard'


const Completed = ({task,onTaskClick }) => {
  return (
    <div className='flex flex-col gap-6'>
            {task.map((item) => (
  <Taskcard 
    key={item._id}             // Add this line
    data={item} 
    onClick={() => onTaskClick(item._id)} 
  />
))}
    </div>
  )
}

export default Completed;