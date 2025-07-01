import { useEffect, useState} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiDollarSign, FiCalendar, FiMapPin, FiUser, FiRefreshCw } from "react-icons/fi";
import {backendUrl, currency} from '../App'

export default function Orders({ token }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(null);

    useEffect(() => {
        fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    async function fetchOrders() {
        try {
            const response = await axios.get(
                `${backendUrl}/api/v1/orders`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Fetch Admin Orders Response:', response.data.data[0].products[0].size);
            setOrders(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    }

    const getStatusColor = (status) => {
        return status ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
    };

    const getStatusIcon = (status) => {
        return status ? <FiCheckCircle className="inline mr-1" /> : <FiClock className="inline mr-1" />;
    };

    const updateOrderStatus = async (orderId, type) => {
        setUpdating(`${orderId}-${type}`);
        try {
            const endpoint = type === 'pay' 
                ? `${backendUrl}/api/v1/orders/${orderId}/pay`
                : `${backendUrl}/api/v1/orders/${orderId}/deliver`;
            
            await axios.put(
                endpoint,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Update Order Status Response:', endpoint);
            
            toast.success(`Order marked as ${type === 'pay' ? 'paid' : 'delivered'}`);
            fetchOrders(); // Refresh orders list
        } catch (error) {
            toast.error(error.response?.data?.message || `Failed to update order status`);
        } finally {
            setUpdating(null);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-8">
                <FiPackage className="text-3xl text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
                <button 
                    onClick={fetchOrders}
                    className="ml-auto flex items-center text-blue-600 hover:text-blue-800"
                >
                    <FiRefreshCw className="mr-1" /> Refresh
                </button>
            </div>

            {orders.length > 0 ? (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                            <div className="p-6">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                                    <div className="flex items-center mb-4 md:mb-0">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <FiPackage className="text-blue-600 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">Order #{order._id.substring(18)}</h3>
                                            <p className="text-sm text-gray-500">
                                                <FiCalendar className="inline mr-1" />
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-3">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.isDelivered)}`}>
                                            {getStatusIcon(order.isDelivered)}
                                            {order.isDelivered ? 'Delivered' : 'Pending Delivery'}
                                        </span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.isPaid)}`}>
                                            <FiDollarSign className="inline mr-1" />
                                            {order.isPaid ? 'Paid' : 'Pending Payment'}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="flex items-center text-sm font-medium text-gray-500 mb-2">
                                            <FiUser className="mr-2" /> Customer Information
                                        </h4>
                                        <p className="text-gray-800">{order.user.name}</p>
                                        <p className="text-gray-600">{order.user.email}</p>
                                        <p className="text-gray-600">{order.user.phone}</p>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <h4 className="flex items-center text-sm font-medium text-gray-500 mb-2">
                                            <FiMapPin className="mr-2" /> Shipping Address
                                        </h4>
                                        <p className="text-gray-800">
                                            {order.shippingAddress.address}, {order.shippingAddress.city}
                                        </p>
                                        <p className="text-gray-600">
                                            {order.shippingAddress.state}, {order.shippingAddress.country}
                                        </p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3">Products</h4>
                                    <div className="space-y-4">
                                        {order.products.map((item) => (
                                            <div key={item._id} className="flex items-start border-b pb-4">
                                                {item.product?.imageCover && (
                                                    <img 
                                                        src={item.product.imageCover} 
                                                        alt={item.product.name} 
                                                        className="w-16 h-16 object-cover rounded-md mr-4"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <h5 className="font-medium text-gray-800">
                                                        {item.product?.name || 'Unknown Product'}
                                                    </h5>
                                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                                        <span className="mr-3">Qty: {item.quantity}</span>
                                                        {item.size && (
                                                            <span>Size: {item.size}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-lg font-semibold text-blue-600">
                                                    {item.price} {currency}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t gap-4">
                                    <div className="text-sm text-gray-500">
                                        Payment Method: {order.paymentMethodType || 'Not specified'}
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                        {!order.isPaid && (
                                            <button
                                                onClick={() => updateOrderStatus(order._id, 'pay')}
                                                disabled={updating === `${order._id}-pay`}
                                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 flex items-center justify-center"
                                            >
                                                {updating === `${order._id}-pay` ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Updating...
                                                    </>
                                                ) : (
                                                    'Mark as Paid'
                                                )}
                                            </button>
                                        )}
                                        {!order.isDelivered && (
                                            <button
                                                onClick={() => updateOrderStatus(order._id, 'deliver')}
                                                disabled={updating === `${order._id}-deliver`}
                                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300 flex items-center justify-center"
                                            >
                                                {updating === `${order._id}-deliver` ? (
                                                    <>
                                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Updating...
                                                    </>
                                                ) : (
                                                    'Mark as Delivered'
                                                )}
                                            </button>
                                        )}
                                    </div>
                                    <div className="text-xl font-bold text-gray-800">
                                        Total: {order.totalOrderPrice} {currency}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                    <FiPackage className="mx-auto text-5xl text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No Orders Found</h3>
                    <p className="text-gray-500">You haven't placed any orders yet</p>
                </div>
            )}
        </div>
    );
}