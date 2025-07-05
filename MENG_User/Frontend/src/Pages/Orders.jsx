import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContextProvider"
import Title from "../components/Title"
import axios from "axios"
import { toast } from "react-toastify"

export default function Orders() {
    const { backendUrl, token, currency } = useContext(ShopContext)
    const [orders, setOrders] = useState([])

    async function fetchOrders() {
        try {
            const response = await axios.get(
                `${backendUrl}/api/v1/orders`, 
                { 
                    headers: { 
                        Authorization: `Bearer ${token}` 
                    } 
                }
            )
            console.log('Fetch Orders Response:', response.data);
            console.log('Fetch Orders Response image:', response.data.data[0].products[0].product.imageCover);
            
            if (response.data && response.data.data) {
                setOrders(response.data.data)
            } else {
                toast.error("No orders found")
            }
        } catch (error) {
            console.error("Error fetching orders:", error)
            toast.error(error.response?.data?.message || "Failed to fetch orders")
        }
    }

    useEffect(() => {
        if (!token) {
            return;
        }
        fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, backendUrl])

    const getOrderStatus = (order) => {
        if (order.isDelivered) return "Delivered"
        if (order.isPaid) return "Shipped"
        return "Processing"
    }

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-green-500"
            case "Shipped": return "bg-blue-500"
            default: return "bg-yellow-500"
        }
    }

    return (
        <div className="px-4 pb-4 sm:px-[5vw] sm:pb-[5vh] md:px-[7vw] lg:px-[9vw]">
            <div className="text-2xl mb-8">
                <Title text1={'MY'} text2={'ORDERS'} />
            </div>
            
            {orders.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-lg">You have no orders yet</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="border rounded-lg shadow-sm overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex justify-between items-center border-b">
                                <div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Order #</span>
                                    <span className="font-medium ml-2">{order._id.substring(0, 8)}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Date: </span>
                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>
                            
                            {/* Order Products */}
                            <div className="p-4">
                                {order.products.map((product, index) => (
                                    <div key={index} className="flex py-4 border-b last:border-b-0">
                                        {product.product ? (
                                            <>
                                                <img 
                                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded" 
                                                    src={product.product.imageCover} 
                                                    alt={product.product.name} 
                                                />
                                                <div className="ml-4 flex-1">
                                                    <h3 className="font-medium text-sm sm:text-base">{product.product.name}</h3>
                                                    <div className="flex flex-wrap gap-3 mt-1 text-sm">
                                                        <p>Price: {product.price} {currency}</p>
                                                        <p>Qty: {product.quantity}</p>
                                                        {product.size && (
                                                            <p>Size: {product.size}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <img 
                                                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded opacity-50" 
                                                    src="/default-product.png"
                                                    alt="Deleted Product" 
                                                />
                                                <div>
                                                    <h3 className="font-medium text-sm sm:text-base text-red-500">This product was deleted by admin</h3>
                                                    <div className="flex flex-wrap gap-3 mt-1 text-sm text-gray-400">
                                                        <p>Price: {product.price} {currency}</p>
                                                        <p>Qty: {product.quantity}</p>
                                                        {product.size && (
                                                            <p>Size: {product.size}</p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Order Footer */}
                            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 flex flex-col sm:flex-row justify-between items-center">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <span className={`min-w-2 h-2 rounded-full ${getStatusColor(getOrderStatus(order))} mr-2`}></span>
                                    <span className="text-sm capitalize">{getOrderStatus(order)}</span>
                                </div>
                                
                                <div className="text-right">
                                    <div className="text-sm mb-1">
                                        <span className="text-gray-500 dark:text-gray-400">Total: </span>
                                        <span className="font-medium">{order.totalOrderPrice} {currency}</span>
                                    </div>
                                    <div className="text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Payment: </span>
                                        <span className="capitalize">{order.paymentMethodType}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}