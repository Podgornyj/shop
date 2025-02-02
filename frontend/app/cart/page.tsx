//Core
import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
//Types
import { CartItem } from "../types/ProductTypes"

export default async function Cart() {
    const cookieStore = cookies();
    const token = (await cookieStore).get('token')?.value;

    if (!token) {
        redirect('/');
    }

    const response = await fetch('http://localhost:3001/api/cart', {
        headers: {
            Cookie: token ? `token=${token}` : ''
        }
    })
    const data = await response.json();

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
                    data && data.items ?
                        data.items.map((cartItem: CartItem) => {
                            return (
                                <div key={cartItem.product.id} className="grid grid-cols-4 p-3 items-center pl-5">
                                    <div>{cartItem.product.name}</div>
                                    <div>{cartItem.quantity} шт</div>
                                    <div>{cartItem.product.price} грн</div>
                                    <Image
                                        src={`http://localhost:3001${cartItem.product.image}`}
                                        alt={cartItem.product.name}
                                        width={70}
                                        height={70}
                                        className="object-cover"
                                    />
                                </div>
                            )
                        }) : null
                }
            </div>
        </div>
    )
}