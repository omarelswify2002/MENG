import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/admin_assets/assets'
import { useState } from 'react'

export default function SideBar() {
    const [activeLink , setActiveLink] = useState('')
    return (
        <div className='w-[18%] min-h-screen border-r-2 bg-gradient-to-r from-[--gradientTitleColor1] to-[--gradientTitleColor2]'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
                    <NavLink onClick={()=>setActiveLink('add')} className={`flex items-center gap-3 border border-gray-300 ${activeLink === 'add' ? 'text-black' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} to={'/add'}>
                        <img className='w-5 h-5' src={assets.add_icon} alt="" />
                        <p className='hidden md:block'>Add Items</p>
                    </NavLink>
                    
                    <NavLink onClick={()=>setActiveLink('list')} className={`flex items-center gap-3 border border-gray-300 ${activeLink === 'list' ? 'text-black' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} to={'/list'}>
                        <img className='w-5 h-5' src={assets.order_icon} alt="" />
                        <p className='hidden md:block'>List Items</p>
                    </NavLink>
                    
                    <NavLink onClick={()=>setActiveLink('orders')} className={`flex items-center gap-3 border border-gray-300 ${activeLink === 'orders' ? 'text-black' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} to={'/orders'}>
                        <img className='w-5 h-5' src={assets.order_icon} alt="" />
                        <p className='hidden md:block'>Orders</p>
                    </NavLink>
            </div>
        </div>
    )
}
