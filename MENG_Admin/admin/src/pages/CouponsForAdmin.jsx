import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

export default function CouponsForAdmin({ token }) {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ name: "", expirationDate: "", discountPercentage: "" });

    // Fetch all coupons
    const fetchCoupons = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendUrl}/api/v1/coupon`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCoupons(res.data.data || []);
        } catch (error) {
            console.error('Error fetching coupons: ',error);
            toast.error("Failed to fetch coupons");
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchCoupons(); }, [token]);

    // Handle form input
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    // Create or update coupon
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (editing) {
                await axios.put(`${backendUrl}/api/v1/coupon/${editing}`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Coupon updated");
            } else {
                await axios.post(`${backendUrl}/api/v1/coupon`, form, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Coupon created");
            }
            setForm({ name: "", expirationDate: "", discountPercentage: "" });
            setEditing(null);
            fetchCoupons();
        } catch (err) {
            toast.error(err.response?.data?.message || "Error saving coupon");
        }
    };

    // Edit coupon
    const handleEdit = coupon => {
        setForm({
            name: coupon.name,
            expirationDate: coupon.expirationDate?.slice(0, 10),
            discountPercentage: coupon.discountPercentage
        });
        setEditing(coupon._id);
    };

    // Delete coupon
    const handleDelete = async id => {
        if (!window.confirm("Delete this coupon?")) return;
        try {
            await axios.delete(`${backendUrl}/api/v1/coupon/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("Coupon deleted");
            fetchCoupons();
        } catch (error) {
            console.error('Error deleting coupon: ',error);
            toast.error("Failed to delete coupon");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#263D54] dark:text-white">Coupons Management</h2>
            {/* Coupon Form */}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-8">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Coupon Name"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[--color1] outline-none"
                />
                <input
                    name="expirationDate"
                    value={form.expirationDate}
                    onChange={handleChange}
                    required
                    type="date"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[--color1] outline-none"
                />
                <input
                    name="discountPercentage"
                    value={form.discountPercentage}
                    onChange={handleChange}
                    required
                    type="number"
                    min={1}
                    max={100}
                    placeholder="Discount %"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:border-[--color1] outline-none"
                />
                <button
                    type="submit"
                    className="px-6 py-2 bg-[--color1] text-white rounded-md hover:bg-[--color1Hover] transition"
                >
                    {editing ? "Update" : "Add"}
                </button>
                {editing && (
                    <button
                        type="button"
                        onClick={() => { setEditing(null); setForm({ name: "", expirationDate: "", discountPercentage: "" }); }}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                )}
            </form>
            {/* Coupons Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-[#263D54] text-white">
                            <th className="py-2 px-4 rounded-tl-lg">Name</th>
                            <th className="py-2 px-4">Expiration</th>
                            <th className="py-2 px-4">Discount %</th>
                            <th className="py-2 px-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#263D54] mx-auto"></div>
                                </td>
                            </tr>
                        ) : coupons.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-8 text-gray-400">No coupons found.</td>
                            </tr>
                        ) : (
                            coupons.map(coupon => (
                                <tr key={coupon._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                                    <td className="py-2 px-4 font-semibold">{coupon.name}</td>
                                    <td className="py-2 px-4">{coupon.expirationDate?.slice(0, 10)}</td>
                                    <td className="py-2 px-4">{coupon.discountPercentage}%</td>
                                    <td className="py-2 px-4 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(coupon)}
                                            className="px-4 py-1 rounded-full bg-[#2b5175] text-white hover:bg-blue-600 transition font-semibold shadow"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(coupon._id)}
                                            className="px-4 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition font-semibold shadow"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}