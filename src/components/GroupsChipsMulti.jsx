import React from 'react'

function GroupsChipsMulti({ active5, setActive5, active6, setActive6, active7, setActive7 }) {
  return (
    <div className='flex flex-row gap-1 justify-center items-center'>
        <p className={`w-20 h-6 rounded-md ${active5? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive5(!active5)}>5 pm</p>
        <p className={`w-20 h-6 rounded-md ${active6? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive6(!active6)}>6 pm</p>
        <p className={`w-20 h-6 rounded-md ${active7? "bg-RojoKumo text-white" : "bg-GrisKumo text-black"}  text-center cursor-pointer`} onClick={() => setActive7(!active7)}>7 pm</p>
    </div>
  )
}

export default GroupsChipsMulti