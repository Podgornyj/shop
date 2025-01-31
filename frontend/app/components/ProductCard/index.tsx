import Image from "next/image";
//Icons
import {
    FiHeart,
    FiCheckCircle,
} from "react-icons/fi";

export function ProductCard({ product }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-xs">
            <div className="relative flex justify-center">
                <Image
                    src={product?.image ? `http://localhost:3001${product.image}` : "/lamp.webp"}
                    alt="Настільна лампа ShineFlow"
                    width={200}
                    height={200}
                    className="rounded-lg"
                />

                <div className="flex flex-col absolute top-2 left-2 gap-1">
                    <span className="bg-red-400 text-white px-2 py-1 text-xs font-bold rounded">РОЗПРОДАЖ</span>
                    <span className="bg-gray-200 text-gray-700 px-2 py-1 text-xs font-bold rounded">НОВИНКА</span>
                    <span className="bg-green-200 text-green-700 px-2 py-1 text-xs font-bold rounded">ХІТ</span>
                </div>
            </div>

            <div className="mt-4">
                <h3 className="text-lg font-semibold">Настільна лампа ShineFlow</h3>
                <p className="text-gray-700 font-bold">1500 грн</p>
            </div>

            <button className="mt-4 w-full bg-[#b0bc90] text-white py-2 rounded hover:bg-green-700">
                Купити
            </button>

            <div className="flex justify-between mt-4 text-gray-500">
                <button className="flex items-center space-x-2 hover:text-green-600">
                    <FiHeart className="text-xl" />
                    <span>В бажання</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-600">
                    <FiCheckCircle className="text-xl" />
                    <span>Порівняти</span>
                </button>
            </div>
        </div>
    );
}