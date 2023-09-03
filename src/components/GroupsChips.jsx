import React from 'react'

function GroupsChips({ active, setActive }) {
  return (
    <div className='flex flex-row gap-1 justify-center items-center'>
        <p className={`w-20 h-6 rounded-md ${active === 5 ? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive(5)}>5 pm</p>
        <p className={`w-20 h-6 rounded-md ${active === 6 ? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive(6)}>6 pm</p>
        <p className={`w-20 h-6 rounded-md ${active === 7 ? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive(7)}>7 pm</p>
    </div>
  )
}

export default GroupsChips