import { useState } from "react";

// eslint-disable-next-line react/prop-types
const SubFilterMenu = ({ items, position = "right", onFilterChange, activeFilters }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            {/* Arrow trigger button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                aria-label="Toggle sub-filters"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 text-white dark:text-blue-600 animate-pulse" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div 
                    className={`absolute ${position === 'right' ? 'left-full ml-1' : 'right-full mr-1'} top-0 bg-[#024282] dark:bg-white dark:text-[#024282] shadow-lg rounded-xl p-3 z-20 w-48 border border-gray-200 text-white`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="space-y-2">
                        {items.map((item) => (
                            <label 
                                key={item.value} 
                                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 hover:text-[#024282] dark:hover:bg-[#024282] dark:hover:text-gray-50 p-1 rounded"
                            >
                                <input 
                                    type="checkbox" 
                                    className="form-checkbox h-4 w-4 transition duration-150 ease-in-out"
                                    // eslint-disable-next-line react/prop-types
                                    checked={activeFilters.includes(item.value)}
                                    onChange={() => onFilterChange(item.value)}
                                />
                                <span className="text-sm">{item.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SubFilterMenu;