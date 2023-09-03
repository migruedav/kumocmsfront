import React from 'react'
import {IoIosAddCircle} from 'react-icons/io'
import {BsUiChecks} from 'react-icons/bs'
import {FaRankingStar} from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate()
  return (
    <div className='fixed bottom-0 w-full h-24 bg-black/60 flex justify-around z-50 items-center pb-4'>
        <div className='h-14 w-14 bg-black rounded-full border-2 border-white flex justify-center items-center' onClick={()=>navigate("/agregar-alumno")}><IoIosAddCircle color='white' size={30}/></div>
        <div className='h-14 w-14 bg-black rounded-full border-2 border-white flex justify-center items-center' onClick={()=>navigate("/ranking")}><FaRankingStar color='white' size={25}/></div>
        <div className='h-14 w-14 bg-black rounded-full border-2 border-white flex justify-center items-center' onClick={()=>navigate("/")}><BsUiChecks color='white' size={25}/></div>
    </div>
  )
}

export default NavBar