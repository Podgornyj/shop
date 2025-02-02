export default function LoadingCartPage() {
    return (
        <div className="min-h-[400px] w-full border border-gray-300 rounded-lg overflow-hidden mb-10">
            <div className="grid grid-cols-4 bg-gray-100 text-left font-bold p-3 pl-5">
                <span>Назва</span>
                <span>Кількість</span>
                <span>Ціна</span>
                <span>Зображення</span>
            </div>
            <div className="divide-y">
                {
                    [...new Array(7)].map((item, index) => {
                        return (
                            <div key={index} className="h-[95px] grid grid-cols-4 p-3 items-center pl-5">
                                <div className="m-1 animate-pulse bg-gray-100 h-[70px]"></div>
                                <div className="m-1 animate-pulse bg-gray-100 h-[70px]"></div>
                                <div className="m-1 animate-pulse bg-gray-100 h-[70px]"></div>
                                <div className="m-1 animate-pulse bg-gray-100 h-[70px] w-[70px]"></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>)
}