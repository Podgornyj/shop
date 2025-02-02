import { useQuery, useMutation } from "@tanstack/react-query";
import { ProductTypes, addTocardType } from "../types/ProductTypes";

const getProducts = async (category: string) => {
    const res = await fetch(`http://localhost:3001/api/products?category=${category}`, { credentials: 'include' });
    if (res.status !== 200) {
        return null;
    }
    return res.json();
}

export const getProductsQuery = (category: string) => useQuery<ProductTypes[]>({
    queryKey: ['carpets'],
    queryFn: () => getProducts(category),
    staleTime: 60 * 60 * 1000
})

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