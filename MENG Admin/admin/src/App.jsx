// import React, { useEffect, useState } from 'react'
// import NavBar from './components/NavBar'
// import SideBar from './components/SideBar'
// import { Routes , Route } from 'react-router-dom'
// import Add from './pages/Add'
// import List from './pages/List'
// import Orders from './pages/Orders'
// import Login from './components/Login'
// import { ToastContainer } from 'react-toastify';
// import CouponsForAdmin from './pages/CouponsForAdmin'
// import UsersForAdmin from './pages/UsersForAdmin'
// import AnalyticsForAdmin from './pages/AnalyticsForAdmin'
// import LowStockForAdmin from './pages/LowStockForAdmin'
// import AdminWelcome from './components/AdminWelcome'

// // eslint-disable-next-line react-refresh/only-export-components
// export const backendUrl = import.meta.env.VITE_BACKEND_URL
// export const currency = 'EGP'
// export default function App() {
//   const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')

//   useEffect(()=>{
//     localStorage.setItem('token',token)
//   },[token])
  
//   return (
//     // <div className="m-0 p-0 bg-[--color2] dark:bg-slate-900 dark:text-slate-100 transition-all duration-300">

//     <div className="m-0 p-0 bg-[--color2] dark:bg-slate-900 dark:text-slate-100 transition-all duration-300">
//       <ToastContainer/>
//       {token === ''
//       ? <Login setToken={setToken}/>
//       : <>
//           <NavBar setToken={setToken}/>
//           <hr />
//           <div className='flex w-full'>
//             <SideBar/>
//             <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base'>
//               <Routes>
//                 <Route path="/" element={<AdminWelcome />} />
//                 <Route path='/add' element={<Add token={token}/>}/>
//                 <Route path='/list' element={<List token={token}/>}/>
//                 <Route path='/orders' element={<Orders token={token}/>}/>
//                 {/* Fix these routes to have their own paths */}
//                 <Route path='/coupons' element={<CouponsForAdmin token={token}/>}/>
//                 <Route path='/users' element={<UsersForAdmin token={token}/>}/>
//                 <Route path='/analytics' element={<AnalyticsForAdmin token={token}/>}/>
//                 <Route path='/low-stock' element={<LowStockForAdmin token={token}/>}/>
//               </Routes>
//             </div>
//           </div>
//         </>
//       }
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CouponsForAdmin from './pages/CouponsForAdmin'
import UsersForAdmin from './pages/UsersForAdmin'
import AnalyticsForAdmin from './pages/AnalyticsForAdmin'
import LowStockForAdmin from './pages/LowStockForAdmin'
import AdminWelcome from './components/AdminWelcome'
import EditProductForAdmin from './pages/EditProductForAdmin'

// eslint-disable-next-line react-refresh/only-export-components
export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency = 'EGP'

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [isDark, setIsDark] = useState(
    localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''}`}>
      <ToastContainer/>
      {token === '' ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <NavBar setToken={setToken} isDark={isDark} setIsDark={setIsDark} />
          <hr className="border-gray-200 dark:border-gray-700" />
          <div className="flex w-full dark:bg-slate-900">
            <SideBar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 dark:text-gray-300 text-base">
              <Routes>
                <Route path="/" element={<AdminWelcome />} />
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/coupons" element={<CouponsForAdmin token={token} />} />
                <Route path="/users" element={<UsersForAdmin token={token} />} />
                <Route path="/analytics" element={<AnalyticsForAdmin token={token} />} />
                <Route path="/low-stock" element={<LowStockForAdmin token={token} />} />
                <Route path="/edit/:id" element={<EditProductForAdmin token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}