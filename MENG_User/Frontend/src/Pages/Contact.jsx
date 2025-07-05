import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from "../context/ShopContextProvider";
import Title from "../components/Title"
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
    const { backendUrl, token } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const response = await axios.post(
                `${backendUrl}/api/v1/contactUs`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response) {
                toast.success(response.data.message);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
            transition: {
                duration: 0.3
            }
        }
    };

    const laptopVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 60,
                damping: 10,
                delay: 0.4
            }
        },
        hover: {
            y: -5,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <motion.div 
            className="px-4 pb-16 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div className="text-2xl mb-3" variants={itemVariants}>
                <Title text1={'GET IN'} text2={'TOUCH'}/>
            </motion.div>
            
            <motion.p 
                className="text-center mt-8"
                variants={itemVariants}
            >
                Contact us for a quote, help, or to join the team.
            </motion.p>

            <motion.div 
                className='grid grid-cols-1 text-sm sm:grid-cols-3 gap-10 my-8'
                variants={containerVariants}
            >
                <motion.div 
                    className='flex flex-col items-center justify-center border border-white rounded-lg shadow-md py-8 px-10 gap-8 bg-[--color1] text-white'
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <FaMapMarkerAlt />
                    </motion.div>
                    <span> 1234 Street Name, City, State, 12345</span>
                </motion.div>
                
                <motion.div 
                    className='flex flex-col items-center justify-center border border-white rounded-lg shadow-md py-8 px-10 gap-8 bg-[--color1] text-white'
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <FaPhoneAlt />
                    </motion.div>
                    <span> +201211911644</span>
                </motion.div>
                
                <motion.div 
                    className='flex flex-col items-center justify-center border border-white rounded-lg shadow-md py-8 px-10 gap-8 bg-[--color1] text-white'
                    variants={cardVariants}
                    whileHover="hover"
                >
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <FaEnvelope />
                    </motion.div>
                    <span> MENG123@company.com</span>
                </motion.div>
            </motion.div>

            <motion.div 
                className="bg-[--color1] border-2 border-white text-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center"
                variants={itemVariants}
            >
                <motion.h2 
                    className="text-2xl font-semibold mb-6"
                    variants={itemVariants}
                >
                    Contact Form
                </motion.h2>
                
                <motion.form 
                    onSubmit={handleSubmit} 
                    className="space-y-6 flex flex-col text-black items-center justify-center w-full"
                    variants={containerVariants}
                >
                    <motion.div 
                        className='grid grid-cols-1 sm:grid-cols-2 gap-12 w-full items-center justify-center'
                        variants={containerVariants}
                    >
                        <motion.div 
                            className="grid md:grid-rows-3 gap-5"
                            variants={itemVariants}
                        >
                            <motion.div variants={itemVariants}>
                                <label htmlFor="name" className="block text-white mb-2 font-medium">Name</label>
                                <motion.input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>
                            
                            <motion.div variants={itemVariants}>
                                <label htmlFor="email" className="block text-white mb-2 font-medium">Email</label>
                                <motion.input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    autoComplete="off"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label htmlFor="phone" className="block text-white mb-2 font-medium">Phone (Optional)</label>
                                <motion.input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </motion.div>
                        </motion.div>
                    
                        <motion.div 
                            className="relative w-full max-w-2xl"
                            variants={laptopVariants}
                            whileHover="hover"
                        >
                            <div className="bg-gray-900 rounded-t-xl p-1 border-8 border-gray-800 border-b-0">
                                <div className="bg-gray-800 h-8 rounded-t-sm flex items-center px-3 justify-between">
                                    <div className="flex space-x-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <div className="text-xs text-gray-400 font-mono">LAPTOP TERMINAL</div>
                                    <div className="w-8"></div>
                                </div>
                                
                                <motion.textarea
                                    id="message"
                                    name="message"
                                    placeholder="Type your message here..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="10"
                                    className="w-full px-4 py-3 bg-black text-green-400 font-mono text-sm focus:outline-none resize-none"
                                    style={{
                                        textShadow: '0 0 5px rgba(0, 255, 0, 0.3)',
                                        caretColor: '#00ff00'
                                    }}
                                    whileFocus={{
                                        boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
                                        transition: { duration: 0.3 }
                                    }}
                                />
                            </div>
                            
                            <div className="bg-gray-700 rounded-b-xl h-6 border-t-2 border-gray-600"></div>
                            <div className="mx-auto bg-gray-800 h-4 w-3/4 rounded-b-lg"></div>
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-900 rounded-b"></div>
                        </motion.div>
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#1d2d3d] hover:bg-[#2d3d4d] text-white px-8 py-3 rounded-lg font-medium transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 border border-white"
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, backgroundColor: "#2d3d4d" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {isSubmitting ? (
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="inline-block"
                            >
                                ↻
                            </motion.span>
                        ) : null}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                </motion.form>
            </motion.div>
        </motion.div>
    );
}