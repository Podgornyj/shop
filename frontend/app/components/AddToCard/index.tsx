'use client'
//Core
import { useState } from "react"
import { useRouter } from 'next/navigation'
//Context
import { useAuthContext } from "@/app/context/AuthProvider";
//Queries
import { addToCard } from "@/app/queries/productQueries";

export default function AddToCard({ name, id, stock }: { name: string, id: string, stock: number }) {

    const [count, setCount] = useState(1);
    const [showPopUp, setShowPopUp] = useState(false);
    const { data } = useAuthContext();
    const router = useRouter();

    const { isPending, mutate } = addToCard({
        onSuccess: () => {
            setShowPopUp(true);
            setTimeout(() => setShowPopUp(false), 2500);
        }
    });



    const addProductUnit = () => {
        if (count < stock) {
            setCount(count + 1);
        }
    }

    const removeProductCountUnit = () => {
        if (count < 2) {
            return;
        }
        setCount(count - 1);
    }

    const addToCardProduct = () => {
        if (isPending) {
            return
        }
        if (!data) {
            router.push(`/login?callbackUrl=${encodeURIComponent(window.location.href)}`);
            return;
        }
        mutate({
            quantity: count,
            productId: id
        })
    }

    return (
        <div className="flex gap-4">
            <div className="flex border p-2 rounded-md w-[100px] justify-around">
                <div className="flex-1 flex justify-center cursor-pointer select-none" onClick={() => removeProductCountUnit()}>-</div>
                <div className="flex-1 flex justify-center">{count}</div>
                <div className="flex-1 flex justify-center cursor-pointer select-none" onClick={() => addProductUnit()}>+</div>
            </div>
            <button
                className="rounded-md pl-4 pr-4 border border-[#b0bc8e] text-[#b0bc8e]"
                onClick={() => addToCardProduct()}
            >{isPending ? 'loading' : 'В кошик'}</button>
            {
                showPopUp ?
                    <div className="p-7 flex items-center justify-center fixed top-[20%] left-[50%] min-h-[100px] translate-x-[-50%] bg-gray-100 rounded-md">
                        <span className="font-black">{name}</span>, додано у кошик
                    </div> : null
            }
        </div>
    )
}