import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { backendUrl, currency } from '../App'

export default function LowStockForAdmin({ token }) {
    const [list , setList] = useState([])

    async function fetchLowStock() {
        try {
            const response = await axios.get(backendUrl + '/api/v1/products')
            if(response){
                // Only products with quantity < 2
                setList((response.data.data || []).filter(p => Number(p.quantity) < 2));
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function removeProduct(id) {
        try {
            const response = await axios.delete(
                `${backendUrl}/api/v1/products/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response) {
                toast.success(response.data.message);
                await fetchLowStock();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchLowStock()
    },[])

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-[#263D54] dark:text-white">Products About to Run Out</h2>
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-[#b91c1c] text-white">
                            <th className="py-3 px-2 rounded-tl-xl">Image</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Category</th>
                            <th className="py-3 px-2">Type</th>
                            <th className="py-3 px-2">Subcategory</th>
                            <th className="py-3 px-2">Price</th>
                            <th className="py-3 px-2">Quantity</th>
                            <th className="py-3 px-2 rounded-tr-xl text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="text-center py-8 text-gray-400">No low stock products found.</td>
                            </tr>
                        ) : (
                            [...list].reverse().map((item) => (
                                <tr key={item._id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition">
                                    <td className="py-2 px-2">
                                        <img
                                            className="w-16 h-16 object-cover rounded-lg border border-gray-200 shadow-sm"
                                            src={item.imageCover}
                                            alt={item.name}
                                        />
                                    </td>
                                    <td className="py-2 px-2 font-semibold">{item.name}</td>
                                    <td className="py-2 px-2">{item.category}</td>
                                    <td className="py-2 px-2">{item.typecategory}</td>
                                    <td className="py-2 px-2">{item.subcategory1}</td>
                                    <td className="py-2 px-2">{item.price} {currency}</td>
                                    <td className="py-2 px-2 text-red-600 font-bold">{item.quantity}</td>
                                    <td className="py-2 px-2 flex flex-col items-center gap-2 justify-center">
                                        <Link
                                            to={`/edit/${item._id}`}
                                            className="px-4 py-1 rounded-full bg-[#2b5175] text-white hover:bg-blue-600 transition font-semibold shadow"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => removeProduct(item._id)}
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
    )
}