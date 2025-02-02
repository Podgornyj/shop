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