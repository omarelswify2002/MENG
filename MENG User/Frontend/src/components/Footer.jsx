// import { assets } from "../assets/frontend_assets/assets";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { graduations } from "../graduation_project/graduations";
import { Link } from "react-router-dom";

export default function Footer() {

    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] bg-[--footerColor] dark:bg-gray-700 text-[--textColor1]">
            <div className="pt-4 sm:pt-[4vw] md:pt-[4vw] lg:pt-[4vw] flex flex-col sm:grid grid-cols-[3fr_1fr_1fr_0.5fr] gap-14 text-sm">
                <div>
                    <img src={graduations.logo2} className="mb-5 w-32" alt="" />
                    <p className="w-full md:w-2/3 text-gray-300 text-xs font-light">
                        MENG is a specialized store for selling medical, engineering and scientific tools and apparel, 
                        ensuring high-quality products for professionals in the field. Our platform provides a seamless shopping 
                        experience with a user-friendly interface and secure transactions.
                    </p>
                </div>

                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-300 text-xs font-light">
                        <Link className="hover:text-[--color1Hover]" to={'/'} onClick={()=>window.scrollTo(0,0)}>Home</Link>
                        <Link className="hover:text-[--color1Hover]" to={'/About'} onClick={()=>window.scrollTo(0,0)}>About Us</Link>
                        <Link className="hover:text-[--color1Hover]" to={'/Contact'} onClick={()=>window.scrollTo(0,0)}>Contact</Link>
                        <Link className="hover:text-[--color1Hover]" to={'/OurPolicy'} onClick={()=>window.scrollTo(0,0)}>Privacy Policy</Link>
                    </ul>
                </div>
                
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-300 text-xs font-light">
                        <li>+20-012-456-78910</li>
                        <li>MENG@Company.com</li>
                    </ul>
                </div>

                <div className="flex items-center justify-center">
                    <FaArrowAltCircleUp className="text-2xl sm:text-3xl cursor-pointer" onClick={()=>window.scrollTo(0,0)}/>
                </div>
            </div>
            <div className="mt-3">
                <hr />
                <p className="py-5 text-sm flex items-center justify-center">&copy; copyright @ 2024-2025 <img src={graduations.logo2} className="w-14 h-4 sm:w-[6vw] sm:h-[3vh] px-1" alt="" />Web.All right reserved.</p>
            </div>
        </div>
    )
}
