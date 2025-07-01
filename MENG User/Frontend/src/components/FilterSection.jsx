// src/components/FilterSection.jsx

// eslint-disable-next-line react/prop-types
const FilterSection = ({ title, children }) => {
    return (
        <div className={`border dark:text-[#024282] border-[--textColor1] bg-[#024282] dark:bg-white dark:border-[#024282] w-[70%] rounded-xl pl-5 py-3 my-5 text-white`}>
            <p className="mb-3 text-sm font-semibold w-full">{title}</p>
            <div className="flex flex-col text-sm text-white dark:text-[#024282] font-light gap-2">
                {children}
            </div>
        </div>
    );
};

export default FilterSection;