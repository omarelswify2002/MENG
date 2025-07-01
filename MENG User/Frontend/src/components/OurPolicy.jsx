import Title from "./Title";
import { IoIosList } from "react-icons/io";
import { RiApps2AiFill } from "react-icons/ri";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FaClipboardList } from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { MdOutlineMessage } from "react-icons/md";
import { IoMdAnalytics } from "react-icons/io";
import { PiExclamationMarkFill } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { LuPencilLine } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineBookmarkSlash } from "react-icons/hi2";
import { GoDownload } from "react-icons/go";
import { FaRegCircleXmark } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const PrivacyPolicy = () => {
    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Title text1={'Privacy'} text2={'Policy'}/>

            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 bg-white p-6 mt-10 sm:h-[55vh] border border-[#0988FF] shadow-md md:sticky md:top-0 rounded-xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6"><IoIosList className="inline mr-1" />CONTENTS</h2>
                    <ul className="space-y-3">
                        <li><a href="#introduction" className="sidebar-link text-gray-600 hover:text-[#0988FF] transition-colors"><RiApps2AiFill className="inline mr-1" />Introduction</a></li>
                        <li><a href="#information-collection" className="sidebar-link text-gray-600 hover:text-[#0988FF] transition-colors"><RiApps2AiFill className="inline mr-1" />Information Collection</a></li>
                        <li><a href="#use-of-information" className="sidebar-link text-gray-600 hover:text-[#0988FF] transition-colors"><RiApps2AiFill className="inline mr-1" />Use of Information</a></li>
                        <li><a href="#information-sharing" className="sidebar-link text-gray-600 hover:text-[#0988FF] transition-colors"><RiApps2AiFill className="inline mr-1" />Information Sharing</a></li>
                        <li><a href="#data-security" className="sidebar-link text-gray-600 hover:text-[#0988FF] transition-colors"><RiApps2AiFill className="inline mr-1" />Data Security</a></li>
                        <li><a href="#your-rights" className="sidebar-link text-gray-600 hover:text-[#0988FF] transition-colors"><RiApps2AiFill className="inline mr-1" />Your Rights</a></li>
                        <li><a href="#contact-us" className="sidebar-link text-gray-600 hover:text-[#0988FF] transition-colors"><RiApps2AiFill className="inline mr-1" />Contact Us</a></li>
                    </ul>
                </div>

                <div className="flex-1 p-6 md:p-10">
                    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8">
                        <section id="introduction" className="mb-12 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4"><IoIosCheckmarkCircleOutline className="inline mr-1" />Introduction</h2>
                            <div className="p-5 rounded-lg mb-6 bg-[#263D54] text-white font-medium border border-[#0988FF] flex flex-col gap-3">
                                <p>Welcome to MENG. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
                                <p>Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services. By accessing the website and/or using our services, you consent to the collection and use of information in accordance with this policy.</p>
                            </div>
                            <div className="p-5 rounded-lg mb-6 bg-[#263D54] text-white font-medium border border-[#0988FF] flex flex-col gap-3">
                                <p className="font-medium">Last Updated: April 29, 2025</p>
                                <p className="mt-2">At MENG, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.</p>
                                <p className="mt-2">This policy applies to all information collected through our website, mobile applications, and any related services, sales, marketing, or events.</p>
                            </div>
                        </section>

                        <section id="information-collection" className="mb-12 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4"><IoIosCheckmarkCircleOutline className="inline mr-1" />Information Collection</h2>
                            <div className="p-5 rounded-lg mb-6 bg-[#263D54] text-white font-medium border border-[#0988FF] grid sm:grid-cols-2 gap-3">
                                <div className="mb-6">
                                    <h3 className="text-xl font-medium mb-2 underline">Automatically Collected Information</h3>
                                    <p>When you access our service, we may automatically collect:</p>
                                    <ul className="list-disc pl-5  space-y-1">
                                        <li>Device information (type, model, operating system)</li>
                                        <li>IP address and browsing data</li>
                                        <li>Usage patterns and interactions</li>
                                        <li>Location information (with your permission)</li>
                                    </ul>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-medium mb-2 underline">Personal Information</h3>
                                    <p>We may collect personal information that you voluntarily provide when using our service, including:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Name, email address, and contact details</li>
                                        <li>Profile information and preferences</li>
                                        <li>Payment and transaction information</li>
                                        <li>Communications with our support team</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section id="use-of-information" className="mb-12 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4"><FaClipboardList className="inline mr-1" />Use of Information</h2>
                            <div className="p-5 rounded-lg mb-6 bg-[#263D54] text-white font-medium border border-[#0988FF] flex flex-col gap-3">
                                <p className="mb-2">We use the information we collect for various purposes, including:</p>
                                <div className="flex items-center">
                                    <LuHeartHandshake className="inline mr-2" />
                                    <p>Providing and Improving Our Services To operate, maintain, and enhance the features and functionality of our platform.</p>
                                </div>
                                <div className="flex items-center">
                                    <BiSupport className="inline mr-2" />
                                    <p>Customer Support To respond to your inquiries, resolve disputes, and troubleshoot issues.</p>
                                </div>
                                <div className="flex items-center">
                                    <MdOutlineMessage className="inline mr-2" />
                                    <p>Communications To send you updates, security alerts, and support messages.</p>
                                </div>
                                <div className="flex items-center">
                                    <IoMdAnalytics className="inline mr-2" />
                                    <p>Analytics and Research To understand user behavior and improve our service.</p>
                                </div>
                            </div>
                        </section>

                        <section id="information-sharing" className="mb-12 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4"><PiExclamationMarkFill className="inline mr-1" />Information Sharing</h2>
                                <div className="border border-[#0988FF] bg-[#263D54] text-white font-medium rounded-xl p-5">
                                    <p>We may share your personal information with:</p>
                                    <ul className="list-disc pl-5  space-y-1">
                                        <li>Service Providers: Third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.</li>
                                        <li>Business Partners: Partners with whom we jointly offer products or services.</li>
                                        <li>Affiliates: Our parent company, subsidiaries, and affiliates.</li>
                                        <li>Legal Requirements: To comply with any court order, law, or legal process, including responding to government or regulatory requests.</li>
                                    </ul>
                                </div>                        
                        </section>

                        <section id="data-security" className="mb-12 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4"><CiLock className="inline mr-1" />Data Security</h2>                            
                            <div className="border border-[#0988FF] bg-[#263D54] text-white font-medium rounded-xl p-5 flex flex-col gap-2">
                                <p>We implement appropriate technical and organizational measures to protect</p>
                                <p>your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                                <p>While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure.</p>
                            </div>                            
                        </section>

                        <section id="your-rights" className="mb-12 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4"><IoIosCheckmarkCircleOutline className="inline mr-1" />Your Rights</h2>
                            <div className="p-5 rounded-lg mb-6 bg-[#263D54] text-white font-medium border border-[#0988FF]">
                                <div className="flex flex-col gap-3">
                                    <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                                    <div className="flex items-center">
                                        <FaRegEye className="inline mr-2" />
                                        <p>Right to Access: You have the right to request copies of your personal information.</p>
                                    </div>
                                    <div className="flex items-center">
                                        <LuPencilLine className="inline mr-2" />
                                        <p>Right to Rectification: You have the right to request that we correct inaccurate or complete incomplete information.</p>
                                    </div>
                                    <div className="flex items-center">
                                        <RiDeleteBin6Line className="inline mr-2" />
                                        <p>Right to Erasure: You can request that we delete your personal information in certain circumstances.</p>
                                    </div>
                                    <div className="flex items-center">
                                        <HiOutlineBookmarkSlash className="inline mr-2" />
                                        <p>Right to Restrict Processing: You can request that we restrict the processing of your information.</p>
                                    </div>
                                    <div className="flex items-center">
                                        <GoDownload className="inline mr-2" />
                                        <p>Right to Data Portability: You can request the transfer of your information to you or a third party.</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaRegCircleXmark className="inline mr-2" />
                                        <p>Right to Object: You have the right to object to the processing of your information.</p>
                                    </div>
                                </div>
                            </div>                        
                        </section>

                        <p>To exercise any of these rights, please contact us using the information provided in the Contact Us section below. We may need to verify your identity before responding to your request.</p>

                        <section id="contact-us" className="my-12 scroll-mt-20">
                            <h2 className="text-2xl font-semibold text-gray-700 mb-4"><FaPhoneAlt className="inline mr-1" />Contact Us</h2>
                            <p>If you have any questions about this privacy policy, please contact us:</p>
                            <div className="p-5 rounded-lg my-6 bg-[#263D54] text-white font-medium border border-[#0988FF] flex flex-col gap-3">
                                <p><FaMapMarkerAlt className="inline mr-1" />Address: <a href="mailto:info@meng.com" className="text-primary hover:text-primary transition-colors">Egypt, Ismailia</a></p>    
                                <p><MdEmail className="inline mr-1" />Email: <a href="mailto:info@meng.com" className="text-primary hover:text-primary transition-colors">privacyMeng@meng.com</a></p>    
                                <p><FiPhone className="inline mr-1" />Phone: <a href="tel:1234567890" className="text-primary hover:text-primary transition-colors">123-456-7890</a></p>    
                            </div>                        
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;