import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";
import { toast } from "react-toastify";
import RelatedProducts from "../components/RelatedProducts";
import StarRating from "../components/StarRating";
import { graduations } from "../graduation_project/graduations";
import { CheckCircleIcon, TruckIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

export default function Product() {
    const { productId } = useParams();
    const { currency, addToCart, submitRating, getProductById, favourites, toggleFavourite } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [sizes, setSizes] = useState('');
    const [userRating, setUserRating] = useState(0);
    const [isSubmittingRating, setIsSubmittingRating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('description');

    async function fetchProductData() {
        setIsLoading(true);
        setError(null);
        try {
            const product = await getProductById(productId);
            if (product) {
                setProductData(product);
                const allImages = [product.imageCover, ...(product.images || [])].filter(Boolean);
                setImage(allImages[0]);
            } else {
                setError('Product not found');
                toast.error('Product not found');
            }
        } catch (err) {
            setError('Failed to load product');
            console.error("Error fetching product:", err);
            toast.error('Failed to load product details');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchProductData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [productId]);

    const handleRatingSubmit = async () => {
        if (userRating > 0) {
            setIsSubmittingRating(true);
            try {
                const result = await submitRating(productId, userRating);
                if (result) {
                    await fetchProductData();
                    setUserRating(0);
                    toast.success("Thank you for your rating!");
                }
            } catch (error) {
                console.error("Error submitting rating:", error);
                toast.error(error.response?.data?.message || "Failed to submit rating");
            } finally {
                setIsSubmittingRating(false);
            }
        } else {
            toast.error("Please select a rating");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[--color1]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 text-lg mb-4">{error}</p>
                <button 
                    onClick={fetchProductData}
                    className="mt-4 px-6 py-2 bg-[--color1] text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!productData) {
        return null;
    }

    const allImages = [productData.imageCover, ...(productData.images || [])].filter(Boolean);

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            {/* Product Main Section */}
            <div className="grid gap-8 md:gap-12 grid-cols-1 lg:grid-cols-[1.8fr_1.2fr]">
                {/* Product Images */}
                <div className="flex flex-col-reverse gap-4 md:flex-row">
                    {allImages.length > 1 && (
                        <div className="flex md:flex-col gap-3 pb-2 md:pb-0 md:h-[500px]">
                            {allImages.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`relative flex-shrink-0 w-20 h-20 md:w-40 md:h-36 rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
                                        image === item 
                                            ? 'ring-2 ring-[--color1] shadow-md' 
                                            : 'opacity-80 hover:opacity-100 hover:ring-1 hover:ring-gray-300'
                                    }`}
                                    onClick={() => setImage(item)}
                                >
                                    <img 
                                        src={item} 
                                        className="w-full h-full object-cover"
                                        alt={`Product view ${index + 1}`}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="relative w-full sm:w-[90%] sm:h-[55%] dark:bg-gray-800 shadow-sm">
                        <img 
                            src={image} 
                            className="w-full h-full rounded-xl "
                            alt={productData.name}
                            loading="eager"
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{productData.name}</h1>
                        
                        <div className="flex items-center gap-2 mt-3">
                            <StarRating 
                                rating={productData.ratingsAverage || 0} 
                                starSize="text-lg"
                            />
                            <span className="text-gray-600 dark:text-gray-400 text-sm">
                                ({productData.ratingsQuantity || 0} reviews)
                            </span>
                        </div>
                    </div>

                    <div className="text-2xl font-bold text-[--color1] dark:text-white">
                        {productData.price} {currency}
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {productData.description}
                    </p>
                    
                    {productData.sizes?.length > 0 && (
                        <div className="space-y-4 pt-2">
                            <h3 className="text-lg font-semibold">Select Size</h3>
                            <div className="flex flex-wrap gap-3">
                                {productData.sizes.map((size, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => setSizes(size)} 
                                        className={`border py-2 px-4 bg-[#263D54] text-white dark:text-[#263D54] dark:bg-white border-[--color1] hover:bg-white hover:text-black dark:hover:bg-[#263D54] dark:hover:text-white ${size === sizes ? '!bg-white !text-[#263D54] dark:!bg-[#263D54] dark:!text-white' : ''} rounded-3xl`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                
                    {/* Add to Cart Button with Favorites */}
                    <div className="flex gap-4 mt-6">
                        {/* Add to Cart Button */}
                        <button 
                            onClick={() => addToCart(productData._id, sizes || productData.sizes)} 
                            className="flex-1 flex items-center justify-center gap-2 bg-[#263D54] text-white dark:text-[#263D54] dark:bg-white hover:bg-opacity-90 py-3 px-6 rounded-full font-medium transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            ADD TO CART
                        </button>

                        {/* Favorite Button */}
                        <button
                            onClick={() => toggleFavourite(productData._id)}
                            className="flex items-center justify-center p-3 border border-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label={favourites.includes(productData._id) ? "Remove from favorites" : "Add to favorites"}
                        >
                            {favourites.includes(productData._id) ? (
                            <FaHeart className="text-red-500 text-xl" />
                            ) : (
                            <FaRegHeart className="text-gray-500 hover:text-red-500 text-xl" />
                            )}
                        </button>
                    </div>
                    
                    {/* Rating Section */}
                    <div className="mt-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-semibold mb-4">Rate this product</h3>
                        <div className="flex items-center gap-4 mb-5">
                            <span className="text-gray-700 dark:text-gray-300">Your Rating:</span>
                            <StarRating 
                                rating={userRating} 
                                interactive={true}
                                onRatingChange={setUserRating}
                                starSize="text-2xl"
                            />
                        </div>
                        <button 
                            onClick={handleRatingSubmit}
                            disabled={isSubmittingRating || userRating === 0}
                            className={`px-6 py-2 rounded-full font-medium transition ${
                                isSubmittingRating || userRating === 0
                                    ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                                    : 'bg-[--color1] text-white hover:bg-opacity-90'
                            }`}
                        >
                            {isSubmittingRating ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Submitting...
                                </span>
                            ) : 'Submit Review'}
                        </button>
                    </div>
                    
                    {/* Product Features */}
                    <div className="pt-4">
                        <div className="space-y-3 text-gray-600 dark:text-gray-400">
                            <p className="flex items-center gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>100% Original Product</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <TruckIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />
                                <span>Cash on delivery available</span>
                            </p>
                            <p className="flex items-center gap-3">
                                <ArrowPathIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />
                                <span>Easy 7-day returns & exchanges</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Banner */}
            {graduations.middle_page_ID1 && (
                <div className="my-12 rounded-xl overflow-hidden shadow-lg">
                    <img 
                        src={graduations.middle_page_ID1} 
                        alt="Special offer" 
                        className="w-full h-auto object-cover"
                        loading="lazy"
                    />
                </div>
            )}

            {/* Description and Reviews Tabs */}
            <div className="mt-16 border-b border-gray-200 dark:border-gray-700">
                <nav className="flex -mb-px">
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'description'
                                ? 'border-[--color1] text-[--color1] dark:text-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`py-4 px-1 border-b-2 font-medium text-sm ${
                            activeTab === 'reviews'
                                ? 'border-[--color1] text-[--color1] dark:text-white'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                        Reviews ({productData.ratingsQuantity || 0})
                    </button>
                </nav>
            </div>

            <div className="py-8">
                {activeTab === 'description' ? (
                    <div className="prose max-w-none text-gray-700 dark:text-white">
                        <p>{productData.description}</p>
                        {/* Add more detailed description content here if available */}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Reviews content would go here */}
                        { productData.ratingsQuantity > 0 ? 
                            <p className="text-gray-600 dark:text-white">The number of reviews is {productData.ratingsQuantity} ⭐👍</p>
                            :
                            <p className="text-gray-600 dark:text-white">No reviews yet. Be the first to review!</p>
                        }    
                        </div>
                )}
            </div>
            
            {/* Related Products */}
            {productData.similarProducts && productData.similarProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8">You may also like</h2>
                    <RelatedProducts 
                        products={productData.similarProducts.map(item => item.product)}
                        currentProductId={productData._id}
                    />
                </div>
            )}
        </div>
    );
}