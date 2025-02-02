'use client'
//Core
import { useState } from "react"
import { useRouter } from 'next/navigation'
//Context
import { useAuthContext } from "@/app/context/AuthProvider";
//Queries
import { addToCard } from "@/app/queries/cartQueries";
//Icons
import { FiCheckCircle, FiLoader } from "react-icons/fi";

export default function AddToCard({ name, id, stock }: { name: string, id: string, stock: number }) {

    const [count, setCount] = useState(1);
    const [showPopUp, setShowPopUp] = useState(false);
    const { data } = useAuthContext();
    const router = useRouter();

    const { isPending, mutate } = addToCard({
        onSuccess: () => {
            setCount(1);
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
                className="flex justify-center items-center rounded-md pl-4 pr-4 border border-[#b0bc8e] text-[#b0bc8e] min-w-[100px]"
                onClick={() => addToCardProduct()}
            >{isPending ? <FiLoader /> : 'В кошик'}</button>
            {
                showPopUp ?
                    <div
                        className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-6 py-3 text-white text-lg rounded-xl shadow-lg transition-all duration-300 scale-100 bg-green-500`}
                    >
                        <div className="flex items-center gap-2">
                            <FiCheckCircle className="text-white text-2xl" />
                            <span>Товар додано у кошик</span>
                        </div>
                    </div> : null


            }
        </div>
    )
}