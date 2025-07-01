// import { useContext, useEffect, useState } from "react"
// import { ShopContext } from "../context/ShopContextProvider"
// import Title from "./Title"
// import ProductItem from "./ProductItem"

// // eslint-disable-next-line react/prop-types
// export default function RelatedProducts({category,subCategory}) {
//     const {products} = useContext(ShopContext)
//     const [related , setRelated] = useState([])
//     useEffect(()=>{
//         if(products.length > 0){
//             let productCopy = products.slice();
//             productCopy = productCopy.filter(item => category === item.category)
//             productCopy = productCopy.filter(item => subCategory === item.subCategory)
//             setRelated(productCopy.slice(0,5));
//         }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     },[products])
//     return (
//         <div className="mb-24">
//             <div className="text-center text-3xl py-2">
//                 <Title text1={'RELATED'} text2={'PRODUCTS'}/>
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//                     {related.map((item , index)=>(
//                         <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
//                     ))}
//             </div>
//         </div>
//     )
// }

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContextProvider";
import Title from "./Title";
import ProductItem from "./ProductItem";

export default function RelatedProducts() {
    const { productId } = useParams();
    const { getSimilarProductsById } = useContext(ShopContext);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSimilarProducts = async () => {
            try {
                setLoading(true);
                const productData = await getSimilarProductsById(productId);
                
                if (productData && productData.similarProducts) {
                    // استخراج المنتجات المشابهة واستبعاد المنتج الحالي إذا كان موجودًا
                    const similarProducts = productData.similarProducts
                        .map(item => item.product)
                        .filter(product => product._id !== productId);
                    
                    setRelated(similarProducts.slice(0, 5));
                }
            } catch (err) {
                console.error("Error fetching similar products:", err);
                setError("Failed to load similar products");
            } finally {
                setLoading(false);
            }
        };

        fetchSimilarProducts();
    }, [productId, getSimilarProductsById]);

    if (loading) {
        return (
            <div className="mb-24">
                <div className="text-center text-3xl py-2">
                    <Title text1={'RELATED'} text2={'PRODUCTS'}/>
                </div>
                <div className="flex justify-center items-center h-40">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[--color1]"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mb-24">
                <div className="text-center text-3xl py-2">
                    <Title text1={'RELATED'} text2={'PRODUCTS'}/>
                </div>
                <div className="text-center text-red-500 py-4">{error}</div>
            </div>
        );
    }

    if (!related || related.length === 0) {
        return null; // لا تعرض أي شيء إذا لم يكن هناك منتجات مشابهة
    }

    return (
        <div className="mb-24">
            <div className="text-center text-3xl py-2">
                <Title text1={'RELATED'} text2={'PRODUCTS'}/>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {related.map((item) => (
                    <ProductItem 
                        key={item._id} 
                        id={item._id} 
                        imageCover={item.imageCover || item.image} 
                        name={item.name} 
                        price={item.price}
                    />
                ))}
            </div>
        </div>
    );
}