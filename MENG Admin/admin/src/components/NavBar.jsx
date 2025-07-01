import React from 'react'
import {graduations} from '../graduation_project/graduations'

export default function NavBar({setToken}) {
    return (
        <div className='flex items-center py-2 px-[4%] justify-between bg-[--color1]'>
            <img className='w-[max(10%,80px)]' src={graduations.logo2} alt="" />
            <button onClick={()=>setToken('')} className='bg-[#1B5CBECC] text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>Logout</button>
        </div>
    )
}
