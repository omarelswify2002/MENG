import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextProvider";
import { IoIosArrowForward } from "react-icons/io";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { FILTER_CATEGORIES, SUBFILTERS_LEVEL2 } from "../config/filtersConfig";
import FilterSection from "../components/FilterSection";
import FilterItem from "../components/FilterItem";
import SubFilterMenu from "../components/SubFilterMenu";
import { motion } from "motion/react"

export default function Collections() {
    const { products, paginationResult, getProductsData } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        typecategory: [],
        subcategory1: [],
        subcategory2: []
    });
    const [sortType, setSortType] = useState('relavent');
    // eslint-disable-next-line no-unused-vars
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                let sortParam = '';
                if (sortType === 'low-high') {
                    sortParam = 'price';
                } else if (sortType === 'high-low') {
                    sortParam = '-price';
                }
                
                await getProductsData(
                    1,
                    20,
                    'name price imageCover ratingsAverage ratingsQuantity',
                    keyword,
                    filters,
                    sortParam
                );
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword, filters, sortType]);

    useEffect(() => {
        if (paginationResult?.currentPage) {
            const fetchPageData = async () => {
                setIsLoading(true);
                try {
                    let sortParam = '';
                    if (sortType === 'low-high') {
                        sortParam = 'price';
                    } else if (sortType === 'high-low') {
                        sortParam = '-price';
                    }
                    
                    await getProductsData(
                        paginationResult.currentPage,
                        20,
                        'name price imageCover ratingsAverage ratingsQuantity',
                        keyword,
                        filters,
                        sortParam
                    );
                } finally {
                    setIsLoading(false);
                }
            };
            fetchPageData();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationResult?.currentPage]);

    const paginate = async (page) => {
        if (!page || page < 1 || page > (paginationResult?.numberOfPages || 1)) return;
        
        let sortParam = '';
        if (sortType === 'low-high') {
            sortParam = 'price';
        } else if (sortType === 'high-low') {
            sortParam = '-price';
        }
        
        await getProductsData(
            page,
            20,
            'name price imageCover ratingsAverage ratingsQuantity',
            keyword,
            filters,
            sortParam
        );
    };

    const updateFilter = (filterType, value) => {
        setFilters(prev => {
            const newFilters = {...prev};
            
            if (filterType === 'subcategory2') {
                newFilters[filterType] = newFilters[filterType].includes(value) 
                    ? newFilters[filterType].filter(item => item !== value)
                    : [...newFilters[filterType], value];
                return newFilters;
            }
            
            if (newFilters[filterType].includes(value)) {
                newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
                
                if (filterType === 'category') {
                    newFilters.typecategory = [];
                    newFilters.subcategory1 = [];
                    newFilters.subcategory2 = [];
                } else if (filterType === 'typecategory') {
                    newFilters.subcategory1 = [];
                    newFilters.subcategory2 = [];
                } else if (filterType === 'subcategory1') {
                    newFilters.subcategory2 = [];
                }
            } else {
                newFilters[filterType] = [...newFilters[filterType], value];
            }
            
            return newFilters;
        });
    };

    const getSubFilterOptions = (filterType, parentFilterType) => {
        if (filterType === 'typecategory') {
            if (filters.category.length === 0) return [];
            return FILTER_CATEGORIES[filterType].subFilters[parentFilterType][filters.category[0]] || [];
        }
        
        if (filterType === 'subcategory1') {
            if (filters.typecategory.length === 0) return [];
            return SUBFILTERS_LEVEL2[filters.typecategory[0]] || [];
        }
        
        return [];
    };

    return (
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
            <Title text1={'All'} text2={'Products'}/>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4 py-10 border-t border-slate-900 dark:border-[--textColor1]">
                {/* Filter Sidebar */}
                <div className="min-w-52">
                    <p className="my-2 text-xl font-bold flex items-center cursor-pointer gap-2" onClick={()=>setShowFilter(!showFilter)}>
                        FILTERS
                        <IoIosArrowForward className={`w-4 h-4 text-[--textColor2] font-bold sm:hidden transition-all duration-500 ${showFilter? 'rotate-90' : ''}`}/>
                    </p>
                    
                    {/* Category Filter */}
                    <div className={`${showFilter? '' : 'hidden'} sm:block`}>
                        <FilterSection title={FILTER_CATEGORIES.category.title}>
                            {FILTER_CATEGORIES.category.options.map(option => (
                                <FilterItem
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    checked={filters.category.includes(option.value)}
                                    onChange={() => updateFilter('category', option.value)}
                                />
                            ))}
                        </FilterSection>

                        Type Category Filter
                        {filters.category.length > 0 && (
                            <FilterSection title={FILTER_CATEGORIES.typecategory.title}>
                                {FILTER_CATEGORIES.typecategory.options.map(option => (
                                <FilterItem
                                    key={option.value}
                                    label={option.label}
                                    value={option.value}
                                    checked={filters.typecategory.includes(option.value)}
                                    onChange={() => updateFilter('typecategory', option.value)}
                                >
                                    {/* Only show arrow if there are sub-filters */}
                                    {getSubFilterOptions('typecategory', option.value).length > 0 && (
                                        <SubFilterMenu
                                            items={getSubFilterOptions('typecategory', option.value)}
                                            onFilterChange={(value) => updateFilter('subcategory1', value)}
                                            activeFilters={filters.subcategory1}
                                        />
                                    )}
                                </FilterItem>
                                ))}
                            </FilterSection>
                        )}

                        {/* Subcategory 1 Filter */}
                        {filters.subcategory1.length > 0 && (
                            <FilterSection title="SUBCATEGORY 1">
                                {filters.subcategory1.map(item => (
                                    <FilterItem
                                        key={item}
                                        label={item}
                                        value={item}
                                        checked={true}
                                        onChange={() => updateFilter('subcategory1', item)}
                                    >
                                        <SubFilterMenu
                                            items={SUBFILTERS_LEVEL2[item] || []}
                                            position="right"
                                            onFilterChange={(value) => updateFilter('subcategory2', value)}
                                            activeFilters={filters.subcategory2}
                                        />
                                    </FilterItem>
                                ))}
                            </FilterSection>
                        )}

                        {/* Subcategory 2 Filter */}
                        {filters.subcategory2.length > 0 && (
                            <FilterSection title="SUBCATEGORY 2">
                                {filters.subcategory2.map(item => (
                                    <FilterItem
                                        key={item}
                                        label={item}
                                        value={item}
                                        checked={true}
                                        onChange={() => updateFilter('subcategory2', item)}
                                    />
                                ))}
                            </FilterSection>
                        )}
                    </div>
                </div>
                
                {/* Products Grid */}
                <div className="flex-1 relative">
                    <div className="flex justify-between text-base sm:text-2xl mb-4 absolute right-0">
                        <select 
                            onChange={(e) => setSortType(e.target.value)} 
                            className="border-2 dark:text-[#024282] font-bold border-[#024282] bg-[#024282] dark:bg-white dark:border-[#024282] rounded-t-lg text-sm px-2 py-1 text-white"
                            value={sortType}
                        >
                            <option value="relavent">Sort by: Relavent</option>
                            <option value="low-high">Sort by: Low to High Price</option>
                            <option value="high-low">Sort by: High to Low Price</option>
                        </select>
                    </div>

                    {isLoading ? (
                        <div className="text-center py-12">Loading products...</div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            {/* Products List */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 gap-y-6 mt-14">
                                {products.map((item) => (
                                    <ProductItem 
                                        key={item._id} 
                                        id={item._id} 
                                        imageCover={item.imageCover} 
                                        name={item.name} 
                                        price={item.price} 
                                        rating={item.ratingsAverage} 
                                        reviewCount={item.ratingsQuantity} 
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {paginationResult?.numberOfPages > 1 && (
                                <div className="flex justify-center items-center mt-8 mb-4">
                                    <button 
                                        onClick={() => paginate(paginationResult.prev)}
                                        disabled={!paginationResult.prev}
                                        className={`mx-1 px-3 py-1 rounded ${!paginationResult.prev ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                    >
                                        <FaAngleLeft />
                                    </button>
                                    
                                    {Array.from({ length: paginationResult.numberOfPages }, (_, i) => i + 1).map(number => (
                                        <button
                                            key={number}
                                            onClick={() => paginate(number)}
                                            className={`mx-1 px-3 py-1 rounded ${paginationResult.currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`}
                                        >
                                            {number}
                                        </button>
                                    ))}
                                    
                                    <button 
                                        onClick={() => paginate(paginationResult.next)}
                                        disabled={!paginationResult.next}
                                        className={`mx-1 px-3 py-1 rounded ${!paginationResult.next ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                    >
                                        <FaAngleRight />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
}