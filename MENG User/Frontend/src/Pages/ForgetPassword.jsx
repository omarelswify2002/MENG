// import { useContext, useState , useEffect} from "react";
// import { ShopContext } from "../context/ShopContextProvider";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { graduations } from "../graduation_project/graduations";

// const ForgotPassword = () => {
//     const {backendUrl , token , setToken , navigate } = useContext(ShopContext)
//     const [email, setEmail] = useState("");
//     const [otpSent, setOtpSent] = useState(false);

//     const handleSendOTP = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post(backendUrl + "/api/v1/auth/forgotPassword", { email });
//             console.log('forget password>>>>',response.data)
//                 if(response){
//                     setToken(response.data.token)
//                     setOtpSent(true);
//                     localStorage.setItem('token',response.data.token)
//                     navigate('/ResetPassword')
//                 } else {
//                     toast.error(response.data.message)
//                 }
//         } catch (error) {
//                 console.log(error);
//                 toast.error(error.message)
//         }
//     };


//     useEffect(()=>{
//         if (token) {
//             navigate('/ResetPassword')
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[token])

//     return (
//         <div className="grid grid-cols-2 h-screen">
//             <div className="prata-regular px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] w-full flex flex-col gap-6">
//                 <div className="w-full flex justify-center items-center mb-24 mt-4">
//                     <img src={graduations.logo2} className="w-[35%] translate-x-[5%] sm:translate-x-[10%]" alt="" />
//                 </div>
//                 <div className="inline-flex items-center gap-2">
//                     <p className="text-3xl prata-regular">Forget Password ?</p>
//                     <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//                 </div>
//                 <p>Please enter your email address below to receive a password reset link.</p>
//                 <form className="flex flex-col gap-6" onSubmit={handleSendOTP}>
//                     <input
//                         type="email"
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="w-full px-3 py-2 border border-gray-80 dark:text-[--textColor2] rounded-md"
//                         required
//                     />
//                     <button type="submit" className="w-full transition-all duration-500 border border-[--color1] text-[--color1] hover:border-[--color1] hover:bg-[--color1] hover:text-white dark:hover:bg-[--textColor1] dark:hover:text-[--color1] dark:text-[--textColor1] dark:border-[--textColor1] dark:font-bold px-8 py-2 active:bg-gray-700 rounded-md">
//                         Send Code
//                     </button>
//                 </form>
//                 {/* {message && <p className="mt-3 text-green-600">{message}</p>} */}
//                 {otpSent && <p className="mt-3 text-blue-600">Check your email for the OTP.</p>} 
//             </div>
//             <div className="relative">
//                 <img className="absolute w-full h-full border-l-white border rounded-l-2xl" src={graduations.Medical_gloves2} alt="" />
//                 <div className="absolute left-28 top-16 gap-1 w-[70%]">
//                     <h1 className="font-medium text-2xl">Don&apos;t have an account?</h1>
//                     <h1 className="font-bold text-3xl text-outline-black-sm-2">Create your account now and enjoy many features.</h1>
//                     <h1 className="font-medium text-2xl">Create orders faster.</h1>
//                     <h1 className="font-medium text-2xl">Track your order easily.</h1>
//                     <h1 className="font-medium text-2xl">Add different shipping addresses.</h1>
//                 </div>
//                 <button onClick={()=>navigate('/Login')} className="absolute left-[50%] top-[60%] translate-x-[-50%] border border-white hover:border-black px-8 py-4 font-medium text-2xl text-white hover:bg-white hover:text-black rounded-lg transition-all duration-500">Create An Account</button>
//             </div>
//         </div>
//     );
// };

// export default ForgotPassword;
