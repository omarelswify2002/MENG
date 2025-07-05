import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ShopContextProvider({ children }) {
    const [cartItems, setCartItems] = useState({
        products: [],
        totalPrice: 0,
        totalPriceAfterDiscount: 0
    });
    
    const navigate = useNavigate();
    const currency = 'EGP';
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const [favourites, setFavourites] = useState([]);
    const [zipcode, setZipcode] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDark, setIsDark] = useState(
        localStorage.getItem("theme") === "dark" || 
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    const [paginationResult, setPaginationResult] = useState(null);

    // Theme Effect
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    // Cart Functions
    const getCartCount = useCallback(() => {
        if (!cartItems?.products) return 0;
        return cartItems.products.reduce((total, item) => total + (item.quantity || 0), 0);
    }, [cartItems]);

    const getCartAmount = useCallback(() => {
        if (!cartItems?.products) return 0;
        return cartItems.products.reduce((total, item) => total + (item.price * (item.quantity || 0)), 0);
    }, [cartItems]);

    const addToCart = useCallback(async (productId , size) => {
        try {
            const response = await axios.post(`
                ${backendUrl}/api/v1/cart/add`,
                { productId , size },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Add to cart response:', response.data);
            
            if (response) {
                toast.success(response.data.message);
                const updatedCart = {
                    products: response.data.data.products || [],
                    totalPrice: response.data.data.totalPrice || 0,
                    totalPriceAfterDiscount: response.data.data.totalPriceAfterDiscount || 0
                };
                setCartItems(updatedCart);
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                toast.error(response.data?.message || 'Failed to add item to cart');
                return null;
            }
        } catch (error) {
            console.error('Error adding to cart:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Please Select Size');
            return null;
        }
    }, [token, backendUrl]);

    const removeFromCart = useCallback(async (productId , size) => {
        try {
            const response = await axios.delete(`
                ${backendUrl}/api/v1/cart/remove`,
                {
                    data: { productId , size },
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log('Removing from cart:', productId);
            console.log('Removing from cart response:', response.data.message);
            if (response) {
                toast.success(response.data.message);
                const updatedCart = {
                    products: response.data.data.products || [],
                    totalPrice: response.data.data.totalPrice || 0,
                    totalPriceAfterDiscount: response.data.data.totalPriceAfterDiscount || 0
                };
                setCartItems(updatedCart);
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                toast.error(response.data.message);
                return null;
            }
        } catch (error) {
            console.error('Error removing from cart:', error.response?.data || error.message);
            toast.error(error.response?.data?.message);
            return null;
        }
    }, [token, backendUrl]);

    const updateCartItem = useCallback(async (productId, quantity , size) => {
        try {
            const response = await axios.put(`
                ${backendUrl}/api/v1/cart/update`,
                { productId, quantity , size },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Update Cart Item Response:', response.data);
            console.log('Update Cart ID Response:', productId);
            if (response) {
                const updatedCart = {
                    products: response.data.data.products || [],
                    totalPrice: response.data.data.totalPrice || 0,
                    totalPriceAfterDiscount: response.data.data.totalPriceAfterDiscount || 0
                };
                setCartItems(updatedCart);
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                return updatedCart;
            } else {
                toast.error(response.data?.message || 'Failed to update cart item');
                return null;
            }
        } catch (error) {
            console.error('Error updating cart item:', error.response?.data || error.message);
            toast.error(error.response?.data?.message || 'Failed to update cart item');
            return null;
        }
    }, [token, backendUrl]);

    const getUserCart = useCallback(async () => {
        if (!token) {
            const storedCart = localStorage.getItem("cartItems");
            if (storedCart) {
                console.log('Stored Cart:', storedCart); // <-- Move log here
                setCartItems(JSON.parse(storedCart));
            }
            return;
        }

        try {
            const response = await axios.get(`${backendUrl}/api/v1/cart`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Get User Cart Response:', response.data);
            
            if (response) {
                const cartData = response.data.data;
                if (cartData && cartData.products) {
                    const updatedCart = {
                        _id: cartData._id || cartData.id,
                        products: cartData.products,
                        totalPrice: cartData.totalPrice || 0,
                        totalPriceAfterDiscount: cartData.totalPriceAfterDiscount || 0
                    };
                    setCartItems(updatedCart);
                    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                    return updatedCart;
                } else {
                    // Cart is empty
                    setCartItems({ products: [], totalPrice: 0, totalPriceAfterDiscount: 0 });
                    localStorage.setItem("cartItems", JSON.stringify({ products: [], totalPrice: 0, totalPriceAfterDiscount: 0 }));
                    return null;
                }
            }
        } catch (error) {
            console.error('Error getting cart:', error.response?.data || error.message);
        }
    }, [token, backendUrl]);

    const getCartId = useCallback(() => {
        if (!cartItems || !cartItems._id) return null;
        return cartItems._id;
    }, [cartItems]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            setCartItems(JSON.parse(storedCart)); // ✅ تحميل عربة التسوق من localStorage
        }
    }, []);
    
    async function toggleFavourite(productId) {
        if (!token) {
            toast.error("You need to be logged in to manage favourites");
            navigate('/Login');
            return;
        }

        if (!productId) {
            console.error("Product ID is missing!");
            toast.error("Something went wrong, please try again.");
            return;
        }

        console.log(`🔄 Toggling Favourite for Product ID: ${productId}`);

        try {
            const isCurrentlyFavourite = favourites.includes(productId);
            let response;

            if (isCurrentlyFavourite) {
                // استخدام DELETE لإزالة المنتج من المفضلة
                response = await axios.delete(
                    `${backendUrl}/api/v1/wishlist/${productId}`,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
            } else {
                // استخدام POST لإضافة المنتج للمفضلة
                response = await axios.post(
                    `${backendUrl}/api/v1/wishlist/${productId}`,
                    {},
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
            }

            if (response) {
                // بعد أي عملية ناجحة، نجلب أحدث بيانات المفضلة من السيرفر
                await getUserFavourites();
                toast.success(response.data.message || 
                    (isCurrentlyFavourite ? "Removed from favourites" : "Added to favourites"));
            } else {
                toast.error(response.data.message || "Failed to update favourites");
            }
        } catch (error) {
            console.error("Error Updating Favourite:", error.response?.data || error);
            toast.error(error.response?.data?.message || "Failed to update favourites.");
        }
    }

    async function getUserFavourites() {
        if (!token) {
            setFavourites([]);
            localStorage.removeItem("favourites");
            return;
        }

        try {
            const response = await axios.get(
                `${backendUrl}/api/v1/wishlist`, 
                { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                }
            );

            if (response) {
                let favouritesList = [];
                
                if (Array.isArray(response.data.data)) {
                    favouritesList = response.data.data.map(item => item._id);
                } else if (response.data.data?.products) {
                    favouritesList = response.data.data.products.map(p => p._id || p.id);
                } else if (response.data.data?.wishlist) {
                    favouritesList = response.data.data.wishlist;
                }

                console.log("Fetched Favourites IDs:", favouritesList);
                setFavourites(favouritesList);
                localStorage.setItem("favourites", JSON.stringify(favouritesList));
                return favouritesList;
            } else {
                throw new Error(response.data?.message || "Failed to fetch favourites");
            }
        } catch (error) {
            console.error("Error Fetching Favourites:", error.message);
            setFavourites([]);
            localStorage.removeItem("favourites");
            return [];
        }
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const fetchFavourites = async () => {
            if (token) {
                try {
                    // const signal = controller.signal;
                    const favourites = await getUserFavourites();
                    if (isMounted) {
                        console.log("Initial favourites load:", favourites);
                    }
                } catch (error) {
                    if (isMounted && error.name !== 'AbortError') {
                        console.error("Fetch error:", error);
                    }
                }
            } else {
                setFavourites([]);
            }
        };

        fetchFavourites();

        return () => {
            isMounted = false;
            controller.abort();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
//;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

    async function getProductsData(
        page = 1, 
        limit = 10, 
        fields = 'name price imageCover ratingsAverage ratingsQuantity', 
        keyword = '', 
        filters = {}, 
        sort = ''
    ) {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/products`, {
                params: {
                    page,
                    limit,
                    fields,
                    keyword: keyword || undefined,
                    sort: sort || undefined,
                    // يمكنك إضافة الفلاتر هنا إذا كان الخادم يتوقعها
                    ...filters
                }
            });
            
            console.log('response of getProductData>>>', response);
            
            const products = response.data.data.products || response.data.data;
            setProducts(products);

            setPaginationResult(response.data.paginationResult || response.data.data.paginationResult || null);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Network error');
        }
    }

    async function getBestSeller(limit = 4) {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/products`, {
                params: {
                    sort: '-sold', // ترتيب تنازلي حسب عدد المبيعات
                    limit,
                    fields: 'name,price,imageCover,images,category' // الحقول المطلوبة
                }
            });
            
            console.log('Best Seller API Response:', response.data);
            
            if(response) {
                const bestSellers = response.data.data.products || response.data.data;
                console.log('Best Sellers:', bestSellers);
                return bestSellers;
            } else {
                toast.error(response.data.message || 'Failed to fetch best sellers');
                return [];
            }
        } catch (error) {
            console.error('Error fetching best sellers:', {
                message: error.message,
                response: error.response?.data
            });
            toast.error('Failed to load best sellers');
            return [];
        }
    }

    //Hero Partـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
    async function getHeroProducts(limit = 3) {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/products`, {
                params: {
                    sort: '-sold,-ratingAverage', // ترتيب تنازلي حسب عدد المبيعات
                    limit,
                    fields: 'name,price,imageCover,images,category' // الحقول المطلوبة
                }
            });

            console.log('Hero Products API Response:', response.data);
            
            if(response) {
                const heroProducts = response.data.data.products || response.data.data;
                console.log('Hero Products:', heroProducts);
                return heroProducts;
            } else {
                toast.error(response.data.message || 'Failed to fetch hero products');
                return [];
            }
        } catch (error) {
            console.error('Error fetching hero products:', {
                message: error.message,
                response: error.response?.data
            });
            toast.error('Failed to load hero products');
            return [];
        }
    }

    // Add other API functions based on Postman collection
    async function getProductById(productId) {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/products/${productId}`)
            console.log('Product by ID response:', response.data.data);
            // Update to match new response format
            if(response){
                return response.data.data
            } else {
                toast.error(response.data.message)
                return null
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            return null
        }
    }


    async function getSimilarProductsById(productId) {
        try {
            const response = await axios.get(`${backendUrl}/api/v1/products/${productId}`, {
                params: {
                    fields: 'similarProducts.product.name,similarProducts.product._id,similarProducts.product.price,similarProducts.product.imageCover'
                }
            });
            
            console.log('Similar Products API Response:', response.data);
            
            if (response.data.data) {
                return response.data.data;
            } else {
                toast.error(response.data.message || 'Failed to fetch similar products');
                return null;
            }
        } catch (error) {
            console.error('Error fetching similar products:', {
                message: error.message,
                response: error.response?.data
            });
            toast.error('Failed to load similar products');
            return null;
        }
    }

    async function createOrder(cartId, shippingAddress) {
        try {
            const response = await axios.post(
                `${backendUrl}/api/v1/orders/${cartId}`, 
                { shippingAddress }, 
                { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                }
            )
            
            // Update to match new response format
            if(response){
                toast.success(response.data.message)
                return response.data.data
            } else {
                toast.error(response.data.message)
                return null
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            return null
        }
    }

    async function getUserProfile() {
        try {
            const response = await axios.get(
                `${backendUrl}/api/v1/users/me`, 
                { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                }
            )
            
            // Update to match new response format
            if(response){
                console.log('User profile response:', response.data.data);
                return response.data.data
            } else {
                toast.error(response.data.message)
                return null
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            return null
        }
    }

    async function updateUserProfile(userData) {
        try {
            const response = await axios.put(
                `${backendUrl}/api/v1/users/updateMe`, 
                userData, 
                { 
                    headers: { 
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}` 
                    } 
                }
            );
            
            console.log('Update Profile Response:', response.data);
            
            if (response.data) {
                toast.success(response.data.message || "Profile updated successfully");
                return response.data.data;
            } else {
                toast.error(response.data.message || "Failed to update profile");
                return null;
            }
        } catch (error) {
            console.error("Update Profile Error:", {
                message: error.message,
                response: error.response?.data
            });
            toast.error(error.response?.data?.message || error.message || "Failed to update profile");
            return null;
        }
    }
    
    //Profile Partـــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ
        // Fetch user profile function
        const fetchUserProfile = async () => {
            if (!token) {
                setUser(null);
                return;
            }
            
            setLoading(true);
            try {
                const response = await axios.get(
                    `${backendUrl}/api/v1/users/me`, 
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );
                
                console.log("Profile response:", response.data);
                if (response) {
                    setUser(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
                if (error.response?.status === 401) {
                    logout();
                }
            } finally {
                setLoading(false);
            }
        };
        
        const updateProfile = async (profileData) => {
            try {
                setLoading(true);
                const response = await axios.put(
                    `${backendUrl}/api/v1/users/updateMe`,
                    profileData,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}` 
                        } 
                    }
                );
                
                console.log("Update profile response:", response.data);

                if (response) {
                    setUser(response.data.data);
                    return { success: true };
                }
                return { success: false, message: response.data.message };
            } catch (error) {
                console.error("Error updating profile:", error);
                return { 
                    success: false, 
                    message: error.response?.data?.message || "Failed to update profile" 
                };
            } finally {
                setLoading(false);
            }
        };

        const submitRating = async (productId, rating, review = "ok") => {
            if (!token) {
                toast.error("You need to be logged in to submit a rating");
                return { success: false };
            }
            
            try {
                const response = await axios.post(
                    `${backendUrl}/api/v1/reviews`,
                    { 
                        product: productId, 
                        ratings: rating, // تغيير من ratings إلى rating إذا كان هذا ما يتوقعه API
                        review: review
                    },
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        } 
                    }
                );
                
                console.log('Rating response:', response.data);
                
                if (response) {
                    toast.success("Rating submitted successfully");
                    return { 
                        success: true, 
                        updatedRating: response.data.data.ratingsAverage,
                        reviewCount: response.data.data.ratingsQuantity
                    };
                } else {
                    toast.error(response.data.message || "Failed to submit rating");
                    return { success: false };
                }
            } catch (error) {
                console.error("Rating submission error:", {
                    message: error.message,
                    response: error.response?.data
                });
                toast.error(error.response?.data?.message || error.response.data.errors[0].msg);
                return { success: false };
            }
        };

        const logout = async () => {
            try {
                // 1. استدعاء API الخروج باستخدام GET method
                await axios.get(`${backendUrl}/api/v1/auth/logout`, {
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                });

                // 2. مسح البيانات المحلية
                localStorage.removeItem('token');
                setToken('');
                setUser(null);
                setCartItems({});
                navigate('/Login');
                toast.success('Logout successfully');
            } catch (error) {
                console.error('Error logging out:', error);
                toast.error('حدث خطأ أثناء محاولة تسجيل الخروج');

                // حتى لو فشل الطلب، نقوم بمسح البيانات المحلية
                localStorage.removeItem('token');
                setToken('');
                setUser(null);
                setCartItems({});
                navigate('/Login');
            }
        };

        useEffect(()=>{
            if (!token && localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'))
                // getUserCart(localStorage.getItem('token'))
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

        useEffect(() => {
            const loadCart = async () => {
                const storedCart = localStorage.getItem("cartItems");
                if (storedCart) {
                    setCartItems(JSON.parse(storedCart));
                }
                
                if (token) {
                    await getUserCart();
                }
            };
            
            loadCart();
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [token]);

    async function searchProductsWithLLM(query) {
        try {
            if (!query || query.trim() === '') {
                return [];
            }
            
            const response = await axios.get(`${backendUrl}/api/v1/llm-search`, {
                params: { q: query }
            });
            
            console.log('LLM Search response:', response.data);
            
            if (response) {
                // Normalize the data to ensure consistent structure
                const normalizedProducts = response.data.results.map(product => ({
                    _id: product._id || product.id,
                    id: product._id || product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image || [product.imageCover],
                    imageCover: product.imageCover,
                    ratingsAverage: product.ratingsAverage || 0,
                    ratingsQuantity: product.ratingsQuantity || 0,
                    // Add other fields as needed
                }));
                
                return normalizedProducts;
            } else {
                toast.error("No results found");
                return [];
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error searching products");
            return [];
        }
    }

    const value = {
        products, currency, delivery_fee,
        addToCart, cartItems, setCartItems, getCartCount,
        updateCartItem, getCartAmount, getProductsData, navigate, backendUrl, setToken, token,
        toggleFavourite, getUserFavourites, favourites, zipcode, setZipcode,
        user, setUser, loading, setLoading, fetchUserProfile, updateProfile, logout,
        isDark, setIsDark, submitRating,
        getProductById, createOrder, getUserProfile, updateUserProfile, getBestSeller
        , getHeroProducts , getSimilarProductsById, paginationResult , getUserCart,removeFromCart
        ,getCartId, cartId: cartItems?._id,
        searchProductsWithLLM, setProducts
    }
    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    )
}
