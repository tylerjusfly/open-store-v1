"use client";

import { IpaymentMethod } from "@/types/store";
import IconifyIcon from "@/uis/Icon";
import ErrorModalWithRouter from "@/uis/Icon/modals/ErrorModalWithRouter";
import { getItemFromStore, useAppStore } from "@/zustand/checkout.store";
import { BadgeDollarSign, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import React, { Fragment, useState } from "react";

const CheckoutPage = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<IpaymentMethod | null>(null);
  const cartProduct = getItemFromStore();
   const setItemToCart = useAppStore((state) => state.setStoreItem);
  const [ErrorModalText, setOpenErrorModalText] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const validateEmail = (email: string) => {
    return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  };

  const pushtoPaymentScreen = () => {
    if (!cartProduct) {
      setOpenErrorModalText("An Error Occured, Failed to proceed");
      return;
    }
    if (!paymentMethod) {
      setOpenErrorModalText("Payment method is not selected, Failed to proceed");
      return;
    }

    if (!email) {
      setOpenErrorModalText("Email is required, Failed to proceed");
      return;
    }

    if (!validateEmail(email)) {
      setOpenErrorModalText("Please enter a valid email address.");
      return;
    }

    setItemToCart({
      ...cartProduct,
      paymentMethod: paymentMethod,
      buyer_email: email
    });

    if (Object.values(cartProduct).some(value => value === "")) {
      setOpenErrorModalText("An Error Occurred, Failed to proceed");
      return;
    }

    // Call Endpoint to check if user has not been added to blacklist

    console.log("all passed", cartProduct)

  };

  return (
    <Fragment>
      <div className="flex mx-6 items-center justify-center">
        <div className="relative w-full bg-gray-100 p-6 border border-gray-100">
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

          {/* Express Checkout */}
          <div className="max-w-2xl mx-auto p-4 font-sans flex flex-col gap-6">
            <div>
              <h2 className="text-center text-sm font-medium mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setPaymentMethod("stripe")}
                  className="bg-[#6461fc] cursor-pointer text-white py-1 px-4 gap-3 rounded flex items-center justify-center whitespace-nowrap min-w-[120px]"
                >
                  <span className="font-semibold text-sm">Stripe</span>
                  <IconifyIcon icon="bi:stripe" className="w-6 h-6 rounded-md" color={"white"} />
                </button>
                <button
                  onClick={() => setPaymentMethod("paypal")}
                  className="bg-[#003087] cursor-pointer text-white py-1 px-4 gap-3 rounded flex items-center justify-center whitespace-nowrap min-w-[120px]"
                >
                  <span className="font-semibold text-sm">PayPal</span>
                  <IconifyIcon icon="logos:paypal" color="white" className="w-6 h-6 rounded-md" />
                </button>
                <button
                  onClick={() => setPaymentMethod("coinbase")}
                  className="bg-[#0857fe] cursor-pointer text-white py-1 px-4 gap-3 rounded flex items-center justify-center whitespace-nowrap min-w-[120px]"
                >
                  <span className="font-semibold text-sm">Coinbase</span>
                  <IconifyIcon icon="token:coinbase" color="white" className="w-6 h-6 rounded-md" />
                </button>
                <button
                  onClick={() => setPaymentMethod("cashapp")}
                  className="bg-[#08d038] cursor-pointer text-white py-1 px-4 gap-3 rounded flex items-center justify-center whitespace-nowrap min-w-[120px]"
                >
                  <span className="font-semibold text-sm">Cashapp</span>
                  <IconifyIcon icon="cib:cashapp" color="white" className="w-6 h-6 rounded-md" />
                </button>
              </div>
              <div className="flex items-center justify-center text-sm text-gray-500 mb-8">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="px-4 uppercase text-xs">AND CONTINUE BELOW TO A PAYMENT SCREEN</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>
            </div>

            <div>
              <h2 className="font-medium mb-4">Contact Information</h2>
              <div className="mb-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 border border-gray-300 rounded"
                />
              </div>

              <button
                onClick={pushtoPaymentScreen}
                disabled={paymentMethod === null}
                style={{
                  // backgroundColor: store?.customization?.main_color || "#7367f0",
                  backgroundColor: "#7367f0",
                }}
                className={`w-full disabled:cursor-not-allowed flex cursor-pointer justify-center gap-4 px-4 py-2 text-white rounded-md transition`}
              >
                <span className="self-center font-bold"> Proceed to payment with {paymentMethod}</span>
                <IconifyIcon icon="mynaui:forward-solid" color="white" className="w-6 h-6 self-center rounded-md" />
              </button>
            </div>
          </div>

          {/* Express Checkout Ends */}
        </div>
      </div>
      {ErrorModalText && <ErrorModalWithRouter data={ErrorModalText} setOpenErrorModalText={setOpenErrorModalText} />}
    </Fragment>
  );
};

export default CheckoutPage;
