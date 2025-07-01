/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { ShopContext } from '../context/ShopContextProvider';

export default function SearchBar({ showSearch }) {
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { searchProductsWithLLM, setProducts } = useContext(ShopContext);
    
    useEffect(() => {
        location.pathname === '/Collections' ? setVisible(true) : setVisible(false);
    }, [location]);
    
    const handleSearch = async (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            e.preventDefault();
            
            if (search.trim()) {
                // Use the LLM search function
                const results = await searchProductsWithLLM(search);
                
                // Update the products in context
                setProducts(results);
                
                // Navigate to collections page with search query
                navigate(`/Collections?search=${encodeURIComponent(search)}`);
            }
        }
    };
    
    return showSearch && visible ? (
        <div className="border-t border-b dark:border-[--textColor1] border-slate-900 bg-orage text-center">
            <div className="inline-flex items-center justify-center bg-white border dark:border-[--textColor1] border-[--color1] px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearch}
                    className="flex-1 outline-none bg-inherit text-[--textColor2] opacity-80 text-sm" 
                    type="text" 
                    placeholder="Search for products..."
                />
                <RiSearchLine 
                    className="dark:text-gray-400 text-[--color1] cursor-pointer" 
                    onClick={handleSearch}
                />
            </div>
        </div>
    ) : null;
}
