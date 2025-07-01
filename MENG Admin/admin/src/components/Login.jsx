import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // 1. تسجيل الدخول
            const response = await axios.post(`${backendUrl}/api/v1/auth/login`, { 
                email, 
                password 
            });
            
            console.log('Login response:', response.data);
            
            if (response) {
                // 2. التحقق من دور المستخدم
                const userRole = response.data.data?.role;
                
                if (userRole === "admin") {
                    // 3. إذا كان أدمن: حفظ التوكن وتوجيهه للوحة التحكم
                    setToken(response.data.token);
                    localStorage.setItem('token', response.data.token);
                    toast.success('Login successful! Redirecting to admin panel...');
                    navigate('/admin/dashboard'); // أو أي صفحة أخرى للادمن
                } else {
                    // 4. إذا لم يكن أدمن: عرض رسالة خطأ
                    toast.error('You do not have admin privileges');
                    // يمكنك هنا مسح أي بيانات دخول إذا أردت
                    setEmail('');
                    setPassword('');
                }
            } else {
                toast.error(response.data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error(error.response?.data?.message || error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='flex items-center min-h-screen justify-center w-full bg-[--color2]'>
            <div className='bg-gradient-to-r from-[--gradientTitleColor1] to-[--gradientTitleColor2] shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address:</p>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className='w-full rounded-md px-3 py-2 border border-gray-300 outline-none' 
                            type="email" 
                            required 
                            placeholder='Your@email.com'
                        />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password:</p>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className='w-full rounded-md px-3 py-2 border border-gray-300 outline-none' 
                            type="password" 
                            required 
                            placeholder='Enter Your Password'
                        />
                    </div>
                    <button 
                        className={`mt-2 py-2 px-4 w-full rounded-md text-white bg-black ${isLoading ? 'opacity-70' : ''}`} 
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}