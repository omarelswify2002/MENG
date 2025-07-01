// import { useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// export default function AuthSuccess() {
//     const [searchParams] = useSearchParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = searchParams.get('token');
//         const user = searchParams.get('user');
        
//         if (token && user) {
//         localStorage.setItem('token', token);
//         localStorage.setItem('user', user);
//         toast.success('تم تسجيل الدخول بنجاح');
//         navigate('/');
//         } else {
//         toast.error('فشل تسجيل الدخول');
//         navigate('/login');
//         }
//     }, [searchParams, navigate]);

//     return (
//         <div className="flex justify-center items-center h-screen">
//         <div className="text-center">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p className="text-lg">جاري إتمام عملية تسجيل الدخول...</p>
//         </div>
//         </div>
//     );
// }