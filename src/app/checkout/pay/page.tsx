"use client";

import { useStore } from "@/components/Providers/StoreContext";
import { APIResponse, serverRequest } from "@/configs/serverApi";
import { hexToRgba } from "@/configs/utils";
import IconifyIcon from "@/uis/Icon";
import ErrorModalWithRouter from "@/uis/Icon/modals/ErrorModalWithRouter";
import { getItemFromStore } from "@/zustand/checkout.store";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LeftSide from "./LeftSide";

type IOrderReq = { id: string };
type IPaymentReq = { url: string };

const Pay = () => {
  const { store } = useStore();
  const cartProduct = getItemFromStore();
  const router = useRouter();
  const [proceedingOrder, setProceedingOrder] = useState(false);

  if (!cartProduct) {
    return <ErrorModalWithRouter data={"No available to product to pay for."} setOpenErrorModalText={() => {}} />;
  }

  const doCreateOrder = async () => {
    try {
      setProceedingOrder(true);
      const OrderPayload = {
        productid: cartProduct.id,
        qty: cartProduct.quantity,
        payment_gateway: cartProduct.paymentMethod,
        order_from: cartProduct.buyer_email,
      };
      const response: APIResponse<IOrderReq> = await serverRequest("orders", "POST", OrderPayload);

      if (response.success) {
        const paymentPayload = { orderid: response.result.id };

        if (cartProduct.paymentMethod === "stripe") {
          const paymentresponse: APIResponse<IPaymentReq> = await serverRequest("stripe/vendor/payment", "POST", paymentPayload);

          router.push(`/orders/${response.result.id}`);
          window.open(paymentresponse.result.url, "_blank");
        }

        if (cartProduct.paymentMethod === "cashapp") {
          const paymentresponse: APIResponse<IPaymentReq> = await serverRequest(
            "stripe/cashapp/vendor/payment",
            "POST",
            paymentPayload
          );

          router.push(`/orders/${response.result.id}`);
          window.open(paymentresponse.result.url, "_blank");
        }
      }
    } catch (error) {
      console.log("Err ==>", error);
    } finally {
      setProceedingOrder(false);
    }
  };

  return (
    <div className="bg-gray-100 mx-0 md:mx-6 text-gray-700 p-6">
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

      <div className="max-w-full mt-5 mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <LeftSide cartProduct={cartProduct} store={store} />

        <div className="space-y-5">
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
            <button
              onClick={doCreateOrder}
              style={{
                backgroundImage: `linear-gradient(to left, ${store?.customization?.main_color || "#7367f0"} ,#555)`,
              }}
              className="w-full cursor-pointer mt-6 py-3 rounded-full flex justify-center gap-3 items-center"
            >
              <span className="font-bold">Pay</span>
              {proceedingOrder && (
                <IconifyIcon icon="line-md:loading-loop" color="white" className="w-6 h-6 self-center rounded-md" />
              )}
            </button>
            <p className="text-xs text-gray-400 mt-2 text-center">
              By tapping "Pay", you agree to our <span className="text-purple-400 cursor-pointer">Terms of Service</span>
            </p>
          </div>

          {/* Coupon Code */}
          <div className="bg-[#0A0217] p-6 rounded-lg flex gap-2">
            <input
              type="text"
              placeholder="Enter a coupon or promo code"
              className="flex-1 bg-[#10082A] p-3 rounded-lg text-white outline-none"
            />
            <button
              style={{
                backgroundImage: `linear-gradient(to right, ${store?.customization?.main_color || "#7367f0"} ,#555)`,
              }}
              className="px-4 py-2 rounded-full cursor-pointer flex justify-center gap-1 items-center"
            >
              <span className="font-bold text-white">Apply</span>
              <IconifyIcon icon="line-md:loading-loop" color="white" className="w-6 h-6 self-center rounded-md" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pay;
