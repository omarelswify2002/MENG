import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";

export default function Cart() {
    const { 
        products, 
        getProductsData,
        currency, 
        cartItems, 
        updateCartItem, 
        removeFromCart,
        navigate,
        getUserCart
    } = useContext(ShopContext);
    
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const fetchCartData = async () => {
            await getUserCart();
            await getProductsData();
        };
        fetchCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getUserCart]);

    useEffect(() => {
        if (cartItems?.products && products.length > 0) {
            const enrichedCartData = cartItems.products.map(item => {
                console.log('Item:', item);

                console.log('item.Product Data:', item.product);
                
                return {
                    ...item,
                    productData: {
                        name: item.product.name,
                        image: item.product.imageCover,
                        price: item.product.price
                    }
                }
            });
            
            setCartData(enrichedCartData);
        } else {
            setCartData([]);
        }
    }, [cartItems, products]);

    const handleUpdateQuantity = async (productId, newQuantity , size) => {
        // Ensure productId is a string
        const id = typeof productId === 'object' ? productId._id : productId;
        if (newQuantity < 1) {
            await removeFromCart(id , size);
        } else {
            await updateCartItem(id, newQuantity , size);
        }
        await getUserCart();
    };

    const handleRemoveItem = async (productId , size) => {
        const id = typeof productId === 'object' ? productId._id : productId;
        await removeFromCart(id , size);
        await getUserCart();
    };
    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <div className="text-2xl mb-3">
                <Title text1={'YOUR'} text2={'CART'}/>
            </div>
            <div className="grid sm:grid-cols-[1fr_auto] gap-4 mb-6">    
                <div>
                    {cartData.length > 0 ? (
                        cartData.map((item, index) => (
                            <div 
                                key={index} 
                                className="py-4 mb-2 border border-[#0988FF] bg-white rounded-xl text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                            >
                                <div className="flex items-center ml-2 gap-6">
                                    <img 
                                        src={item.productData.image} 
                                        className="w-16 sm:w-28 h-24 rounded-xl border border-[#0988FF] " 
                                        alt={item.productData.name} 
                                    />
                                    <div>
                                        <p className="text-xs sm:text-lg font-medium">
                                            {item.productData.name}
                                        </p>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{item.productData.price} {currency}</p>
                                        </div>
                                        <div className="flex items-center gap-5 mt-2">
                                            <p>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <input 
                                    onChange={(e) => handleUpdateQuantity(
                                        item.product, 
                                        parseInt(e.target.value) || 0 , item.size
                                    )} 
                                    className="border max-w-10 sm:max-w-20 py-1 px-1 sm:px-2" 
                                    type="number" 
                                    min="1" 
                                    value={item.quantity} 
                                />
                                
                                <img 
                                    onClick={() => handleRemoveItem(item.product , item.size)} 
                                    className="w-4 mr-4 sm:w-5 cursor-pointer active:bg-gray-200" 
                                    src={assets.bin_icon} 
                                    alt="Remove item" 
                                />
                            </div>
                        ))
                    ) : (
                        <div className="py-8 text-center">
                            <p className="text-gray-500">Your cart is empty</p>
                        </div>
                    )}
                </div>
                
                {cartData.length > 0  && (
                    <div className="flex flex-col border border-[#0988FF] rounded-xl bg-white w-full">
                        <div className="w-full rounded-t-xl">
                            <CartTotal/>
                        </div>
                        
                        <div className="text-center">
                            <button 
                                onClick={() => navigate('./PlaceOrder')} 
                                className="transition-all duration-500 text-white bg-blue-500 hover:bg-blue-600 dark:hover:bg-[--textColor1] dark:hover:text-[--color1] dark:text-[--textColor1] dark:border-[--textColor1] my-8 px-8 py-3 text-sm font-medium active:bg-[#b2cde7] rounded-xl"
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};