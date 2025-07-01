import { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { VscSignOut } from "react-icons/vsc";
import { MdOutlinePerson } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineBorderOuter } from "react-icons/md";
import { toast } from "react-toastify";
import { graduations } from '../graduation_project/graduations'
// import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { 
        token, 
        logout,
        // backendUrl,
        getUserProfile,
        updateUserProfile
    } = useContext(ShopContext);
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
        country: '',
        birthDate: '',
        gender: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchProfileData = async () => {
            try {
                setProfileLoading(true);
                const profileData = await getUserProfile();
                
                if (profileData) {
                    setFormData({
                        name: profileData.name || '',
                        email: profileData.email || '',
                        phone: profileData.phone || '',
                        city: profileData.city || '',
                        country: profileData.country || '',
                        birthDate: profileData.birthDate ? 
                            new Date(profileData.birthDate).toISOString().split('T')[0] : '',
                        gender: profileData.gender || ''
                    });
                    setImagePreview(profileData.image || graduations.avatar);
                }
                
            } catch (error) {
                console.error("Error fetching profile:", error);
                toast.error("Failed to load profile data");
            } finally {
                setProfileLoading(false);
            }
        };

        fetchProfileData();
    }, [token, navigate, getUserProfile]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formDataToSend = new FormData();
            
            // إضافة بيانات النموذج
            Object.entries(formData).forEach(([key, value]) => {
                if (value) formDataToSend.append(key, value);
            });

            // إضافة ملف الصورة إذا تم اختياره
            if (imageFile) {
                formDataToSend.append('image', imageFile);
            }

            const result = await updateUserProfile(formDataToSend);
            
            if (result) {
                toast.success("Profile updated successfully!");
                // تحديث معاينة الصورة بعد التحديث الناجح
                if (imageFile) {
                    setImagePreview(URL.createObjectURL(imageFile));
                    setImageFile(null);
                }
            }
        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.response?.data?.message || "An error occurred while updating profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        // التحقق من نوع وحجم الملف
        if (!file.type.match('image.*')) {
            toast.error('Please select an image file (JPEG, PNG)');
            return;
        }
        
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }
    
        // حفظ الملف لاستخدامه عند التسليم
        setImageFile(file);
        
        // عرض معاينة الصورة
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    if (!token || profileLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-[--color2] dark:bg-slate-900 dark:text-slate-100 p-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:py-[2vw] md:py-[3vw] lg:py-[5vw]">
            {/* Sidebar */}
            <aside className="md:w-1/4 bg-[#1d2d3d] dark:bg-gray-700 text-white rounded-xl p-4 space-y-4">
                <div className="flex flex-col items-center space-y-2 pt-7">
                    <div className="flex flex-col items-center mb-4 relative">
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Profile" 
                                className="w-32 h-32 rounded-lg object-cover border-2 border-white"
                                onError={(e) => {
                                    e.target.src = "/default-avatar.png";
                                }}
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center">
                                <MdOutlinePerson className="text-4xl text-gray-500" />
                            </div>
                        )}
                        
                        <input 
                            id='profileImage' 
                            type="file" 
                            onChange={handleImageChange} 
                            className="hidden" 
                            accept="image/*"
                            disabled={isUploading}
                        />
                        <label 
                            htmlFor="profileImage" 
                            className={`absolute left-[-20%] top-[-20%] px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-800 transition ${
                                isUploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isUploading ? 'Uploading...' : 'Edit'}
                        </label>
                    </div>
                    <h2 className="text-xl font-semibold">Welcome {formData.name?.split(" ")[0]}!</h2>
                    <p className="text-sm text-gray-300">{formData.email}</p>
                </div>

                <nav className="mt-6 space-y-3">
                    <button 
                        onClick={() => navigate('/Profile')} 
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-500 rounded transition flex items-center gap-1"
                    >
                        <MdOutlinePerson/> Profile
                    </button>
                    <button 
                        onClick={() => navigate('/Orders')} 
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-500 rounded transition flex items-center gap-1"
                    >
                        <MdOutlineBorderOuter /> Orders
                    </button>
                    <button 
                        onClick={() => navigate('/Favourites')} 
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-500 rounded transition flex items-center gap-1"
                    >
                        <FaRegHeart/> Favorite products
                    </button>
                    <button 
                        onClick={() => navigate('/Collections')} 
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-500 rounded transition flex items-center gap-1"
                    >
                        <AiOutlineProduct/> Products
                    </button>
                    <button 
                        onClick={() => navigate('/Contact')} 
                        className="w-full text-left px-4 py-2 hover:bg-gray-700 dark:hover:bg-gray-500 rounded transition flex items-center gap-1"
                    >
                        <IoCallOutline/> Contact us
                    </button>
                </nav>

                <button 
                    onClick={logout} 
                    className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded flex items-center justify-center gap-2 transition"
                >
                    <VscSignOut /><span>Sign Out</span>
                </button>
            </aside>

            {/* Main Profile Content */}
            <main className="md:w-3/4 bg-white dark:bg-slate-500 rounded-xl shadow-lg p-6 ml-0 md:ml-6 mt-6 md:mt-0 border border-[#263D54]">
                <h2 className="text-2xl font-semibold mb-6 text-[#1d2d3d] dark:text-[--textColor1]">Profile Settings</h2>
                <p className="text-sm text-gray-600 dark:text-gray-200 mb-6">Manage your personal and contact information</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Info Section */}
                    <div className="bg-[#1d2d3d] dark:bg-gray-700 text-white p-4 rounded-lg space-y-4">
                        <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Email Address*</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Phone Number</label>
                                <input 
                                    type="tel" 
                                    name="phone" 
                                    value={formData.phone} 
                                    onChange={handleChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                    placeholder="+20 123 456 7890"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Personal Info Section */}
                    <div className="bg-[#1d2d3d] dark:bg-gray-700 text-white p-4 rounded-lg space-y-4">
                        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm mb-1">Full Name*</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">City</label>
                                <input 
                                    type="text" 
                                    name="city" 
                                    value={formData.city} 
                                    onChange={handleChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Country</label>
                                <input 
                                    type="text" 
                                    name="country" 
                                    value={formData.country} 
                                    onChange={handleChange} 
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Date of Birth</label>
                                <input 
                                    type="date" 
                                    name="birthDate" 
                                    value={formData.birthDate} 
                                    onChange={handleChange} 
                                    max={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm mb-2">Gender</label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="male" 
                                        checked={formData.gender === 'male'} 
                                        onChange={handleChange} 
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Male</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="female" 
                                        checked={formData.gender === 'female'} 
                                        onChange={handleChange} 
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span>Female</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            disabled={isSubmitting || isUploading}
                            className="bg-[#1d2d3d] hover:bg-[#2d3d4d] dark:bg-gray-700 dark:hover:bg-gray-500 text-white px-8 py-3 rounded-lg font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Updating...
                                </>
                            ) : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default Profile;