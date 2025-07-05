// src/components/FilterItem.jsx

// eslint-disable-next-line react/prop-types
const FilterItem = ({ label, value, checked, onChange, children }) => {
    return (
        <div className="group relative">
            <p className="flex gap-2">
                <input 
                type="checkbox" 
                className="w-3" 
                value={value}
                checked={checked}
                onChange={onChange}
                />
                {label}
            </p>
            {children}
        </div>
    );
};

export default FilterItem;