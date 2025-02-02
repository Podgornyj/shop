export default function Loading() {
    return (
        <div className={`grid grid-cols-2 pt-9`}>
            <div className="flex flex-col pl-5 pr-5">
                <div className="relative">
                    <div className="animate-pulse h-[460px] w-[460px] bg-gray-100 rounded-md"></div>
                </div>
                <div>Доставка</div>
                <div>Оплата</div>
                <div>Гарантія</div>
            </div>
            <div className="flex flex-col pl-5 pr-5">
                <div className="animate-pulse border-b border-[#d7d7d7] w-[95%] pb-6 h-[100px] bg-gray-100 rounded-md mb-4">
                    <div className="text-3xl text-[32px] pt-5 mb-3"></div>
                    <div className={`text-xs`}></div>
                </div>
                <div className="animate-pulse border-b border-[#d7d7d7] w-[95%] pb-6 h-[130px] bg-gray-100 rounded-md mb-4">
                    <div className="flex gap-2 text-4xl pt-5 pb-5">
                        <div></div>
                    </div>
                </div>
                <div className="animate-pulse border-b border-[#d7d7d7] w-[95%] pb-6 h-[335px] bg-gray-100 rounded-md mb-4">
                    <div className="text-lg font-bold pt-4 pb-4"></div>
                    <div></div>
                </div>
                <div>4</div>
                <div>5</div>
            </div>
        </div>
    )
}