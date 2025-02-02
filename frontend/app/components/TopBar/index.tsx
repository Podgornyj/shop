'use client'

import { useAuthContext } from '@/app/context/AuthProvider';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

import {
    FiCheckCircle,
    FiHeart,
    FiUser,
    FiShoppingCart,
} from "react-icons/fi";


export function TopBar() {

    const router = useRouter();
    const queryClient = useQueryClient();
    const { data, isLoading } = useAuthContext();

    const logOutMutation = useMutation({
        mutationFn: async (data) => {
            const res = await fetch('http://localhost:3001/api/auth/logout', {
                method: 'GET',
                credentials: "include",
            })
            return res.json();
        },
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], null);
            router.refresh();
        }
    })

    return (
        <div className="bg-[#b0bc90] text-white text-sm py-2 px-6 flex justify-between">
            <nav className="flex space-x-6 min-w-[585px]">
                <Link href={`/about`}>Про нас</Link>
                <Link href={`/payment`}>Оплата і доставка</Link>
                <Link href={`/exchange`}>Обмін та повернення</Link>
                <Link href={`/contacts`}>Контактна інформація</Link>
                <Link href={`/blog`}>Блог</Link>
            </nav>
            <div className="flex space-x-4">
                <div className="flex space-x-2">
                    <span className="font-bold">Укр</span>
                    <span className="opacity-50 cursor-pointer hover:opacity-100">Eng</span>
                </div>
                <FiCheckCircle className="opacity-50 text-lg" />
                <FiHeart className="opacity-50 text-lg" />
                {
                    isLoading ?
                        <div>Loading...</div>
                        :
                        <>
                            {
                                data ?
                                    <div className='flex gap-2 cursor-pointer' onClick={() => {
                                        logOutMutation.mutate();
                                    }}>
                                        <FiUser className="text-lg cursor-pointer hover:text-gray-200" />
                                        <div>Вийти</div>
                                    </div>
                                    :
                                    <div className='flex gap-2 cursor-pointer' onClick={() => {
                                        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`);
                                    }}>
                                        <FiUser className="text-lg cursor-pointer hover:text-gray-200" />
                                        <div>Вхід</div>
                                    </div>

                            }
                            {
                                data ?
                                    <div onClick={() => router.push('/cart')} className="flex space-x-1 cursor-pointer">
                                        <FiShoppingCart className="text-lg cursor-pointer hover:text-gray-200" />
                                        <span>Мій кошик</span>
                                    </div>
                                    :
                                    null
                            }
                        </>
                }

            </div>
        </div>
    );
}