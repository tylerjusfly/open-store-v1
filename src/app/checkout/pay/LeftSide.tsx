import { hexToRgba } from '@/configs/utils'
import { IStoreDetails } from '@/types/store'
import { IStoreItem } from '@/zustand/checkout.store'
import Image from 'next/image'
import React, { Fragment } from 'react'

type LeftProps = {
    cartProduct: IStoreItem
    store: IStoreDetails | null
}

const LeftSide = ({cartProduct, store}:LeftProps) => {
  return (
   <Fragment>
    <div className="space-y-5">
          <div
            style={{
              backgroundImage: `linear-gradient(to right, ${store?.customization?.main_color || "#7367f0"} ,#555)`,
            }}
            className="text-white p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold">Order summary</h2>
            <div
              style={{
                backgroundImage: `linear-gradient(to left, ${hexToRgba("#333")} ,#000)`,
              }}
              className="p-4 rounded-lg mt-4"
            >
              <p className="font-medium">{cartProduct?.buyer_email || ""}</p>
              <p className="text-sm text-gray-400">We’ll instantly deliver the product to this email address</p>
            </div>
          </div>

          {/* Payment Method */}
          <div
            style={{
              backgroundImage: `linear-gradient(to right, ${store?.customization?.main_color || "#7367f0"} ,#555)`,
            }}
            className="text-white p-6 rounded-lg"
          >
            <h2 className="text-xl font-bold">Payment method</h2>
            <div className="flex gap-4 mt-4">
              <div
                style={{
                  backgroundImage: `linear-gradient(to left, ${hexToRgba("#333")} ,#000)`,
                }}
                className="flex-1 p-4 rounded-lg border-none cursor-pointer"
              >
                <p className="font-medium">💳 {cartProduct.paymentMethod}</p>
                <p className="text-sm">${cartProduct.cost.toFixed(2)}</p>
              </div>
            </div>
          </div>
          {/* Product Summary */}
          <div
            style={{
              backgroundImage: `linear-gradient(to right, ${store?.customization?.main_color || "#7367f0"} ,#555)`,
            }}
            className="text-black p-6 rounded-lg flex items-center gap-4"
          >
            <div className="bg-[#10082A] p-6 rounded-lg w-20 h-20 flex items-center justify-center">
              <Image src={cartProduct?.img_src || "/attachment.png"} alt={`${cartProduct.name} image`} width={100} height={100} />
            </div>
            <div>
              <h3 className="font-bold text-ellipsis">{cartProduct.name}</h3>
              <p className="text-sm text-white">
                ${cartProduct.cost.toFixed(2)} • {cartProduct.quantity} item • Instant Email Delivery
              </p>
            </div>
          </div>
        </div>
   </Fragment>
  )
}

export default LeftSide