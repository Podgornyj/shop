//Core
import Image from "next/image";
//Components
import AddToCard from "@/app/components/AddToCard";

export default async function Carpet({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);

    const res = await fetch(`http://localhost:3001/api/products/${id}`);
    const data = await res.json()

    const inStock = data.stock > 0;
    return (
        <div className={`grid grid-cols-2 pt-9`}>
            <div className="flex flex-col pl-5 pr-5">
                <div className="relative">
                    <Image
                        src={`http://localhost:3001${data.image}`}
                        alt={data.name}
                        width={460}
                        height={460}
                        className="object-cover"
                    />
                    <div className="flex flex-col absolute top-2 left-2 gap-1">
                        {data.discount ? <span className="bg-red-400 text-white px-2 py-1 text-xs font-bold rounded">РОЗПРОДАЖ</span> : null}
                        {data.newcollection ? <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs font-bold rounded">НОВИНКА</span> : null}
                        {data.hit ? <span className="bg-green-200 text-green-700 px-2 py-1 text-xs font-bold rounded">ХІТ</span> : null}
                    </div>
                </div>
                <div className="border-b border-t border-[#d7d7d7] w-[95%] pb-6 mt-9">
                    <div className="text-lg font-bold pt-4 pb-4">Доставка</div>
                    <div>Новий відгук або коментар</div>
                </div>
                <div className="border-b border-[#d7d7d7] w-[95%] pb-6">
                    <div className="text-lg font-bold pt-4 pb-4">Оплата</div>
                    <div>Новий відгук або коментар</div>
                </div>
                <div className="border-b border-[#d7d7d7] w-[95%] pb-6">
                    <div className="text-lg font-bold pt-4 pb-4">Гарантия</div>
                    <div>Новий відгук або коментар</div>
                </div>
            </div>
            <div className="flex flex-col pl-5 pr-5">
                <div className="border-b border-[#d7d7d7] w-[95%] pb-6">
                    <div className="text-3xl text-[32px] pt-5 mb-3">{data.name}</div>
                    <div className={`text-xs ${inStock ? 'text-[#17b260]' : 'text-[#eb2c2c]'}`}>{inStock ? 'В наявності' : 'Товар відсутній'}</div>
                </div>
                <div className="border-b border-[#d7d7d7] w-[95%] pb-6">
                    <div className="flex gap-2 text-4xl pt-5 pb-5">
                        <div>{data.price} грн</div>
                    </div>
                    <AddToCard name={data.name} id={data.id} stock={data.stock} />
                </div>
                <div className="border-b border-[#d7d7d7] w-[95%] pb-6">
                    <div className="text-lg font-bold pt-4 pb-4">Опис</div>
                    <div>{data.description}</div>
                </div>
                <div className="border-b border-[#d7d7d7] w-[95%] pb-6">
                    <div className="text-lg font-bold pt-4 pb-4">Характеристики</div>
                    <div>Ціна: {data.price} грн</div>
                </div>
                <div className="border-b border-[#d7d7d7] w-[95%] pb-6">
                    <div className="text-lg font-bold pt-4 pb-4">Новий відгук або коментар</div>
                    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Залишити відгук</h2>

                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Ім'я та прізвище"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
                            />
                            <input
                                type="email"
                                placeholder="E-пошта"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
                            />
                            <textarea
                                rows={4}
                                placeholder="Повідомлення"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
                            />
                            <div>
                                <label className="text-gray-700 font-medium">Оцініть товар</label>
                                <div className="flex gap-2 mt-2">
                                    {[...Array(5)].map((_, index) => (
                                        <span key={index} className="text-gray-400 text-2xl cursor-pointer hover:text-yellow-500">
                                            ★
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg transition"
                            >
                                Надіслати
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}