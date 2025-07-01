// import { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContextProvider";
// import Title from './Title';
// import { Link } from "react-router-dom";
// import { graduations } from "../graduation_project/graduations";

// export default function BestSeller() {
//     const { getBestSeller } = useContext(ShopContext);
//     // eslint-disable-next-line no-unused-vars
//     const [bestSellers, setBestSellers] = useState([]);
//     const [medicalBestSellers, setMedicalBestSellers] = useState([]);
//     const [geometricBestSellers, setGeometricBestSellers] = useState([]);
//     const [currentIndex1, setCurrentIndex1] = useState(0);
//     const [currentIndex2, setCurrentIndex2] = useState(0);

//     useEffect(() => {
//     const fetchBestSellers = async () => {
//         const data = await getBestSeller(8);
//         console.log("All best sellers:", data);
//         const medical = data.filter(item => 
//             item.category && item.category.toLowerCase().includes('medical')
//         );
//         const geometric = data.filter(item => 
//             item.category && item.category.toLowerCase().includes('geometric')
//         );
        
//         console.log("Medical:", medical);
//         console.log("Geometric:", geometric);
        
//         setMedicalBestSellers(medical);
//         setGeometricBestSellers(geometric);
//         setBestSellers(data);
//     };
    
//     fetchBestSellers();
// // eslint-disable-next-line react-hooks/exhaustive-deps
// }, []);

//     useEffect(() => {
//     if (medicalBestSellers.length > 1) { // تغيير الشرط إلى > 1
//         const interval1 = setInterval(() => {
//             setCurrentIndex1(prev => 
//                 prev === medicalBestSellers.length - 1 ? 0 : prev + 1
//             );
//         }, 3000);
//         return () => clearInterval(interval1);
//     }
// }, [medicalBestSellers.length]);

// useEffect(() => {
//     if (geometricBestSellers.length > 1) { // تغيير الشرط إلى > 1
//         const interval2 = setInterval(() => {
//             setCurrentIndex2(prev => 
//                 prev === geometricBestSellers.length - 1 ? 0 : prev + 1
//             );
//         }, 3000);
//         return () => clearInterval(interval2);
//     }
// }, [geometricBestSellers.length]);

//     return (
//         <div className="bg-[--color1] px-4 pb-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pb-4 md:pb-4 lg:pb-4">
//             <Title text1={'BEST'} text2={'SELLER'}/>
//             <div className="py-7">
//                 <img src={graduations.middleGray_page} alt="" />
//             </div>
//             <div className="text-center text-3xl py-8">
//                 <h1 className="w-3/4 m-auto text-xs sm:text-xl md:text-3xl my-5 text-[--textColor1] underline">
//                     Shop by departments  Browse all shopping sections.
//                 </h1>
//             </div>
            
//             <div className="flex flex-col sm:flex-row gap-7 items-center justify-center pb-7">
//                 {medicalBestSellers.length > 0 ? (
//                     <Link to={`/Collections`} className="relative group w-1/2 shadow-md rounded-lg shadow-white">
//                         <img
//                             src={medicalBestSellers[currentIndex1]?.imageCover || medicalBestSellers[currentIndex1]?.images[0]}
//                             alt={`Medical Best Seller ${currentIndex1}`}
//                             className="w-full h-[300px] sm:h-[450px] transition-all duration-500 rounded-lg object-cover"
//                         />
//                         <p className="opacity-0 absolute transition-all duration-500 right-1/2 
//                         top-1/2 translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 text-[--textColor1]
//                         font-bold text-5xl text-outline-black">MEDICAL</p>
//                     </Link>
//                 ) : (
//                     <div className="w-1/2 lg:w-1/3 h-[300px] sm:h-[450px] bg-gray-200 flex items-center justify-center">
//                         No Medical products
//                     </div>
//                 )}

//                 {geometricBestSellers.length > 0 ? (
//                     <Link to={`/Collections`} className="relative group w-1/2 shadow-md rounded-lg shadow-white">
//                         <img
//                             src={geometricBestSellers[currentIndex2]?.imageCover || geometricBestSellers[currentIndex2]?.images[0]}
//                             alt={`Geometric Best Seller ${currentIndex2}`}
//                             className="w-full h-[300px] sm:h-[450px] transition-all duration-500 rounded-lg object-cover"
//                         />
//                         <p className="opacity-0 absolute transition-all duration-500 right-1/2 
//                         top-1/2 translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 text-[--textColor1]
//                         font-bold text-5xl text-outline-black">GEOMETRIC</p>
//                     </Link>
//                 ) : (
//                     <div className="w-1/2 lg:w-1/3 h-[300px] sm:h-[450px] bg-gray-200 flex items-center justify-center">
//                         No Geometric products
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import Title from './Title';
import { Link } from "react-router-dom";
import { graduations } from "../graduation_project/graduations";
import { motion } from "framer-motion";

export default function BestSeller() {
    const { getBestSeller } = useContext(ShopContext);
    // eslint-disable-next-line no-unused-vars
    const [bestSellers, setBestSellers] = useState([]);
    const [medicalBestSellers, setMedicalBestSellers] = useState([]);
    const [geometricBestSellers, setGeometricBestSellers] = useState([]);
    const [currentIndex1, setCurrentIndex1] = useState(0);
    const [currentIndex2, setCurrentIndex2] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchBestSellers = async () => {
            const data = await getBestSeller(8);
            console.log("All best sellers:", data);
            const medical = data.filter(item => 
                item.category && item.category.toLowerCase().includes('medical')
            );
            const geometric = data.filter(item => 
                item.category && item.category.toLowerCase().includes('geometric')
            );
            
            console.log("Medical:", medical);
            console.log("Geometric:", geometric);
            
            setMedicalBestSellers(medical);
            setGeometricBestSellers(geometric);
            setBestSellers(data);
            setLoaded(true); // تم تحميل البيانات
        };
        
        fetchBestSellers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (medicalBestSellers.length > 1) {
            const interval1 = setInterval(() => {
                setCurrentIndex1(prev => 
                    prev === medicalBestSellers.length - 1 ? 0 : prev + 1
                );
            }, 3000);
            return () => clearInterval(interval1);
        }
    }, [medicalBestSellers.length]);

    useEffect(() => {
        if (geometricBestSellers.length > 1) {
            const interval2 = setInterval(() => {
                setCurrentIndex2(prev => 
                    prev === geometricBestSellers.length - 1 ? 0 : prev + 1
                );
            }, 3000);
            return () => clearInterval(interval2);
        }
    }, [geometricBestSellers.length]);

    // تأثيرات الحركة
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
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const slideInVariants = {
        hidden: { opacity: 0, x: 100 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.8
            }
        }
    };

    return (
        <motion.div 
            className="bg-[--color1] px-4 pb-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pb-4 md:pb-4 lg:pb-4"
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.div variants={itemVariants}>
                <Title text1={'BEST'} text2={'SELLER'}/>
            </motion.div>
            
            <motion.div className="py-7" variants={fadeInVariants}>
                <img src={graduations.middleGray_page} alt="" />
            </motion.div>
            
            <motion.div 
                className="text-center text-3xl py-8"
                variants={itemVariants}
            >
                <h1 className="w-3/4 m-auto text-xs sm:text-xl md:text-3xl my-5 text-[--textColor1] underline">
                    Shop by departments  Browse all shopping sections.
                </h1>
            </motion.div>
            
            <motion.div 
                className="flex flex-col sm:flex-row gap-7 items-center justify-center pb-7 w-full"
                variants={containerVariants}
            >
                {medicalBestSellers.length > 0 ? (
                    <motion.div 
                        variants={slideInVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link to={`/Collections`} className="relative group w-1/2 shadow-md rounded-lg shadow-white">
                            <motion.img
                                src={medicalBestSellers[currentIndex1]?.imageCover || medicalBestSellers[currentIndex1]?.images[0]}
                                alt={`Medical Best Seller ${currentIndex1}`}
                                className="w-full h-[300px] sm:h-[450px] transition-all duration-500 rounded-lg object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                key={currentIndex1}
                            />
                            <p className="opacity-0 absolute transition-all duration-500 right-1/2 
                            top-1/2 translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 text-[--textColor1]
                            font-bold text-5xl text-outline-black">MEDICAL</p>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="w-1/2 lg:w-1/3 h-[300px] sm:h-[450px] bg-gray-200 flex items-center justify-center"
                        variants={slideInVariants}
                    >
                        No Medical products
                    </motion.div>
                )}

                {geometricBestSellers.length > 0 ? (
                    <motion.div 
                        variants={slideInVariants}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link to={`/Collections`} className="relative group w-1/2 shadow-md rounded-lg shadow-white">
                            <motion.img
                                src={geometricBestSellers[currentIndex2]?.imageCover || geometricBestSellers[currentIndex2]?.images[0]}
                                alt={`Geometric Best Seller ${currentIndex2}`}
                                className="w-full h-[300px] sm:h-[450px] transition-all duration-500 rounded-lg object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                key={currentIndex2}
                            />
                            <p className="opacity-0 absolute transition-all duration-500 right-1/2 
                            top-1/2 translate-x-1/2 -translate-y-1/2 group-hover:opacity-100 text-[--textColor1]
                            font-bold text-5xl text-outline-black">GEOMETRIC</p>
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div 
                        className="w-1/2 lg:w-1/3 h-[300px] sm:h-[450px] bg-gray-200 flex items-center justify-center"
                        variants={slideInVariants}
                    >
                        No Geometric products
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
}