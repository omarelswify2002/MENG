import { useContext, useEffect, useState , useMemo } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import { Link } from "react-router-dom";

export default function Favourites() {
    const { favourites, products, getUserFavourites } = useContext(ShopContext);
    const [isLoading, setIsLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);
    
    useEffect(() => {
        const controller = new AbortController();
        let isMounted = true;

        const fetchData = async () => {
            if (!initialLoad) return;
            
            try {
                setIsLoading(true);
                await getUserFavourites();
                if (isMounted) {
                    setInitialLoad(false);
                    setIsLoading(false);
                }
            } catch (error) {
                if (isMounted && error.name !== 'AbortError') {
                    setIsLoading(false);
                }
            }
        };
        
        fetchData();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [getUserFavourites, initialLoad]);

    const favouriteProducts = useMemo(() => {
    // إذا كانت favourites تحتوي على كائنات كاملة، نستخدمها مباشرة
    if (Array.isArray(favourites) && favourites.length > 0 && favourites[0]._id) {
        return favourites;
    }
    
    // إذا كانت تحتوي على IDs فقط، نستخدم التصفية الأصلية
    return products.filter(product => 
        Array.isArray(favourites) && favourites.includes(product._id)
    );
    }, [products, favourites]);

    if (isLoading) {
        return (
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] min-h-screen">
            <div className="text-2xl mb-3">
                <Title text1={"YOUR"} text2={"FAVOURITES"} />
            </div>
            
            <div className="p-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                {favouriteProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {favouriteProducts.map(product => (
                            <ProductItem 
                                key={product._id} 
                                id={product._id} 
                                imageCover={product.imageCover} 
                                name={product.name} 
                                price={product.price}
                                rating={product.rating}
                                reviewCount={product.reviewCount}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center my-20">
                        <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
                        <Link 
                            to="/Collections" 
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                        >
                            Discover Products
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}