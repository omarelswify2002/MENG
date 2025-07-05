import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

export default function UsersForAdmin({ token }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch all users
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${backendUrl}/api/v1/users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(res.data.data || []);
        } catch (error) {
            console.error('Error fetching users: ',error);
            toast.error("Failed to fetch users");
        }
        setLoading(false);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { fetchUsers(); }, [token]);

    // Block/Unblock user
    const handleToggleActive = async (id) => {
        console.log(id);
        try {
            await axios.patch(`${backendUrl}/api/v1/users/toggleActive/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success("User status updated");
            fetchUsers();
        } catch (error) {
            console.error('Error toggling user active status: ',error);
            toast.error("Failed to update user status");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-[#263D54] dark:text-white">Users Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-[#263D54] text-white">
                            <th className="py-2 px-4 rounded-tl-lg">Name</th>
                            <th className="py-2 px-4">Email</th>
                            <th className="py-2 px-4">Role</th>
                            <th className="py-2 px-4">Status</th>
                            <th className="py-2 px-4 rounded-tr-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#263D54] mx-auto"></div>
                                </td>
                            </tr>
                        ) : users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-8 text-gray-400">No users found.</td>
                            </tr>
                        ) : (
                            users.map(user => (
                                <tr key={user._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                                    <td className="py-2 px-4 font-semibold">{user.name}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{user.role}</td>
                                    <td className="py-2 px-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {user.active ? "Active" : "Blocked"}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleToggleActive(user._id)}
                                            className={`px-4 py-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition font-semibold shadow
                                                ${user.active
                                                    ? 'bg-red-500 text-white hover:bg-red-600'
                                                    : 'bg-green-500 text-white hover:bg-green-600'
                                                }`}
                                        >
                                            {user.active ? "Block" : "Unblock"}
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