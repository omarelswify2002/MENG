import { MdOutlineShoppingCart } from "react-icons/md";
import ProductItem from './ProductItem';
import Title from "./Title";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function Hero() {
    const { navigate, getBestSeller, getHeroProducts } = useContext(ShopContext);
    const [outBestSeller, setOutBestSeller] = useState([]);
    const [heroProducts, setHeroProducts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bestSellers = await getBestSeller(3);
                setOutBestSeller(bestSellers);
                
                const heroProductsData = await getHeroProducts(4);
                setHeroProducts(heroProductsData);
                setLoaded(true);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (heroProducts.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prev) =>
                    prev === heroProducts.length - 1 ? 0 : prev + 1
                );
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [heroProducts.length]);

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
        hidden: { opacity: 0, y: 50 },
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

    const slideVariants = {
        enter: (direction) => {
            return {
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
            };
        },
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => {
            return {
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
            };
        }
    };

    return (
        <motion.div 
            className="px-4 pb-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pb-4 md:pb-4 lg:pb-4"
            initial="hidden"
            animate={loaded ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <motion.div variants={itemVariants}>
                <Title text1={'Ho'} text2={'me'}/>
            </motion.div>
            
            <motion.div 
                className="flex flex-col h-[800px] sm:h-auto gap-6 sm:flex-row mt-3 relative"
                variants={containerVariants}
            >
                {/* Hero leftside */}
                <motion.div 
                    className="w-full sm:w-1/2 flex flex-col items-center justify-center pr-2 gap-y-8"
                    variants={itemVariants}
                >
                    <motion.div 
                        className="flex flex-col text-[#414141] w-full gap-3"
                        variants={itemVariants}
                    >
                        <motion.h1 
                            className="prata-regular text-2xl sm:py-3 lg:text-5xl leading-relaxed text-animation dark:text-[#dfdfdf]"
                            variants={itemVariants}
                        >
                            Welcome to our <span className="word-change dark:before:text-[#95bcbe] dark:after:border-l-[#95bcbe] dark:after:bg-slate-900"></span>
                        </motion.h1>
    
                        <motion.div 
                            className="flex flex-col items-start gap-2 dark:text-[#dfdfdf]"
                            variants={itemVariants}
                        >
                            <motion.p 
                                className="font-semibold text-sm md:text-[20px]"
                                variants={itemVariants}
                            >
                                Your companion through the journey.
                            </motion.p>
                            <motion.p 
                                className="font-semibold text-sm md:text-[20px]"
                                variants={itemVariants}
                            >
                                With us, you will find what you want.
                            </motion.p>
                        </motion.div>

                        <motion.div 
                            className="flex items-center gap-2 dark:text-[#dfdfdf]"
                            variants={itemVariants}
                        >
                            <motion.p 
                                className="w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-[#dfdfdf]"
                                variants={itemVariants}
                            />
                            <motion.p 
                                className="font-medium text-sm md:text-base"
                                variants={itemVariants}
                            >
                                OUR BESTSELLER
                            </motion.p>
                        </motion.div>

                        <motion.div 
                            onClick={()=>{navigate('/collections')}} 
                            className="w-[40%] bg-black dark:bg-[#dfdfdf] text-[--textColor1] dark:text-[--textColor2] cursor-pointer border-solid border-2 border-white flex items-center gap-2 justify-center py-3 rounded-xl relative transition-all duration-300 hover:border-[--textColor2] hover:bg-[--textColor1] dark:hover:bg-[#95bcbe] hover:text-[--textColor2] dark:hover:text-[--textColor1]"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
                            <MdOutlineShoppingCart />
                        </motion.div>
                    </motion.div>

                    {/* OUT BESTSELLER */}
                    <motion.div 
                        className="grid grid-cols-[repeat(3,1fr)] gap-x-[10px] w-full justify-center items-center"
                        variants={containerVariants}
                    >
                        {outBestSeller.map((item, index) => (
                            <motion.div 
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05 }}
                            >
                                <ProductItem id={item._id} imageCover={item.imageCover}/>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
                
                {/* Hero rightside */}
                <motion.div 
                    className="w-full sm:w-[48%] sm:h-[95%] md:h-[96%] lg:h-[96%] my-3 sm:absolute right-0 rounded-xl shadow-2xl shadow-[#0000009a] overflow-hidden"
                    variants={itemVariants}
                >
                    <AnimatePresence custom={1} initial={false}>
                        {heroProducts.map((product, index) => (
                            index === currentIndex && (
                                <motion.img
                                    key={product._id}
                                    src={product.imageCover}
                                    alt={`Slide ${index}`}
                                    custom={1}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.5 }
                                    }}
                                    className="absolute bottom-0 w-full h-1/2 sm:h-full rounded-xl"
                                />
                            )
                        ))}
                    </AnimatePresence>
                </motion.div>
            </motion.div>
        </motion.div>
    );
}