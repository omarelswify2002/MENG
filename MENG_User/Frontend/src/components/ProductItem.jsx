import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import StarRating from "../components/StarRating";

// eslint-disable-next-line react/prop-types
export default function ProductItem({ id, imageCover, name, price, rating, reviewCount }) {
    const { currency, favourites, toggleFavourite } = useContext(ShopContext);
    const [isProcessing, setIsProcessing] = useState(false);
    
    const isFavourite = Array.isArray(favourites) && favourites.includes(id);

    const handleFavouriteClick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isProcessing) return;
        
        setIsProcessing(true);
        console.log(`🖤 Clicking Favourite for Product ID: ${id}`);
        try {
            await toggleFavourite(id);
        } finally {
            setIsProcessing(false);
        }
    };
    return (
        <div className={price && `h-[365px] sm:h-[285px] md:h-[300px] lg:w-full flex flex-col gap-1 transition-all duration-300 bg-[#FFFFFF] 
        hover:bg-[#2b5175] dark:hover:bg-[#2b5175] text-gray-800 p-2 hover:text-white
        border-[--textColor2] hover:border-[--textColor1] rounded-lg border-solid border-[1px] dark:bg-slate-500`}>
        
            <Link className="  h-[73%] sm:h-[60%] md:h-[63%] md:w-full lg:h-[66%] overflow-hidden cursor-pointer transition-all duration-300 hover:rounded-lg hover:border-[1px] hover:border-solid hover:border-[--textColor1]" onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}>
                <div className={price && `relative group w-full h-full`}>
                    {price &&
                        <button 
                            onClick={handleFavouriteClick}
                            className="text-xl p-[5px] border border-gray-400 absolute top-2 right-2 z-10 bg-white rounded-full"
                            aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-red-500"></div>
                            ) : isFavourite ? (
                                <FaHeart className="text-red-500" />
                            ) : (
                                <FaRegHeart className="text-gray-400 hover:text-red-500" />
                            )}
                        </button>
                    }
                    <img className="w-full h-full transition-all ease-in-out duration-300 rounded-lg border-[1px] 
                    border-solid border-[--textColor2] hover:scale-110" src={imageCover} alt={name} />                
                </div>
            </Link>
            {price && (

                <div className="flex-1 flex flex-col">
                    {/* Top Row - Name & Price (Left) / Rating & Heart (Right) */}
                    <div className="flex flex-col mb-2">
                        <h3 
                        className="font-medium dark:text-white line-clamp-auto sm:line-clamp-2 leading-tight"
                        title={name}
                        >
                            {name}
                        </h3>
                        
                        <div className="flex justify-between">
                            <p className="text-lg font-medium dark:text-white">{price} {currency}</p>

                            <div className="flex items-center mt-1">
                                <StarRating rating={rating} />
                                <span className="text-xs ml-1 dark:text-white">({reviewCount})</span>
                            </div>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Link onClick={() => window.scrollTo(0, 0)} to={`/product/${id}`}
                        className="mt-auto w-full py-2 bg-black hover:bg-white dark:bg-white dark:hover:bg-black text-white hover:text-black border border-black dark:text-black dark:border-black dark:hover:text-white rounded flex items-center justify-center transition-colors duration-200"
                    >
                        Add to Cart
                        <FaShoppingCart className="ml-2" />
                    </Link>
                </div>
            )}
        </div>
    );
}