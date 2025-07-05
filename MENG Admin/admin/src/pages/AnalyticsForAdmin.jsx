import { useState, useEffect } from "react";
import axios from "axios";
import { FiTrendingUp, FiShoppingCart, FiUsers, FiDollarSign } from "react-icons/fi";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { backendUrl, currency } from "../App";


export default function AnalyticsForAdmin({ token }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                // Fetch all orders
                const ordersRes = await axios.get(`${backendUrl}/api/v1/orders`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const orders = Array.isArray(ordersRes.data.data) ? ordersRes.data.data : [];

                // Fetch all users
                const usersRes = await axios.get(`${backendUrl}/api/v1/users`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const users = Array.isArray(usersRes.data.data) ? usersRes.data.data : [];

                // Calculate stats
                const totalSales = orders.reduce((sum, order) => sum + (order.totalOrderPrice || 0), 0);
                const totalOrders = orders.length;
                const totalUsers = users.length;

                // Sales this month
                const now = new Date();
                const thisMonth = now.getMonth();
                const thisYear = now.getFullYear();
                const salesThisMonth = orders
                    .filter(order => {
                        const d = new Date(order.createdAt);
                        return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
                    })
                    .reduce((sum, order) => sum + (order.totalOrderPrice || 0), 0);

                setStats({
                    totalSales,
                    totalOrders,
                    totalUsers,
                    salesThisMonth,
                    orders,
                    users
                });
            } catch (error) {
                console.error("Error fetching data:", error);
                setStats(null);
            }
            setLoading(false);
        }
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [backendUrl, token]);

    // Helper to get sales per month
    function getMonthlySales(orders) {
        const months = Array.from({ length: 12 }, (_, i) => ({
            name: new Date(0, i).toLocaleString('default', { month: 'short' }),
            sales: 0
        }));
        orders.forEach(order => {
            const d = new Date(order.createdAt);
            months[d.getMonth()].sales += order.totalOrderPrice || 0;
        });
        return months;
    }

    // Helper to get user roles distribution
    function getUserRoles(users) {
        const roles = {};
        users.forEach(u => { roles[u.role] = (roles[u.role] || 0) + 1; });
        return Object.entries(roles).map(([role, value]) => ({ name: role, value }));
    }

    // Helper: Order status distribution (Delivered, Paid, Delivered & Paid, Pending)
    function getOrderDeliveryPaymentStats(orders) {
        let delivered = 0, paid = 0, deliveredAndPaid = 0, pending = 0;
        orders.forEach(order => {
            const isDelivered = order.isDelivered;
            const isPaid = order.isPaid;
            if (isDelivered && isPaid) deliveredAndPaid++;
            else if (isDelivered) delivered++;
            else if (isPaid) paid++;
            else pending++;
        });
        return [
            { name: "Delivered & Paid", value: deliveredAndPaid },
            { name: "Delivered Only", value: delivered },
            { name: "Paid Only", value: paid },
            { name: "Pending", value: pending }
        ];
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#263D54] dark:text-white">Analytics & Performance</h2>
            {loading ? (
                <div className="flex justify-center items-center h-32">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#263D54]"></div>
                </div>
            ) : stats ? (
                <>
                    {/* Existing stats cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-slate-700 rounded-lg shadow">
                            <FiDollarSign className="text-3xl text-blue-600" />
                            <div>
                                <div className="text-lg font-bold">{stats.totalSales} {currency}</div>
                                <div className="text-gray-600 dark:text-gray-300">Total Sales</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-slate-700 rounded-lg shadow">
                            <FiShoppingCart className="text-3xl text-green-600" />
                            <div>
                                <div className="text-lg font-bold">{stats.totalOrders}</div>
                                <div className="text-gray-600 dark:text-gray-300">Total Orders</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-yellow-50 dark:bg-slate-700 rounded-lg shadow">
                            <FiUsers className="text-3xl text-yellow-600" />
                            <div>
                                <div className="text-lg font-bold">{stats.totalUsers}</div>
                                <div className="text-gray-600 dark:text-gray-300">Total Customers</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-purple-50 dark:bg-slate-700 rounded-lg shadow">
                            <FiTrendingUp className="text-3xl text-purple-600" />
                            <div>
                                <div className="text-lg font-bold">{stats.salesThisMonth} {currency}</div>
                                <div className="text-gray-600 dark:text-gray-300">Sales This Month</div>
                            </div>
                        </div>
                    </div>
                    {/* Modern Diagrams */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Sales per Month Bar Chart */}
                        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow">
                            <h3 className="font-semibold mb-2 text-[#263D54] dark:text-white">Sales Per Month</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={getMonthlySales(stats.orders || [])}>
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="sales" fill="#6366f1" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        {/* User Roles Pie Chart */}
                        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow">
                            <h3 className="font-semibold mb-2 text-[#263D54] dark:text-white">User Roles</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={getUserRoles(stats.users || [])}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    >
                                        {getUserRoles(stats.users || []).map((entry, idx) => (
                                            <Cell key={`cell-${idx}`} fill={["#6366f1", "#f59e42", "#10b981", "#ef4444"][idx % 4]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    {/* New Diagram: Order Delivery & Payment Status */}
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-4 shadow col-span-2">
                        <h3 className="font-semibold mb-2 text-[#263D54] dark:text-white">Order Delivery & Payment Status</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={getOrderDeliveryPaymentStats(stats.orders || [])}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {getOrderDeliveryPaymentStats(stats.orders || []).map((entry, idx) => (
                                        <Cell key={`cell-status-${idx}`} fill={["#10b981", "#6366f1", "#f59e42", "#ef4444"][idx % 4]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-400">No analytics data available.</div>
            )}
        </div>
    );
}