import { cn } from '@/configs/utils'
import { IProducts } from '@/types/product'
import { IStoreDetails } from '@/types/store'
import Link from 'next/link'
import React from 'react'

type ProductLinkProps = {
    product: IProducts
    store: IStoreDetails
}

const ProductLink = ({product, store}: ProductLinkProps) => {
  return (
    <Link
                href={`/products/${product.id}`}
              key={product.id}
              className={cn("bg-[#0D0A1A] border-[#7367f0] border-2 rounded-lg p-5 shadow-lg relative", store?.customization?.main_color&& `border-[${store?.customization?.main_color}]`)}
            >
              {/* Rating badge */}
              <div className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-2 py-1 rounded-md">
                ⭐ {product?.rating || 0}
              </div>

              {/* Product Image */}
              <img
                src={product.image_src|| "/attachment.png"}
                alt={product.name}
                className="w-full h-40 object-contain rounded-md"
              />

              {/* Product Info */}
              <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
              <p className="text-xl font-bold mt-2">${product.amount}</p>

              {/* Stock status */}
              <span
                className={`text-sm font-medium ${
                  product.stock > 0 
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
              </span>
            </Link>
  )
}

export default ProductLink