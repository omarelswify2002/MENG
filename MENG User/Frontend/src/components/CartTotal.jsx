import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import Title from "./Title";
import axios from "axios";
import { toast } from "react-toastify";

export default function CartTotal() {
    const { 
        currency, 
        delivery_fee, 
        getCartAmount, 
        token,
        backendUrl,
    } = useContext(ShopContext);
    
    const [coupon, setCoupon] = useState('');
    const [isApplying, setIsApplying] = useState(false);
    const [discountData, setDiscountData] = useState(null);

    const applyCoupon = async () => {
        if (!coupon.trim()) {
            toast.error("Please enter a coupon code");
            return;
        }

        setIsApplying(true);
        try {
            const response = await axios.post(`
                ${backendUrl}/api/v1/cart/apply-coupon`,
                { coupon },
                { 
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            
            console.log("Coupon response:", response);
            
            if (response) {
                setDiscountData(response.data.data);
                toast.success("Coupon applied successfully!");
            } else {
                toast.error(response.data.message || "Failed to apply coupon");
            }
        } catch (error) {
            console.error("Coupon error:", error);
            toast.error(error.response?.data?.message || "Failed to apply coupon");
        } finally {
            setIsApplying(false);
        }
    };

    const calculateTotal = () => {
        const subtotal = getCartAmount();
        const shipping = delivery_fee;
        
        // If coupon is applied, use the server-calculated values
        if (discountData) {
            return {
                subtotal,
                shipping,
                totalBeforeDiscount: discountData.totalPrice,
                discountedTotal: discountData.totalPriceAfterDiscount,
                discountAmount: discountData.totalPrice - discountData.totalPriceAfterDiscount,
                discountPercentage: ((discountData.totalPrice - discountData.totalPriceAfterDiscount) / discountData.totalPrice * 100).toFixed(2)
            };
        }
        
        // Otherwise calculate normally without discount
        const totalBeforeDiscount = subtotal + shipping;
        
        return {
            subtotal,
            shipping,
            totalBeforeDiscount,
            discountedTotal: totalBeforeDiscount,
            discountAmount: 0,
            discountPercentage: 0
        };
    };

    const totals = calculateTotal();

    return (
        <div className="w-full bg-white p-6 rounded-t-xl border border-[#0988FF] shadow-sm">
            <div className="text-2xl mb-6">
                <Title text1={'Order'} text2={'Summary'}/>
            </div>
            
            {/* Coupon Section */}
            <div className="mb-6">
                <p className="font-medium text-gray-700 mb-2">Have a coupon?</p>
                <div className="flex">
                    <input
                        type="text"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        placeholder="Enter your discount code"
                        className="flex-1 border border-[#0988FF] rounded-l-3xl px-3 py-2 text-sm"
                    />
                    <button
                        type="button"
                        onClick={applyCoupon}
                        disabled={isApplying}
                        className="bg-blue-500 hover:bg-blue-600 duration-500 text-white px-4 py-2 rounded-r-3xl text-sm font-medium transition-colors"
                    >
                        {isApplying ? 'Applying...' : 'Apply'}
                    </button>
                </div>
            </div>
            
            {/* Order Summary */}
            <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                    <p className="text-gray-600">Sub total ({getCartAmount() === 0 ? 0 : Math.floor(getCartAmount()/100)} items)</p>
                    <p className="font-medium">{totals.subtotal.toFixed(2)} {currency}</p>
                </div>
                
                <div className="flex justify-between">
                    <p className="text-gray-600">Shipping fee</p>
                    <p className="font-medium">{totals.shipping === 0 ? 'FREE' : `${totals.shipping.toFixed(2)} ${currency}`}</p>
                </div>
                
                {discountData && (
                    <>
                        <div className="flex justify-between text-green-600">
                            <p>Discount ({totals.discountPercentage}%)</p>
                            <p>-{totals.discountAmount.toFixed(2)} {currency}</p>
                        </div>
                        <div className="flex justify-between text-gray-400 text-xs">
                            <p>Before discount:</p>
                            <p className="line-through">{totals.totalBeforeDiscount.toFixed(2)} {currency}</p>
                        </div>
                    </>
                )}
                
                <hr className="my-2 border-gray-200" />
                
                <div className="flex justify-between font-bold text-lg">
                    <p>Grand Total</p>
                    <p>{totals.discountedTotal.toFixed(2)} {currency}</p>
                </div>
            </div>
        </div>
    );
}