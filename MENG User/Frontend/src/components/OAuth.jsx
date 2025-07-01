import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { toast } from "react-toastify";
import axios from "axios";

export default function OAuth() {
    const { navigate, backendUrl } = useContext(ShopContext);
    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            
            const userData = {
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL,
                uid: result.user.uid
            };

            const response = await axios.post(`${backendUrl}/api/user/google`, userData);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                dispatch(loginSuccess(response.data));
                toast.success("تم تسجيل الدخول بنجاح");
                navigate('/');
            } else {
                throw new Error("Failed to get token from server");
            }
            
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            toast.error(error.response?.data?.message || 'فشل تسجيل الدخول عبر Google');
        }
    };

    return (
        <button 
            onClick={handleGoogleClick} 
            type="button" 
            className="flex gap-2 items-center justify-center w-full py-2 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
            <FcGoogle size={20} />
            Continue with Google
        </button>
    )
}