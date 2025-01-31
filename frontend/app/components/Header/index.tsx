'use client'
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation'
//Icons
import {
    FiSearch,
    FiMenu,
} from "react-icons/fi";

export function Header() {

    const router = useRouter();

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
            <div className="flex items-center space-x-4">
                <button
                    className="lg:hidden text-2xl"
                >
                    <FiMenu />
                </button>
                <Image onClick={() => router.push('/')} src="/shop_logo.webp" alt="Logo" width={120} height={40} />
            </div>
            <nav className={`space-x-6 text-gray-700 hidden lg:flex`}>
                <Link className="hover:text-green-600" href={`/carpets`}>Килими</Link>
                <Link className="hover:text-green-600" href={`/plaid`}>Пледи</Link>
                <Link className="hover:text-green-600" href={`/bedclothes`}>Постільна білизна</Link>
                <Link className="hover:text-green-600" href={`/lighting`}>Освітлення</Link>
                <Link className="hover:text-green-600" href={`/decor`}>Декор</Link>
            </nav>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Пошук товарів"
                        className="border rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-48 hidden md:block"
                    />
                    <FiSearch className="absolute right-3 top-3 text-gray-500" />
                </div>
            </div>
        </header>
    )
}