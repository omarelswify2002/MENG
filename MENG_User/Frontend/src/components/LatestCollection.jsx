import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../context/ShopContextProvider"
import Title from "./Title"
import ProductItem from "./ProductItem"
import { motion } from "motion/react"

export default function LatestCollection() {
    const { products, getProductsData } = useContext(ShopContext)
    const [latestProducts, setLatestProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchLatestProducts = async () => {
            setIsLoading(true)
            try {
                if (products.length === 0) {
                    await getProductsData()
                }
                setLatestProducts(products.slice(0, 10))
            } catch (err) {
                setError(err.message)
                console.error("Failed to load products:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchLatestProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProductsData])

    if (isLoading) {
        return (
            <div className="px-4 pb-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-center py-8">
                <p>Loading latest products...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="px-4 pb-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] text-center py-8 text-red-500">
                <p>Error loading products: {error}</p>
            </div>
        )
    }

    return (
        <div className="px-4 pb-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] sm:pb-4 md:pb-4 lg:pb-4">
            <Title text1={'LATEST'} text2={'PRODUCTS'}/>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 py-5">
                    {latestProducts.length > 0 ? (
                        latestProducts.map((item, index) => (
                            <ProductItem 
                                key={index} 
                                id={item._id} 
                                imageCover={item.imageCover} 
                                name={item.name} 
                                price={item.price}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-8">
                            <p>No products available</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    )
}