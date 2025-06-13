import React from 'react'
import Taskcard from './Taskcard'


const Inprogress = ({task,onTaskClick}) => {
  return (
    <div className='flex flex-col gap-4'>
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

export default Inprogress;