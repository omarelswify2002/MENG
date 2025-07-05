import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

export default function EditProductForAdmin({ token }) {
    const { id } = useParams();
    const navigate = useNavigate();

    // Form states
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('Medical');
    const [typecategory, setTypecategory] = useState('Clothes');
    const [sizes, setSizes] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch product data
    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await axios.get(`${backendUrl}/api/v1/products/${id}`);
                const p = res.data.data;
                setName(p.name || '');
                setDescription(p.description || '');
                setPrice(p.price || '');
                setQuantity(p.quantity || '');
                setCategory(p.category || 'Medical');
                setTypecategory(p.typecategory || 'Clothes');
                setSizes(Array.isArray(p.sizes) ? p.sizes : []);
            } catch (error) {
                console.error('Error fetching product: ',error);
                toast.error("Failed to fetch product");
            }
            setLoading(false);
        }
        fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, backendUrl]);

    // Handle update
    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('category', category);
            formData.append('typecategory', typecategory);
            sizes.forEach(size => formData.append('sizes', size));

            const response = await axios.put(
                `${backendUrl}/api/v1/products/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );            
            if(response){
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setPrice('')
                setQuantity('')
                setSizes([])
            } else {
                toast.error(response.data.message)
            }
            toast.success("Product updated!");
            navigate('/list');
        } catch (error) {
            console.error('Error updating product: ',error);
            toast.error(error.response?.data?.message || error.message);
        }
    }

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <form onSubmit={handleUpdate} className='flex flex-col w-full items-start gap-3 max-w-3xl mx-auto p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md'>
            <h2 className="text-2xl font-bold mb-2 text-[#263D54] dark:text-white">Edit Product</h2>
            {/* Product Name */}
            <div className='w-full'>
                <p className='mb-2 text-gray-700 dark:text-gray-300'>Product Name:</p>
                <input onChange={(e) => setName(e.target.value)} value={name} required type="text" className='w-full max-w-[500px] px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Type here' />
            </div>
            {/* Product Description */}
            <div className='w-full'>
                <p className='mb-2 text-gray-700 dark:text-gray-300'>Product Description:</p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} required className='w-full max-w-[500px] px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Write content here' />
            </div>
            
            {/* Product Category */}
            <div>
                <p className='mb-2 text-gray-700 dark:text-gray-300'>Product Category:</p>
                <select onChange={e => setCategory(e.target.value)} value={category} required className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <option value="Medical">Medical</option>
                    <option value="Geometric">Geometric</option>
                </select>
            </div>
            {/* Type */}
            <div>
                <p className='mb-2 text-gray-700 dark:text-gray-300'>Type:</p>
                <select onChange={e => setTypecategory(e.target.value)} value={typecategory} required className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <option value={"Clothes"}>Clothes</option>
                    <option value="Tools">Tools</option>
                </select>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
                <div>
                    <p className='mb-2'>Product Price:</p>
                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
                </div>
                <div>
                    <p className='mb-2'>Product Quantity:</p>
                    <input onChange={(e) => setQuantity(e.target.value)} value={quantity} className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='1' />
                </div>
            </div>
            <button type='submit' className='px-8 py-3 mt-4 border border-black dark:border-gray-600 text-sm hover:bg-black hover:text-white dark:hover:bg-slate-600 transition-all duration-500 text-black dark:text-white bg-white dark:bg-slate-700 active:bg-gray-800 dark:active:bg-slate-500 rounded'>
                Update Product
            </button>
        </form>
    );
}