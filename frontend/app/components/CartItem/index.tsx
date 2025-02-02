'use client'
//Core
import { useQueryClient } from '@tanstack/react-query'
import { useState } from "react";
import Image from "next/image";
import { FiXCircle, FiTrash2 } from "react-icons/fi";
import { redirect } from "next/navigation";
//Types
import { CartItemTypes } from "../../types/ProductTypes"
//Queries
import { deleteFromCard, getCart } from "@/app/queries/cartQueries";


export default function CartItem() {
    const queryClient = useQueryClient();
    const [showPopUp, setShowPopUp] = useState(false);

    const { mutate } = deleteFromCard({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['cart']
            })
            setShowPopUp(true);
            setTimeout(() => setShowPopUp(false), 2500);
        }
    });

    const { data } = getCart()

    return (
        <div className="divide-y">
            {
                data.map((cartItem: CartItemTypes) => {
                    return (
                        <div key={cartItem.product.id} className="grid grid-cols-[1.2fr,1fr,1fr,1fr,0.3fr] p-3 items-center pl-5">
                            <div>{cartItem.product.name}</div>
                            <div>{cartItem.quantity} шт</div>
                            <div>{cartItem.product.price} грн</div>
                            <Image
                                onClick={() => redirect(`/carpets/${cartItem.product.id}`)}
                                src={`http://localhost:3001${cartItem.product.image}`}
                                alt={cartItem.product.name}
                                width={70}
                                height={70}
                                className="object-cover cursor-pointer"
                            />
                            <div onClick={() => {
                                mutate(cartItem.product.id);
                            }} className="cursor-pointer">
                                <FiTrash2 className="text-red-600" />
                            </div>
                        </div>
                    )
                })
            }
            {
                showPopUp ?
                    <div
                        className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white text-lg rounded-xl shadow-lg transition-all duration-300 scale-100 bg-red-500`}
                    >
                        <div className="flex items-center gap-2">
                            <FiXCircle className="text-white text-2xl" />
                            <span>Товар видалено з кошика</span>
                        </div>
                    </div> : null


            }
        </div>
    )
}