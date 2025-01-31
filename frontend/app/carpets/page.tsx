'use client'
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link'
import { ProductCard } from '../components/ProductCard';

type Product = {
    id: string
    discount?: Boolean
    image: string
    newcollection?: Boolean
    hit?: Boolean
    discountpercentage?: number
    name: string
    description: string
    price: number
    category: string
    stock: number
    createdAt: Date
};

export default function Carpets() {

    const getCarpets = async () => {
        const res = await fetch('http://localhost:3001/api/products', { credentials: 'include' });
        if (res.status !== 200) {
            return null;
        }
        return res.json();
    }

    const { data, isLoading, isError } = useQuery<Product[]>({
        queryKey: ['carpets'],
        queryFn: getCarpets,
        staleTime: 60 * 60 * 1000
    })

    return (
        <div className="grid grid-cols-[250px,1fr] min-h-[450px]">
            <div>
                Menu
                {/* <nav className="flex flex-col gap-2 p-10 shadow-lg">
                    <Link href={`/about`}>Про нас</Link>
                    <Link href={`/payment`}>Оплата і доставка</Link>
                    <Link href={`/exchange`}>Обмін та повернення</Link>
                    <Link href={`/contacts`}>Контактна інформація</Link>
                    <Link href={`/blog`}>Блог</Link>
                </nav> */}
            </div>
            <div className='flex gap-3 flex-wrap pt-5 pb-5'>
                {
                    data && data.map((product) => {
                        return <ProductCard key={product.id} product={product} />
                    })
                }
            </div>
        </div>
    );
}