'use client'
import { redirect } from 'next/navigation'
//Core
import { useQuery } from '@tanstack/react-query';
//Components
import { ProductCard } from '../components/ProductCard';
//Queries
import { getProductsQuery } from '../queries/productQueries';


export default function Carpets() {

    const { data, isLoading, isError } = getProductsQuery('carpets');

    return (
        <div className="grid grid-cols-[250px,1fr] min-h-[450px]">
            <div>
                Menu
            </div>
            <div className='flex gap-3 flex-wrap pt-5 pb-5'>
                {isLoading ? <div>Loading...</div> : null}
                {isError ? <div>Sorry - error</div> : null}
                {
                    data && data.map((product) => {
                        return <ProductCard clickFn={() => redirect(`/carpets/${product.id}`)} key={product.id} product={product} />
                    })
                }
            </div>
        </div>
    );
}