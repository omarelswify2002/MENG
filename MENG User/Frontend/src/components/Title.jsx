
// eslint-disable-next-line react/prop-types
export default function Title({text1 , text2}) {
    
    return (
        <div className="inline-flex gap-2 items-center mb-3 w-full justify-center bg-[#024282] border-solid border-2 border-[--textColor1] rounded-b-2xl text-2xl font-semibold py-4 dark:bg-white dark:border-[#024282]">
            <p className="text-white dark:text-[#024282]">
                {text1}
                <span className="text-white dark:text-[#024282]">
                    {text2}
                </span>
            </p>
            <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-white dark:bg-[#024282]"></p>
        </div>

    )
}
