import axios from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { backendUrl, currency } from '../App'
import { Link } from 'react-router-dom'

export default function List({ token }) {
    const [list , setList] = useState([])
    const [sortField, setSortField] = useState('updatedAt');
    const [sortDir, setSortDir] = useState('desc');

    async function fetchList() {
        try {
            const response = await axios.get(backendUrl + '/api/v1/products')
            if(response){
                setList(response.data.data);
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
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchList()
    },[])

    // Sorting logic
    const sortedList = [...list].sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortField === 'price' || sortField === 'quantity') {
            valA = Number(valA);
            valB = Number(valB);
        }
        if (sortField === 'updatedAt') {
            valA = new Date(valA);
            valB = new Date(valB);
        }
        if (valA < valB) return sortDir === 'asc' ? -1 : 1;
        if (valA > valB) return sortDir === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDir('asc');
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-[#263D54] dark:text-white">All Products</h2>
            <div className="overflow-x-auto rounded-xl shadow border border-gray-200 dark:border-gray-700 bg-white dark:bg-slate-800">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-[#263D54] text-white">
                            <th className="py-3 px-2 rounded-tl-xl">Image</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Category</th>
                            <th className="py-3 px-2">Type</th>
                            <th className="py-3 px-2">Subcategory</th>
                            <th
                                className="py-3 px-2 cursor-pointer select-none"
                                onClick={() => handleSort('price')}
                            >
                                Price
                                {sortField === 'price' && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th
                                className="py-3 px-2 cursor-pointer select-none"
                                onClick={() => handleSort('quantity')}
                            >
                                Quantity
                                {sortField === 'quantity' && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th
                                className="py-3 px-2 cursor-pointer select-none"
                                onClick={() => handleSort('updatedAt')}
                            >
                                Updated
                                {sortField === 'updatedAt' && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                            </th>
                            <th className="py-3 px-2 rounded-tr-xl text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedList.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="text-center py-8 text-gray-400">No products found.</td>
                            </tr>
                        ) : (
                            sortedList.map((item) => (
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
                                    <td className="py-2 px-2">
                                        {typeof item.quantity === 'number' ? (
                                            <span
                                                className={`inline-block px-2 py-1 rounded text-xs font-mono shadow-sm border
                                                    ${
                                                        item.quantity < 2
                                                            ? 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800'
                                                            : item.quantity < 10
                                                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-200 dark:border-yellow-800'
                                                            : 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-200 dark:border-green-800'
                                                    }
                                                `}
                                            >
                                                {item.quantity}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-2">
                                        {item.updatedAt ? (
                                            <span className="inline-block px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 text-xs font-mono shadow-sm border border-blue-100 dark:border-blue-800">
                                                {new Date(item.updatedAt).toLocaleString()}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>
                                    <td className="py-2 px-2 flex flex-col gap-2 items-center justify-center">
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
