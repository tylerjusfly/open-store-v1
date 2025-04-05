"use client";

import { useStore } from "@/components/Providers/StoreContext";
import { APIResponse, serverRequest } from "@/configs/serverApi";
import { hexToRgba } from "@/configs/utils";
import IconifyIcon from "@/uis/Icon";
import ErrorModalWithRouter from "@/uis/Icon/modals/ErrorModalWithRouter";
import { getItemFromStore, useAppStore } from "@/zustand/checkout.store";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import LeftSide from "./LeftSide";

type ICouponReq = { id: string; new_cost: number };
type IOrderReq = { id: string };
type IPaymentReq = { url: string };

const paymentEndpoints: Record<string, string> = {
  stripe: "stripe/vendor/payment",
  cashapp: "stripe/cashapp/vendor/payment",
  coinbase: "coinbase/vendor/payment",
  // Add more as needed
};

const Pay = () => {
  const { store } = useStore();
  const cartProduct = getItemFromStore();
  const router = useRouter();
  const setItemToCart = useAppStore((state) => state.setStoreItem);
  const [proceedingOrder, setProceedingOrder] = useState(false);
  const [proceedingCoupon, setProceedingCoupon] = useState(false);
  const [ErrorModalText, setOpenErrorModalText] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string>("");

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

        const method = cartProduct.paymentMethod || "stripe";
        const endpoint = paymentEndpoints[method];

        if (endpoint) {
          const paymentresponse: APIResponse<IPaymentReq> = await serverRequest(endpoint, "POST", paymentPayload);

          router.push(`/orders/${response.result.id}`);
          window.open(paymentresponse.result.url, "_blank");
        } else {
          setOpenErrorModalText(`No payment endpoint defined for ${method}`);
        }
      }
    } catch (error: any) {
      setOpenErrorModalText(error?.message || "Failed to create payment order");
    } finally {
      setProceedingOrder(false);
    }
  };

  const checkCoupon = async () => {
    if (!couponCode) {
      setOpenErrorModalText("Please enter a promo code before applying.");
      return;
    }

    try {
      const payload = {
        store_id: store?.id,
        coupon_id: couponCode,
        product_id: cartProduct.id,
      };
      setProceedingCoupon(true);
      const resp: APIResponse<ICouponReq> = await serverRequest("coupons/check", "POST", payload);

      if (resp.success) {
        setItemToCart({
          ...cartProduct,
          cost: resp.result.new_cost,
          coupon_id: resp.result.id || undefined,
        });

        // Open a successmodal to show 20% off
      }
    } catch (error: any) {
      setOpenErrorModalText(error?.message || "This Coupon Is Invalid.");
      setProceedingCoupon(false);
    }
  };

  return (
    <Fragment>
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
                disabled={proceedingOrder}
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
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter a coupon or promo code"
                className="flex-1 bg-[#10082A] p-3 rounded-lg text-white outline-none"
              />
              <button
                disabled={proceedingCoupon}
                onClick={checkCoupon}
                style={{
                  backgroundImage: `linear-gradient(to right, ${store?.customization?.main_color || "#7367f0"} ,#555)`,
                }}
                className="px-4 py-2 rounded-full cursor-pointer flex justify-center gap-1 items-center"
              >
                <span className="font-bold text-white">Apply</span>
                {proceedingCoupon && (
                  <IconifyIcon icon="line-md:loading-loop" color="white" className="w-6 h-6 self-center rounded-md" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {ErrorModalText && (
        <ErrorModalWithRouter btn_msg="Back To Checkout" data={ErrorModalText} setOpenErrorModalText={setOpenErrorModalText} />
      )}
    </Fragment>
  );
};

export default Pay;
