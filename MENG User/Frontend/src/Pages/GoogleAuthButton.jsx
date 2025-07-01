// import { GoogleLogin } from '@react-oauth/google';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ShopContext } from '../context/ShopContextProvider';
// import { useContext } from 'react';

// export default function GoogleAuthButton() {
//     const navigate = useNavigate();
//     const { backendUrl, setToken } = useContext(ShopContext);

//     const handleSuccess = async (credentialResponse) => {
//         try {
//             console.log('Google credential received:', credentialResponse);
            
//             const response = await axios.post(
//                 `${backendUrl}/api/v1/auth/google/callback`, 
//                 { 
//                     code: credentialResponse.credential,
//                     redirect_uri: window.location.origin 
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 }
//             );
            
//             console.log('Google auth response:', response.data);
            
//             if (response.data.token) {
//                 setToken(response.data.token);
//                 localStorage.setItem('token', response.data.token);
//                 navigate('/');
//                 toast.success('تم تسجيل الدخول بنجاح');
//             } else {
//                 toast.error(response.data.message || 'فشل في الحصول على token من الخادم');
//             }
//         } catch (error) {
//             console.error('Google Auth Error:', error);
//             toast.error(error.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
//         }
//     };

//     return (
//         <GoogleLogin
//             onSuccess={handleSuccess}
//             onError={() => {
//                 console.log('Google login failed');
//                 toast.error('فشل تسجيل الدخول بجوجل');
//             }}
//             useOneTap
//             locale="ar"
//             text="signin_with"
//             shape="rectangular"
//             size="large"
//         />
//     );
// }