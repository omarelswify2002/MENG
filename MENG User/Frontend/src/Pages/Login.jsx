import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { graduations } from "../graduation_project/graduations";

export default function Login() {
    const [currentState , setCurrentState] = useState('Login')
    const { navigate , backendUrl , setToken , token } = useContext(ShopContext)
    const [name , setName] = useState('')
    const [password , setPassword] = useState('')
    const [email , setEmail] = useState('')
    const [showPassword , setShowPassword] = useState(false)
    const [isEmailFocused, setIsEmailFocused] = useState(false);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    async function onSubmitHandler(event){
        event.preventDefault();
        try {
            if(currentState === 'Sign Up'){
                const response = await axios.post(backendUrl + '/api/v1/auth/signup', {
                    name,
                    email,
                    password
                })
                console.log('register signup>>>>',response);
                if(response){
                    // Update to match new response format
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                } else {
                    console.log('error response>>>>',response);
                    
                    toast.error(response.data.message)
                }
                
            } else {
                const response = await axios.post(backendUrl + '/api/v1/auth/login', {
                    email,
                    password
                })
                
                console.log('register login>>>>',response.data);
                
                if(response){
                    // Update to match new response format
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                } else {
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if (token) {
            navigate('/')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])

    useEffect(() => {
        setName('');
        setEmail('');
        setPassword('');
    }, [currentState]);
    return (
        // px-4 pb-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pb-4 md:pb-4 lg:pb-4
        <div className={currentState === 'Sign Up'? "grid sm:grid-cols-2 p-5 sm:p-0 h-screen" : "grid sm:grid-cols-2 p-5 sm:p-0 h-screen"}>
            <form onSubmit={onSubmitHandler}  autoComplete="off" className="flex flex-col w-[100%] items-center justify-center sm:max-w-96 m-auto my-14 gap-6 text-gray-800 dark:text-[--textColor1]">
                <img className="w-[50%] translate-x-[10%] cursor-pointer" onClick={()=>navigate('/')} src={graduations.logo2} alt="" />
                <div className="flex flex-col items-center gap-2">
                    <p className="text-3xl font-bold">{currentState}</p>
                    {currentState === 'Login' && <p>Enter your email and password to login.</p>}
                </div>

                {currentState === 'Login' ?'': currentState === 'Forget Your Password' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full px-3 py-2 border border-gray-800 rounded-md" placeholder="Name" />}
                <input 
                    onChange={(e)=>setEmail(e.target.value)} 
                    value={email} 
                    type="email" 
                    // required    
                    autoComplete="new-email" 
                    className="w-full px-3 py-2 border border-gray-800 rounded-md" 
                    placeholder="Email" />
                {currentState === 'Forget Your Password'?''
                :<div className="relative w-full">
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        type={showPassword ? 'text' : 'password'} 
                        // required
                        readOnly={!isEmailFocused}
                        onFocus={() => setIsEmailFocused(true)} 
                        autoComplete="off" 
                        className="w-full px-3 py-2 border border-gray-800 rounded-md" 
                        placeholder="Password" />
                    <button
                        type="button"
                        className="absolute top-3 right-3"
                        onClick={togglePasswordVisibility}
                        >
                        {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                    </button>
                </div>
                }
                <div className="w-full flex justify-end text-sm mt-[-8px]">
                    {currentState === 'Login' && <p onClick={()=>navigate('/ResetPassword')} className="cursor-pointer">Forget Your Password?</p>}
                </div>
                <button className="w-full transition-all duration-500 border border-[--color1] text-[--color1] hover:border-[--color1] hover:bg-[--color1] hover:text-white dark:hover:bg-[--textColor1] dark:hover:text-[--color1] dark:text-[--textColor1] dark:border-[--textColor1] dark:font-bold px-8 py-2 active:bg-gray-700 rounded-md">{currentState === 'Login' ? 'Login' : 'Sign Up'}</button>
            </form>
            {currentState === 'Login' ?
            <div className="relative hidden sm:block">
                <img className="absolute w-full h-full" src={graduations.helmet_login2} alt="" />
                <div className="absolute left-28 top-16 gap-1 w-[70%]">
                    <h1 className="font-medium text-2xl text-outline-black-sm-3 dark:text-[--textColor2]">Don&apos;t have an account?</h1>
                    <h1 className="font-bold text-3xl text-outline-black-sm">Create your account now and enjoy many features.</h1>
                    <h1 className="font-medium text-2xl text-outline-black-sm-3 dark:text-[--textColor2]">Create orders faster.</h1>
                    <h1 className="font-medium text-2xl text-outline-black-sm-3 dark:text-[--textColor2]">Track your order easily.</h1>
                    <h1 className="font-medium text-2xl text-outline-black-sm-3 dark:text-[--textColor2]">Add different shipping addresses.</h1>
                </div>
                <button onClick={()=>setCurrentState('Sign Up')} className="absolute left-[50%] top-[60%] translate-x-[-50%] border border-white hover:border-black px-8 py-4 font-medium text-2xl text-white hover:bg-white hover:text-black rounded-lg transition-all duration-500">Create An Account</button>
            </div>
            : currentState === 'Sign Up' ?
            <div className="relative hidden sm:block">
                <img className="absolute w-full h-full" src={graduations.helmet_login2} alt="" />
                <div className="absolute left-28 top-48 gap-1 w-[70%]">
                    <h1 className="font-medium text-2xl text-outline-black-sm-3">You have an account.</h1>
                    <h1 className="font-bold text-3xl text-outline-black-sm">Login to your account.</h1>
                </div>
                <button onClick={()=>setCurrentState('Login')} className="absolute left-[50%] top-[60%] translate-x-[-50%] border border-white hover:border-black px-24 py-4 font-medium text-2xl text-white hover:bg-white hover:text-black rounded-lg transition-all duration-500">Login</button>
            </div>
            : ''
            }
        </div>
    )
}
