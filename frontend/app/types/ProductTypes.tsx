export type ProductTypes = {
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

export type addTocardType = {
    productId: string,
    quantity: number
}

export type CartItemTypes = {
    cartId: string
    id: string
    productId: string
    quantity: number
    product: ProductTypes
}