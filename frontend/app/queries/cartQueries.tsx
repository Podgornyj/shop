import { useQuery, useMutation } from "@tanstack/react-query";
import { ProductTypes, addTocardType } from "../types/ProductTypes";

const addToCardFn = async (data: addTocardType) => {
    const res = await fetch(`http://localhost:3001/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    return res.json();
}

export const addToCard = ({ onSuccess }: { onSuccess: () => void }) => useMutation<ProductTypes, Error, addTocardType>({
    mutationFn: (data) => addToCardFn(data),
    onSuccess
})

const deleteFromCardFn = async (id: string) => {
    const res = await fetch(`http://localhost:3001/api/cart/remove/${id}`, {
        method: 'DELETE',
        credentials: 'include',
    });

    return res.json();
}

export const deleteFromCard = ({ onSuccess }: { onSuccess: () => void }) => useMutation<ProductTypes, Error, string>({
    mutationFn: (id) => deleteFromCardFn(id),
    onSuccess
})

const getCartFn = async () => {
    const res = await fetch(`http://localhost:3001/api/cart`, {
        method: 'GET',
        credentials: 'include',
    });

    return res.json();
}

export const getCart = () => useQuery<ProductTypes, Error>({
    queryKey: ['cart'],
    queryFn: getCartFn,
    staleTime: 0,
    select: (data) => data.items || []
})