
// eslint-disable-next-line react/prop-types
export default function Title({text1 , text2}) {
    
    return (
        <div className="flex items-center mb-3 w-full justify-center bg-[#024282] border-solid border-2 border-[--textColor1] rounded-b-2xl text-2xl font-semibold py-4 dark:bg-white dark:border-[#024282]">
            <p className="text-white dark:text-[#024282]">
                {text1}
                <span className="text-white dark:text-[#024282]">
                    {text2}
                </span>
            </p>
        </div>

    )
}
