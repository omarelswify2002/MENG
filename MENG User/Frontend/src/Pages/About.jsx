import Title from '../components/Title'
// import NewsLetterBox from '../components/NewsLetterBox'
import { graduations } from '../graduation_project/graduations'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContextProvider'
export default function About() {
    const {isDark} = useContext(ShopContext)
    return (
        <div className="dark:bg-slate-900 dark:text-slate-100 transition-all duration-300">
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] mb-5'>
                <div className="text-2xl text-center">
                    <Title text1={'ABOUT'} text2={'US'}/>
                </div>

                <div className='flex flex-col w-full items-center justify-center gap-8 py-8'>
                    <div className='text-center p-3 border border-[--textColor2] dark:border-[--textColor1] rounded-lg shadow-md md:w-[60%]'>
                        <h1 className='font-bold text-xl'>OUR VISION</h1>
                        <p>
                        At MENG, we envision a future where access to premium medical and engineering tools 
                        empowers every professional to create, heal, and innovate without limits.
                        We aim to lead the market by setting new standards of quality, service, and trust, 
                        inspiring a new generation of professionals to push the boundaries of what’s possible.
                        Our vision is to be recognized as the first choice for anyone seeking excellence, precision, 
                        and reliability in the fields of medicine and engineering.
                        </p>
                    </div>
                    <div className='grid grid-cols-1 gap-8 md:grid-cols-2 w-full itcems-center justify-center'>
                        <img className='w-full h-full rounded-lg' src={graduations.About_Us} alt="" />
                        <div className='text-center p-3 border border-[--textColor2] dark:border-[--textColor1] rounded-lg shadow-md w-full'>
                            <h1 className='font-bold text-xl'>OUR MISSION</h1>
                            <p>
                            At MENG, our mission is to empower professionals and students by providing 
                            high-quality medical and engineering tools that support innovation, precision, 
                            and excellence.We are committed to delivering products that meet the highest 
                            standards of quality, safety, and reliability, helping our customers achieve their 
                            goals with confidence.Through continuous development and a deep understanding of 
                            the industries we serve, we strive to be the trusted partner 
                            for every professional seeking excellence in their field.
                            </p>
                        </div>
                    </div>
                </div>

                <div className='my-3'>
                    <img src={!isDark?graduations.middle_page1:graduations.middleGray_page} alt="" />
                </div>

                <div className='text-xl py-4'>
                    <Title text1={'WHY'} text2={'CHOOSE US'}/>
                </div>
                <div className='flex flex-col md:flex-row mb-20 text-sm'>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Quality Assurance:</b>
                        <p className='text-gray-600'>We guarantee high-quality products that undergo the highest standards of inspection and testing, ensuring accurate and reliable performance with every use.</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Convenience:</b>
                        <p className='text-gray-600'>A quick and easy shopping experience, with fast delivery throughout the Arab world and a secure, multiple-choice payment service.</p>
                    </div>
                    <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
                        <b>Exceptional Customer Service:</b>
                        <p className='text-gray-600'>A dedicated technical support team is available 24/7 to assist you with every inquiry, ensuring a prompt response and customized solutions to your needs.</p>
                    </div>
                </div>
            </div>
            {/* <NewsLetterBox/> */}
        </div>
    )
}
