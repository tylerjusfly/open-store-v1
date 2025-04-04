"use client"

import { useStore } from '@/components/Providers/StoreContext';
import ErrorModalWithRouter from '@/uis/Icon/modals/ErrorModalWithRouter';
import { getItemFromStore } from '@/zustand/checkout.store';
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Pay = () => {
    const { store } = useStore();
    const cartProduct = getItemFromStore();
    const router = useRouter()

    if(!cartProduct){
        return (
            <ErrorModalWithRouter data={"No available to product to pay for."} setOpenErrorModalText={()=> {}} />
        )
    }
    
  return (
    <div className="min-h-screen bg-gray-100 mx-6 text-gray-700 p-6">
      
      <div className="flex justify-between items-center">
            <button
              onClick={() => {
                router.back();
              }}
              className="p-2 cursor-pointer rounded-full bg-gray-200"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          </div>

      <div className="max-w-full mt-5 mx-auto grid grid-cols-2 gap-6">
        <div className='space-y-5'>
        {/* Order Summary */}
        <div style={{
             backgroundColor: store?.customization?.main_color || "#7367f0",
            
        }} className="text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold">Order summary</h2>
          <div className="bg-[#10082A] p-4 rounded-lg mt-4">
            <p className="font-medium">{cartProduct?.buyer_email || ""}</p>
            <p className="text-sm text-gray-400">We’ll instantly deliver the product to this email address</p>
          </div>
        </div>

        {/* Payment Method */}
        <div style={{
            backgroundColor: store?.customization?.main_color || "#7367f0",
        }} className="text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold">Payment method</h2>
          <div className="flex gap-4 mt-4">
            <div className="flex-1 bg-[#10082A] p-4 rounded-lg border border-purple-500 cursor-pointer">
              <p className="font-medium">💳 {cartProduct.paymentMethod}</p>
              <p className="text-sm">${cartProduct.cost.toFixed(2)}</p>
            </div>
            
          </div>
        </div>
        {/* Product Summary */}
        <div style={{
            backgroundColor: "white",
        }} className="text-black p-6 rounded-lg flex items-center gap-4">
          <div className="bg-[#10082A] p-6 rounded-lg w-20 h-20 flex items-center justify-center">
            {/* <span className="text-lg font-bold">📷</span> */}
            <Image src={cartProduct?.img_src || "/attachment.png"} alt={`${cartProduct.name} image`} width={100} height={100} />
          </div>
          <div>
            <h3 className="font-bold text-ellipsis">{cartProduct.name}</h3>
            <p className="text-sm text-gray-400">${cartProduct.cost.toFixed(2)} • {cartProduct.quantity} item • Instant Email Delivery</p>
          </div>
        </div>

        </div>

        <div className='space-y-5'>
        {/* Order Summary */}
        <div className="bg-[#0A0217] text-white p-6 rounded-lg">
          <h2 className="text-xl font-bold">Your order</h2>
          <div className="mt-4 flex justify-between text-lg">
            <span>Subtotal</span>
            <span>${(cartProduct.cost * cartProduct.quantity).toFixed(2)}</span>
          </div>
          <div className="mt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${(cartProduct.cost * cartProduct.quantity).toFixed(2)}</span>
          </div>
          <button className="w-full mt-6 bg-gradient-to-r from-purple-500 to-indigo-500 py-3 rounded-lg font-bold">
            Pay
          </button>
          <p className="text-xs text-gray-400 mt-2 text-center">
            By tapping "Pay", you agree to our <span className="text-purple-400">Terms of Service</span>
          </p>
        </div>

        {/* Coupon Code */}
        <div className="bg-[#0A0217] p-6 rounded-lg flex gap-2">
          <input
            type="text"
            placeholder="Enter a coupon or promo code"
            className="flex-1 bg-[#10082A] p-3 rounded-lg text-white outline-none"
          />
          <button className="bg-purple-500 px-4 py-2 rounded-lg font-bold">Apply</button>
        </div>
        </div>



      </div>
    </div>
  )
}

export default Pay