import {graduations} from '../graduation_project/graduations'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

export default function NavBar({setToken, isDark, setIsDark}) {
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            // Call the admin logout API
            const token = localStorage.getItem('token')
            if (token) {
                await axios.get(`${backendUrl}/api/v1/auth/admin/logout`, {
                    headers: {
                        token: token
                    }
                });
            }

            // Clear local data
            localStorage.removeItem('token');
            setToken('');
            toast.success('Logged out successfully');

        } catch (error) {
            console.error('Error logging out:', error);
            // Even if API call fails, clear local data
            localStorage.removeItem('token');
            setToken('');
            toast.success('Logged out successfully');
        }
    }
    
    return (
        <div className='flex items-center py-2 px-[4%] justify-between bg-[--color1] dark:bg-slate-800'>
            <img 
                className='w-[max(10%,80px)] cursor-pointer' 
                onClick={()=>navigate('/')} 
                src={graduations.logo2} 
                alt="" 
            />
            <div className='flex items-center gap-5'>
                {/* Dark Mode Toggle */}
                <label className="switch">
                    <input
                        checked={isDark}
                        type="checkbox"
                        onChange={() => setIsDark(!isDark)}
                    />
                    <span className="slider">
                        <div className="star star_1" />
                        <div className="star star_2" />
                        <div className="star star_3" />
                        <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                            <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff" d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925" />
                        </svg>
                    </span>
                </label>
                <button
                    onClick={handleLogout}
                    className='bg-[#1B5CBECC] text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm hover:bg-[#1B5CBECC]/90 transition'
                >
                    Logout
                </button>
            </div>
        </div>
    )
}