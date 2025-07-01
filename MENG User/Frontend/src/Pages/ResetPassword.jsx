import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { graduations } from "../graduation_project/graduations";
import axios from "axios";

const ResetPassword = () => {
    const { backendUrl, navigate } = useContext(ShopContext);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const handleSendResetCode = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/forgotPassword`, {
                email
            });
            if (response) {
                toast.success("Reset code sent to your email");
                setStep(2);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send reset code");
        }
    };

    const handleVerifyResetCode = async (e) => {
        e.preventDefault();
        const resetCode = otp.join("");
        try {
            const response = await axios.post(`${backendUrl}/api/v1/auth/verifyResetCode`, {
                resetCode
            });
            console.log('response verifyyyyyyy>>>', response);
            if (response) {
                localStorage.setItem("resetPasswordCode", resetCode);
                toast.success("Code verified successfully");
                setStep(3);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Invalid reset code");
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== newConfirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }
        try {
            const savedResetCode = localStorage.getItem("resetPasswordCode");
            if (!savedResetCode) {
                toast.error("Reset code not found. Please start the process again.");
                setStep(1);
                return;
            }

            const response = await axios.put(`${backendUrl}/api/v1/auth/resetPassword`, {
                resetCode: savedResetCode,
                password: newPassword
            });
            
            if (response) {
                toast.success("Password reset successfully. You can now login.");
                localStorage.removeItem("resetPasswordCode");
                navigate("/Login");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to reset password");
        }
    };

    const renderStep1 = () => (
        <form className="flex flex-col gap-5" onSubmit={handleSendResetCode}>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800 dark:text-black rounded-md"
                required
            />
            <button type="submit" className="w-full transition-all duration-500 border border-[--color1] text-[--color1] hover:border-[--color1] hover:bg-[--color1] hover:text-white dark:hover:bg-[--textColor1] dark:hover:text-[--color1] dark:text-[--textColor1] dark:border-[--textColor1] dark:font-bold px-8 py-2 active:bg-gray-700 rounded-md">
                Send
            </button>
        </form>
    );

    const renderStep2 = () => (
        <form className="flex flex-col gap-5" onSubmit={handleVerifyResetCode}>
            <p className="text-gray-600">Enter the 6-digit code sent to your email</p>
            <div className="flex justify-between">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => {
                            const newOtp = [...otp];
                            newOtp[index] = e.target.value;
                            setOtp(newOtp);
                            
                            // الانتقال التلقائي للحقل التالي
                            if (e.target.value && index < 5) {
                                document.getElementById(`otp-${index+1}`).focus();
                            }
                        }}
                        id={`otp-${index}`}
                        className="w-10 h-10 px-3 py-2 border border-gray-800 dark:text-black rounded-md text-center"
                    />
                ))}
            </div>
            <button type="submit" className="w-full transition-all duration-500 border border-[--color1] text-[--color1] hover:border-[--color1] hover:bg-[--color1] hover:text-white dark:hover:bg-[--textColor1] dark:hover:text-[--color1] dark:text-[--textColor1] dark:border-[--textColor1] dark:font-bold px-8 py-2 active:bg-gray-700 rounded-md">
                Verify Code
            </button>
        </form>
    );

    const renderStep3 = () => (
        <form className="flex flex-col gap-5" onSubmit={handleResetPassword}>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-800 dark:text-black rounded-md"
                    required
                    minLength="8"
                />
                <button type="button" className="absolute top-3 right-3 dark:text-black" onClick={togglePasswordVisibility}>
                    {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
            </div>
            <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={newConfirmPassword}
                    onChange={(e) => setNewConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-800 dark:text-black rounded-md"
                    required
                    minLength="8"
                />
                <button type="button" className="absolute top-3 right-3 dark:text-black" onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                </button>
            </div>
            <button type="submit" className="w-full transition-all duration-500 border border-[--color1] text-[--color1] hover:border-[--color1] hover:bg-[--color1] hover:text-white dark:hover:bg-[--textColor1] dark:hover:text-[--color1] dark:text-[--textColor1] dark:border-[--textColor1] dark:font-bold px-8 py-2 active:bg-gray-700 rounded-md">
                Change
            </button>
        </form>
    );

    return (
        <div className="grid grid-cols-2 h-screen">
            <div className="prata-regular px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] w-full flex flex-col gap-6">
                <div className="w-full flex justify-center items-center mb-24 mt-4">
                    <img src={graduations.logo2} className="w-[35%] translate-x-[5%] sm:translate-x-[10%]" alt="" />
                </div>
                <div className="flex flex-col gap-6">
                    <p className="text-3xl font-bold">{step === 1?'Forget your password?':step === 2?'Check in your email!':'Enter new password'}</p>
                    {step === 2 && <p className="text-sm">We just emailed you with instruction to reset your password.</p>}
                    {step === 1 && <p className="text-sm">Please enter your email address below to receive a password reset link.</p>}
                </div>
                
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
            </div>
            <div className="relative">
                <img className="absolute w-full h-full border-l-white border rounded-l-2xl" src={graduations.Medical_gloves2} alt="" />
                <div className="absolute left-28 top-16 gap-1 w-[70%]">
                    <h1 className="font-medium text-2xl">Don&apos;t have an account?</h1>
                    <h1 className="font-bold text-3xl">Create your account now and enjoy many features.</h1>
                    <h1 className="font-medium text-2xl">Create orders faster.</h1>
                    <h1 className="font-medium text-2xl">Track your order easily.</h1>
                    <h1 className="font-medium text-2xl">Add different shipping addresses.</h1>
                </div>
                <button onClick={()=>navigate('/Login')} className="absolute left-[50%] top-[60%] translate-x-[-50%] border border-white hover:border-black px-8 py-4 font-medium text-2xl text-white hover:bg-white hover:text-black rounded-lg transition-all duration-500">Create An Account</button>
            </div>
        </div>
    );
};

export default ResetPassword;