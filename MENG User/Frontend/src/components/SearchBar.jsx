/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiSearchLine, RiSparkling2Fill } from 'react-icons/ri';
import { ShopContext } from '../context/ShopContextProvider';

export default function SearchBar({ showSearch }) {
    const [search, setSearch] = useState('');
    const [visible, setVisible] = useState(false);
    const [isAIThinking, setIsAIThinking] = useState(false);
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
                setIsAIThinking(true);
                
                try {
                    // Use the LLM search function
                    const results = await searchProductsWithLLM(search);
                    
                    // Update the products in context
                    setProducts(results);
                    
                    // Navigate to collections page with search query
                    navigate(`/Collections?search=${encodeURIComponent(search)}`);
                } catch (error) {
                    console.error('AI search error:', error);
                } finally {
                    setIsAIThinking(false);
                }
            }
        }
    };
    
    return showSearch && visible ? (
        <div className="relative border-t border-b dark:border-gray-700 border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 py-2 text-center transition-all duration-300">
            <div className="relative inline-flex items-center justify-between bg-white dark:bg-gray-800 border-2 border-blue-400 dark:border-purple-500 shadow-lg px-6 py-2 my-2 rounded-full w-11/12 sm:w-2/3 md:w-1/2 transition-all duration-300 hover:shadow-xl hover:border-blue-500 dark:hover:border-purple-400">
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={handleSearch}
                    className="flex-1 outline-none bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-base md:text-lg font-medium pr-3" 
                    type="text" 
                    placeholder="Ask AI to find products..."
                />
                
                <div className="flex items-center">
                    {isAIThinking ? (
                        <div className="relative h-6 w-6 mr-2">
                            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-blue-500 animate-spin"></div>
                            <RiSparkling2Fill className="absolute inset-0 text-blue-400 animate-pulse" />
                        </div>
                    ) : (
                        <RiSparkling2Fill className="text-blue-400 dark:text-purple-400 mr-2 animate-pulse" />
                    )}
                    
                    <button 
                        onClick={handleSearch}
                        className="p-2 bg-blue-500 dark:bg-purple-600 text-white rounded-full hover:bg-blue-600 dark:hover:bg-purple-700 transition-colors duration-300"
                        disabled={isAIThinking}
                    >
                        <RiSearchLine className="text-lg" />
                    </button>
                </div>
                
                {/* AI Badge */}
                <span className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center">
                    <RiSparkling2Fill className="mr-1" />
                    AI-Powered
                </span>
            </div>
            
            {/* Subtle floating animation for the AI badge */}
            <style >{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-5px); }
                    100% { transform: translateY(0px); }
                }
                .ai-badge {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    ) : null;
}