//Core
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '../utils/queryClient';
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
//Components
import CartItem from "../components/CartItem";


export default async function Cart() {
    const queryClient = getQueryClient();
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
        redirect('/');
    }

    await queryClient.prefetchQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const response = await fetch('http://localhost:3001/api/cart', {
                cache: "no-store",
                headers: {
                    Cookie: token ? `token=${token}` : ''
                }
            });
            const data = await response.json();
            return data.items;
        },
    });

    return (
        <div className="min-h-[400px] w-full border border-gray-300 rounded-lg overflow-hidden mb-10">
            <div className="grid grid-cols-[1.2fr,1fr,1fr,1fr,0.3fr] bg-gray-100 text-left font-bold p-3 pl-5">
                <span>Назва</span>
                <span>Кількість</span>
                <span>Ціна</span>
                <span>Зображення</span>
            </div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                {/* Костыль с key при повторном заходе на cart список пустой */}
                <CartItem key={Date.now()} />
            </HydrationBoundary>

        </div>
    )
}