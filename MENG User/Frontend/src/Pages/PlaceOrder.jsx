import { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContextProvider";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default function PlaceOrder() {
    const { 
        navigate, 
        backendUrl, 
        setCartItems, 
        token,
        getCartId,
        cartId,
        getUserCart 
    } = useContext(ShopContext);
    
    const [method, setMethod] = useState('cod');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        country: '',
        phone: '',
        address: ''
    });

    const routerNavigate = useNavigate();

    function onChangeHandler(e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value}));
    }

    async function onSubmitHandler(e) {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const currentCartId = cartId || getCartId();
            
            if (!currentCartId) {
                toast.error("Could not retrieve cart information");
                return;
            }

            const shippingAddress = {
                address: formData.address || formData.street,
                city: formData.city,
                state: formData.state,
                street: formData.street,
                country: formData.country,
                phone: formData.phone
            };

            const orderData = { shippingAddress };

            switch (method) {                
                case 'cod':
                    {
                        const response = await axios.post(
                            `${backendUrl}/api/v1/orders/${currentCartId}`, 
                            orderData, 
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        console.log('COD response:', response); 
                        if (response.data.status === "success") {
                            await getUserCart();
                            
                            const emptyCart = {
                                products: [],
                                totalPrice: 0,
                                totalPriceAfterDiscount: 0
                            };
                            setCartItems(emptyCart);
                            localStorage.setItem("cartItems", JSON.stringify(emptyCart));
                            
                            navigate('/orders');
                            toast.success('Order placed successfully!');
                        } else {
                            toast.error(response.data?.message || "Failed to place order");
                        }
                    }
                    break;
            
                case 'stripe':
                    {
                        const response = await axios.post(
                            `${backendUrl}/api/v1/orders/checkout-session/${currentCartId}`,
                            orderData,
                            { headers: { Authorization: `Bearer ${token}` } }
                        );
                        console.log('Stripe response:', response.data.session.url); 
                        if (response.data.status === "success") {
                            window.location.replace(response.data.session.url);
                        } else {
                            toast.error("Payment initialization failed");
                        }
                    }
                    break;

                default:
                    break;
            }
        } catch (error) {
            console.error('Order placement error:', error);
            toast.error(error.response?.data?.message || error.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleContinueShopping = () => {
        routerNavigate('/collections');
    };

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col lg:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] my-7">
            {/* Left Side - Delivery Information */}
            <div className="flex flex-col gap-4 w-full lg:max-w-[55%]">
                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                
                <input required onChange={onChangeHandler} name="street" value={formData.street} 
                    className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                    type="text" placeholder="Street"/>
                
                <input required onChange={onChangeHandler} name="address" value={formData.address} 
                    className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                    type="text" placeholder="Full Address"/>
                
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="city" value={formData.city} 
                        className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        type="text" placeholder="City"/>
                    <input required onChange={onChangeHandler} name="state" value={formData.state} 
                        className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        type="text" placeholder="State"/>
                </div>
                
                <div className="flex gap-3">
                    <input required onChange={onChangeHandler} name="country" value={formData.country} 
                        className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        type="text" placeholder="Country"/>
                    <input required onChange={onChangeHandler} name="phone" value={formData.phone} 
                        className="border border-gray-300 rounded py-2.5 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
                        type="text" placeholder="Phone"/>
                </div>
            </div>
            
            {/* Right Side - Order Summary and Payment */}
            <div className="w-full lg:max-w-[40%] mt-8 lg:mt-0">
                <CartTotal/>
                
                <div className="mt-8">
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    
                    {/* Payment Method Selection */}
                    <div className="flex flex-col gap-3 mt-4">
                        <div 
                            onClick={()=>setMethod('stripe')} 
                            className={`flex items-center gap-3 border p-3 cursor-pointer rounded-lg transition-all ${
                                method === 'stripe' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                            }`}
                        >
                            <div className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                                method === 'stripe' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                            }`}>
                                {method === 'stripe' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <img className="h-6" src={assets.stripe_logo} alt="Stripe" />
                        </div>
                        
                        <div 
                            onClick={()=>setMethod('cod')} 
                            className={`flex items-center gap-3 border p-3 cursor-pointer rounded-lg transition-all ${
                                method === 'cod' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-300'
                            }`}
                        >
                            <div className={`w-4 h-4 border rounded-full flex items-center justify-center ${
                                method === 'cod' ? 'bg-blue-500 border-blue-500' : 'border-gray-400'
                            }`}>
                                {method === 'cod' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                            </div>
                            <p className="text-gray-700 font-medium">CASH ON DELIVERY</p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        {/* Checkout Button */}
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full bg-[#263D54] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.01] shadow-md group relative overflow-hidden ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Processing...
                            </span>
                            ) : (
                            <>
                                CHECKOUT
                                <IoIosArrowForward className="inline-block text-lg ml-2 transition-all duration-300 transform group-hover:translate-x-6" />
                            </>
                            )}
                        </button>
                        
                        {/* Continue Shopping Button */}
                        <button
                            type="button"
                            onClick={handleContinueShopping}
                            className="w-full border border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.01] group relative overflow-hidden"
                        >
                            <IoIosArrowBack className="inline-block text-lg mr-2 transition-all duration-300 transform group-hover:-translate-x-6" />
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}