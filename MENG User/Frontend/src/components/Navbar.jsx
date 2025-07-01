//new navbar------------------------------------------------------------
import { Link, NavLink } from 'react-router-dom'
import {graduations} from '../graduation_project/graduations.js'
import { useContext, useState, useRef, useEffect } from 'react'
import { ShopContext } from '../context/ShopContextProvider';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";
import { MdOutlinePerson } from "react-icons/md";
import { BsHandbag, BsHandbagFill } from "react-icons/bs";
import { TbMenuDeep } from "react-icons/tb";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineSettings } from "react-icons/md";

export default function Navbar() {
    const [visible, setVisible] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const searchRef = useRef(null);
    const personalRef = useRef(null);
    const settingsRef = useRef(null);
    const { 
        getCartCount, 
        navigate, 
        token, 
        setToken, 
        setCartItems, 
        cartItems,
        favourites,
        isDark,
        setIsDark,
        searchProductsWithLLM,
        setProducts
    } = useContext(ShopContext);
        
    const [showSetting, setShowSetting] = useState(false);
    const [showPersonal, setShowPersonal] = useState(false);

    // إغلاق البحث عند الضغط خارج المربع
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSearch(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function logout() {
        navigate('/Login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    }

    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Use the LLM search function
            const results = await searchProductsWithLLM(searchQuery);
            
            // Update the products in context
            setProducts(results);
            
            // Navigate to collections page with search query
            navigate(`/Collections?search=${encodeURIComponent(searchQuery)}`);
            setShowSearch(false);
            setSearchQuery('');
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (personalRef.current && !personalRef.current.contains(event.target)) {
                setShowPersonal(false);
            }
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSetting(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="flex items-center justify-between py-5 font-medium px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[--color1] relative">
            <Link to={'/'}><img src={graduations.logo2} className='w-36 duration-200 hover:scale-125' alt="" /></Link>
            
            <ul className='hidden sm:flex gap-5 text-sm text-[--color2]'>
                <NavLink to={'/'} className={'group flex flex-col items-center gap-1 text-[--textColor1] hover:text-[--color1Hover] duration-200 hover:scale-125'}>
                    <p>Home</p>
                    <hr className='w-full border-none h-[1.5px] bg-[--textColor1] group-hover:bg-[--color1Hover] hidden' />
                </NavLink>
                <NavLink to={'/Collections'} className={'group text-[--textColor1] hover:text-[--color1Hover] flex flex-col items-center gap-1 duration-200 hover:scale-125'}>
                    <p>Products</p>
                    <hr className='w-full border-none h-[1.5px] bg-[--textColor1] group-hover:bg-[--color1Hover] hidden' />
                </NavLink>
                <NavLink to={'/About'} className={'group text-[--textColor1] hover:text-[--color1Hover] flex flex-col items-center gap-1 duration-200 hover:scale-125'}>
                    <p>About Us</p>
                    <hr className='w-full border-none h-[1.5px] bg-[--textColor1] group-hover:bg-[--color1Hover] hidden' />
                </NavLink>
                <NavLink to={'/Contact'} className={'group text-[--textColor1] hover:text-[--color1Hover] flex flex-col items-center gap-1 duration-200 hover:scale-125'}>
                    <p>Contact</p>
                    <hr className='w-full border-none h-[1.5px] bg-[--textColor1] group-hover:bg-[--color1Hover] hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                {/* Search Icon - تم التعديل هنا */}
                <div className="relative duration-200 hover:scale-150">
                    <RiSearchLine 
                        onClick={() => {
                            setShowSearch(!showSearch);
                            navigate('/Collections');
                            document.querySelector('input[type="text"]')?.focus();
                        }} 
                        className='text-xl cursor-pointer text-[--textColor1] hover:text-[--color1Hover]'
                    />
                </div>
                
                <Link to="/Favourites" className="relative duration-200 hover:scale-150">
                    {favourites?.length > 0 ? (
                        <FaHeart className="text-red-500 text-xl" />
                    ) : (
                        <FaRegHeart className="text-[--textColor1] text-xl hover:text-[--color1Hover]" />
                    )}
                    {favourites?.length > 0 && (
                        <span className="absolute -bottom-[4px] -right-1 bg-[#1B5CBECC] text-white text-[10px] px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                            {favourites.length > 9 ? '9+' : favourites.length}
                        </span>
                    )}
                </Link>

                {/* <div className="group relative">
                    <MdOutlinePerson onClick={()=>{token ? setShowPersonal(!showPersonal) : navigate('/Login')}} className='text-xl cursor-pointer text-[--textColor1] hover:text-[--color1Hover] duration-200 hover:scale-150'/>
                    {showPersonal &&
                    <div className='absolute dropdown-menu right-0 top-5 pt-4'>
                        <div className='flex flex-col items-center gap-1 w-28 py-2 px-2 bg-slate-100 text-[--textColor1] sm:text-gray-300 rounded'>
                            <p onClick={()=>{navigate('/profile')}} className='text-sm bg-[--color1] rounded-lg text-[10px] dark:bg-white dark:text-black dark:hover:bg-gray-300 text-center w-full px-2 py-0.5 border-[--borderColor1] cursor-pointer hover:bg-slate-800 text-[--textColor1]'>My Profile</p>
                            <p onClick={()=>{navigate('/orders')}} className='text-sm bg-[--color1] rounded-lg text-[10px] dark:bg-white dark:text-black dark:hover:bg-gray-300 text-center w-full px-2 py-0.5 border-[--borderColor1] cursor-pointer hover:bg-slate-800 text-[--textColor1]'>Orders</p>
                            <p onClick={logout} className='text-sm bg-[--color1] rounded-lg text-[10px] dark:bg-white dark:text-black dark:hover:bg-gray-300 text-center w-full px-2 py-0.5 border-[--borderColor1] cursor-pointer hover:bg-slate-800 text-[--textColor1]'>Logout</p>
                        </div>
                    </div>}
                </div> */}

                {/* قائمة الشخصية */}
                <div className="group relative" ref={personalRef}>
                    <MdOutlinePerson 
                        onClick={() => {
                            if (token) {
                                setShowPersonal(!showPersonal);
                                setShowSetting(false); // إغلاق القائمة الأخرى إذا كانت مفتوحة
                            } else {
                                navigate('/Login');
                            }
                        }} 
                        className='text-xl cursor-pointer text-[--textColor1] hover:text-[--color1Hover] duration-200 hover:scale-150'
                    />
                    {showPersonal && (
                        <div className='absolute dropdown-menu right-0 top-5 pt-4 z-30'>
                            <div className='flex flex-col items-center gap-1 w-28 py-2 px-2 bg-slate-100 text-[--textColor1] sm:text-gray-300 rounded'>
                                <p onClick={() => { navigate('/profile'); setShowPersonal(false); }} className='text-sm bg-[--color1] rounded-lg text-[10px] dark:bg-white dark:text-black dark:hover:bg-gray-300 text-center w-full px-2 py-0.5 border-[--borderColor1] cursor-pointer hover:bg-slate-800 text-[--textColor1]'>
                                    My Profile
                                </p>
                                <p onClick={() => { navigate('/orders'); setShowPersonal(false); }} className='text-sm bg-[--color1] rounded-lg text-[10px] dark:bg-white dark:text-black dark:hover:bg-gray-300 text-center w-full px-2 py-0.5 border-[--borderColor1] cursor-pointer hover:bg-slate-800 text-[--textColor1]'>
                                    Orders
                                </p>
                                <p onClick={() => { logout(); setShowPersonal(false); }} className='text-sm bg-[--color1] rounded-lg text-[10px] dark:bg-white dark:text-black dark:hover:bg-gray-300 text-center w-full px-2 py-0.5 border-[--borderColor1] cursor-pointer hover:bg-slate-800 text-[--textColor1]'>
                                    Logout
                                </p>
                            </div>
                        </div>
                    )}
                </div>


                <Link to={'/Cart'} className='relative duration-200 hover:scale-150'>
                    {getCartCount(0) || cartItems.products.length > 0 ? (
                        <>
                            <BsHandbagFill className='text-xl cursor-pointer text-[--color1Hover]' />
                            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#1B5CBECC] text-white aspect-square rounded-full text-[8px]'>
                                {getCartCount()}
                            </p>
                        </>
                    ) : (
                        <>
                            <BsHandbag className='text-xl cursor-pointer text-[--textColor1] hover:text-[--color1Hover]' />
                        </>
                    )}
                </Link>

                {/* <div className='relative'>
                    <MdOutlineSettings onClick={()=>setShowSetting(!showSetting)} className='duration-200 hover:scale-150 text-xl cursor-pointer text-[--textColor1] hover:text-[--color1Hover]' />
                    {showSetting ? 
                    <div className='absolute dropdown-menu right-0 top-5 pt-4 z-30'>
                        <div className='flex flex-col items-center gap-1 w-28 py-2 px-2 bg-slate-100 text-[--textColor1] sm:text-gray-300 rounded'>

                            <label className="switch">
                                <input defaultChecked={isDark} id="checkbox" type="checkbox" onClick={() => setIsDark(!isDark)}/>
                                <span className="slider">
                                    <div className="star star_1" />
                                    <div className="star star_2" />
                                    <div className="star star_3" />
                                    <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                                        <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff" d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925" />
                                    </svg>
                                </span>
                            </label>

                            <button className="text-sm w-full px-2 py-0.5 border rounded-md shadow-md dark:bg-white dark:text-black bg-[--color1] text-white hover:bg-slate-800 dark:hover:bg-gray-300">
                                Language
                            </button>
                        </div>
                    </div> : null}
                </div>    */}

                {/* قائمة الإعدادات */}
                <div className='relative' ref={settingsRef}>
                    <MdOutlineSettings 
                        onClick={() => {
                            setShowSetting(!showSetting);
                            setShowPersonal(false); // إغلاق القائمة الأخرى إذا كانت مفتوحة
                        }} 
                        className='duration-200 hover:scale-150 text-xl cursor-pointer text-[--textColor1] hover:text-[--color1Hover]' 
                    />
                    {showSetting && (
                        <div className='absolute dropdown-menu right-0 top-5 pt-4 z-30'>
                            <div className='flex flex-col items-center gap-1 w-28 py-2 px-2 bg-slate-100 text-[--textColor1] sm:text-gray-300 rounded'>
                                <label className="switch">
                                    <input 
                                        defaultChecked={isDark} 
                                        id="checkbox" 
                                        type="checkbox" 
                                        onClick={() => {
                                            setIsDark(!isDark);
                                            setShowSetting(false); // إغلاق القائمة بعد التغيير
                                        }}
                                    />
                                    <span className="slider">
                                        <div className="star star_1" />
                                        <div className="star star_2" />
                                        <div className="star star_3" />
                                        <svg viewBox="0 0 16 16" className="cloud_1 cloud">
                                            <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff" d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925" />
                                        </svg>
                                    </span>
                                </label>

                                <button 
                                    className="text-sm w-full px-2 py-0.5 border rounded-md shadow-md dark:bg-white dark:text-black bg-[--color1] text-white hover:bg-slate-800 dark:hover:bg-gray-300"
                                    onClick={() => setShowSetting(false)}
                                >
                                    Language
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <TbMenuDeep onClick={()=>setVisible(true)} className='text-[--textColor1] text-xl cursor-pointer sm:hidden'/>
            </div>
            
            {/* Search Box - يظهر أسفل الـ Navbar */}
            {showSearch && (
                <div 
                    ref={searchRef}
                    className="absolute top-full left-0 right-0 bg-white shadow-lg z-50"
                    style={{
                        animation: 'slideUp 0.3s ease-out'
                    }}
                >
                    <form onSubmit={handleSearchSubmit} className="flex items-center py-4 px-24 border-t border-gray-200">
                        <input
                            type="text"
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for products..."
                            className="flex-1 border-b-2 border-gray-300 focus:border-[--color1Hover] outline-none py-2 px-4 text-lg transition-all duration-300"
                        />
                        <button 
                            type="submit"
                            className="ml-4 bg-[--color1Hover] text-white px-6 py-2 rounded-md hover:bg-[--color1] transition-colors duration-300"
                        >
                            Search
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowSearch(false)}
                            className="ml-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                        >
                            <RiCloseLine className="text-2xl" />
                        </button>
                    </form>
                </div>
            )}

            {/* CSS للـ Animation */}
            <style >{`
                @keyframes slideUp {
                    from {
                        transform: translateY(-20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `}</style>

            {/* sidebar menu for small screen */}
            <div className={`absolute top-0 right-0  overflow-hidden bg-[--textColor1] transition-all duration-500 z-50 ${ visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-[--textColor2]'>
                    <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <IoIosArrowBack className='text-[--textColor2]'/>
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 font-bold border'} to={'/'}>Home</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 font-bold border'} to={'/Collections'}>Products</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 font-bold border'} to={'/About'}>About Us</NavLink>
                    <NavLink onClick={()=>setVisible(false)} className={'py-2 pl-6 font-bold border'} to={'/Contact'}>Contact</NavLink>
                </div>
            </div>
        </div>
    );
}
