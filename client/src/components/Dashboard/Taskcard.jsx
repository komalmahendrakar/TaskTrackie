import React from 'react'


const Taskcard = ({data, onClick}) => {

  return (
  <>
<button className="
  bg-white/70 backdrop-blur-md 
  rounded-[16px] shadow-md shadow-[#FEFFDE]
  px-4 py-[20px] mb-[30px] 
  w-[90%] mx-10 
   hover:shadow-2xl hover:scale-105 hover:shadow-[#FEFFDE]
  transition-all duration-300
"
      onClick={onClick}>
    <div className='flex text-center justify-between mx-4 gap-4 p-2' >
        <h1 className='text-black text-[30px] font-cinzel font-semibold break-words max-w-[70%] text-left'>{data.title}</h1>
        <div className={`text-sm font-bold  ${ data.priority==="low"? "text-green-700 bg-green-300" : data.priority==="medium"? "text-yellow-700 bg-yellow-300" :"text-red-700 bg-red-300"} px-10 py-2 rounded-2xl max-w-20 max-h-10`}>
            <p>{data.priority}</p>
            </div>
            
            </div>
            <hr className='my-2'/>
            <p className='text-sm p-2   text-black text-start'>{data.description}</p>
           
    </button>
    
    </>
  )
}

export default Taskcard;