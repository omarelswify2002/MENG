import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

export default function List({token}) {
    const [list , setList] = useState([])
    async function fetchList() {
        try {
            const response = await axios.get(backendUrl + '/api/v1/products')
            console.log('response of the admin list>>>',response.data.data);
            if(response){
                setList(response.data.data);
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    async function removeProduct(id) {
        try {
            const response = await axios.delete(
                `${backendUrl}/api/v1/products/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('response of remove product>>>', response);
            if (response) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        fetchList()
    },[])
    return (
        <>
            <p className='mb-2'>All Products List</p>
            <div className='flex flex-col gap-2'>
                {/* List Table Title */}
                <div className='hidden md:grid grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 bg-gray-100 border text-sm'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Type</b>
                    <b>subcategory</b>
                    <b>Price</b>
                    <b className='text-center'>Action</b>
                </div>
                {/* Product List */}
                {
                    list.map((item,index)=>(
                        <div className='grid md:grid-cols-[1fr_2.5fr_1fr_1fr_1fr_1fr_1fr] items-center gap-1 py-1 px-2 border text-sm' key={index}>
                            <img className='w-12' src={item.imageCover} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.typecategory}</p>
                            <p>{item.subcategory1}</p>
                            <p>{item.price} {currency}</p>
                            <p onClick={()=>removeProduct(item._id)} className='text-left cursor-pointer md:text-center text-lg hover:text-red-700'>X</p>
                        </div>
                    )).reverse()
                }
            </div>
        </>
    )
}
