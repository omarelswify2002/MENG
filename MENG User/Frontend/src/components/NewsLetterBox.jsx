// import { useState , useContext } from "react"
// import axios from "axios"
// import { toast } from "react-toastify"
// import { ShopContext } from "../context/ShopContextProvider"

// export default function NewsLetterBox() {
//     // eslint-disable-next-line no-unused-vars
//     const [currentState , setCurrentState] = useState('Login')
//     // eslint-disable-next-line no-unused-vars
//     const [name , setName] = useState('')
//     // eslint-disable-next-line no-unused-vars
//     const [password , setPassword] = useState('')
//     const [email , setEmail] = useState('')
    
//     const { backendUrl , setToken , token } = useContext(ShopContext)


//     async function onSubmitHandler(event){
//         event.preventDefault();
//         try {
//             if(currentState === 'Sign Up'){

//                 const response = await axios.post(backendUrl + '/api/user/register' , {name,email,password})
//                 if(response.data.success){
//                     setToken(response.data.token)
//                     localStorage.setItem('token',response.data.token)
//                 } else {
//                     toast.error(response.data.message)
//                 }
                
//             } else {
//                 const response = await axios.post(backendUrl + '/api/user/login' , {email,password})
//                 console.log(response.data);
                
//                 if(response.data.success){
//                     setToken(response.data.token)
//                     localStorage.setItem('token',response.data.token)
//                 } else {
//                     toast.error(response.data.message)
//                 }
//             }
//         } catch (error) {
//             console.log(error);
            
//             toast.error(error.message)
//         }
//     }

//     return !token && (
//         <div className="flex items-center justify-center flex-col gap-2 bg-[#1D2935] py-10">
//             <p className="text-2xl font-medium text-[--textColor1]">Don&apos;t Miss Our News</p>
//             <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center border border-[#0D99FF] rounded-md">
//                 <input className="w-full h-full sm:flex-1 outline-none py-2 pl-3 rounded-l-md" onChange={(e)=>setEmail(e.target.value)} value={email} required type="email" placeholder="Email Address"/>
//                 <button type="submit" className="bg-[#74AFF2] transition-all duration-200 text-[--textColor2] rounded-r-md border border-[#0D99FF] text-sm font-bold px-8 py-3 hover:bg-gray-700 hover:border-[--textColor1] hover:text-[--textColor1]">Subscribe</button>
//             </form>
//         </div>
//     )
// }
