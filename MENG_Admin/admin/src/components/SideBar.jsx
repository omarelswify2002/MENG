import React from 'react'
import {NavLink} from 'react-router-dom'
import { useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoIosList } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { RiCouponLine } from "react-icons/ri";
import { LuUsersRound } from "react-icons/lu";
import { SiSimpleanalytics } from "react-icons/si";
import { MdBatteryCharging20 } from "react-icons/md";

export default function SideBar() {
    const [activeLink, setActiveLink] = useState('')
    return (
        <div className='w-[18%] min-h-screen border-r-2 bg-[--color1] dark:bg-slate-800'>
            <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px] text-white'>
                <NavLink 
                    onClick={()=>setActiveLink('add')} 
                    className={`flex items-center gap-3 border bg-[#1B5CBECC] dark:bg-slate-700 rounded-l-xl ${activeLink === 'add' ? 'text-white' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} 
                    to={'/add'}
                >
                    <IoIosAddCircleOutline className='w-5 h-5' />
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>
                
                <NavLink 
                    onClick={()=>setActiveLink('list')} 
                    className={`flex items-center gap-3 border bg-[#1B5CBECC] dark:bg-slate-700 rounded-l-xl ${activeLink === 'list' ? 'text-white' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} 
                    to={'/list'}
                >
                    <IoIosList className='w-5 h-5' />
                    <p className='hidden md:block'>List Items</p>
                </NavLink>
                
                <NavLink 
                    onClick={()=>setActiveLink('orders')} 
                    className={`flex items-center gap-3 border bg-[#1B5CBECC] dark:bg-slate-700 rounded-l-xl ${activeLink === 'orders' ? 'text-white' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} 
                    to={'/orders'}
                >
                    <IoCartOutline className='w-5 h-5' />
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
                
                <NavLink 
                    onClick={()=>setActiveLink('coupons')} 
                    className={`flex items-center gap-3 border bg-[#1B5CBECC] dark:bg-slate-700 rounded-l-xl ${activeLink === 'coupons' ? 'text-white' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} 
                    to={'/coupons'}
                >
                    <RiCouponLine className='w-5 h-5' />
                    <p className='hidden md:block'>Coupons</p>
                </NavLink>
                
                <NavLink 
                    onClick={()=>setActiveLink('users')} 
                    className={`flex items-center gap-3 border bg-[#1B5CBECC] dark:bg-slate-700 rounded-l-xl ${activeLink === 'users' ? 'text-white' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} 
                    to={'/users'}
                >
                    <LuUsersRound className='w-5 h-5' />
                    <p className='hidden md:block'>Users</p>
                </NavLink>
                
                <NavLink 
                    onClick={()=>setActiveLink('analytics')} 
                    className={`flex items-center gap-3 border bg-[#1B5CBECC] dark:bg-slate-700 rounded-l-xl ${activeLink === 'analytics' ? 'text-white' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} 
                    to={'/analytics'}
                >
                    <SiSimpleanalytics className='w-5 h-5' />
                    <p className='hidden md:block'>Analytics</p>
                </NavLink>
                
                <NavLink 
                    onClick={()=>setActiveLink('low-stock')} 
                    className={`flex items-center gap-3 border bg-[#1B5CBECC] dark:bg-slate-700 rounded-l-xl ${activeLink === 'low-stock' ? 'text-white' : 'text-white'} border-r-0 px-3 py-2 rounded-1`} 
                    to={'/low-stock'}
                >
                    <MdBatteryCharging20 className='w-5 h-5' />
                    <p className='hidden md:block'>Low Stock</p>
                </NavLink>
            </div>
        </div>
    )
}