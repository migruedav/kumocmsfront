import React from 'react'

function GroupsChips({ active, setActive }) {
  return (
    <div className='flex flex-row gap-1 justify-center items-center'>
        <p className={`w-20 h-6 rounded-md ${active === "k5" ? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive("k5")}>k5</p>
        <p className={`w-20 h-6 rounded-md ${active === "ch5" ? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive("ch5")}>ch5</p>
        <p className={`w-20 h-6 rounded-md ${active === "k6" ? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive("k6")}>k6</p>
        <p className={`w-20 h-6 rounded-md ${active === "k7" ? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive("k7")}>k7</p>
    </div>
  )
}

export default GroupsChips