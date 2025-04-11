import { hexToRgba } from "@/configs/utils";
import { paymentOptions } from "@/types/payment";
import { IStoreDetails } from "@/types/store";
import IconifyIcon from "@/uis/Icon";
import { IStoreItem } from "@/zustand/checkout.store";
import Image from "next/image";
import React, { Fragment } from "react";

type LeftProps = {
  cartProduct: IStoreItem;
  store: IStoreDetails | null;
};

const LeftSide = ({ cartProduct, store }: LeftProps) => {
  const payment = paymentOptions[cartProduct?.paymentMethod || "stripe"];

  return (
    <Fragment>
      <div className="space-y-5">
        <div
          style={{
            backgroundImage: `linear-gradient(to right, ${store?.main_color || "#7367f0"} ,#555)`,
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
            backgroundImage: `linear-gradient(to right, ${store?.main_color || "#7367f0"} ,#555)`,
          }}
          className="text-white p-6 rounded-lg"
        >
          <h2 className="text-xl font-bold">Payment method</h2>
          <div className="flex gap-4 mt-4">
            {payment && (
              <div
                style={{
                  backgroundImage: `linear-gradient(to left, ${hexToRgba("#333")}, #000)`,
                }}
                className="flex w-full p-4 rounded-lg flex-row border-none cursor-pointer space-x-4"
              >
                <IconifyIcon icon={payment.icon} className="w-10 h-10 rounded-md" color={payment.color} />
                <div>
                  <p className="text-sm font-medium text-gray-100">{payment.title}</p>
                  <p className="text-sm text-gray-500">
                    Payment ${(cartProduct.cost * cartProduct.quantity).toFixed(2)} to {cartProduct.paymentMethod || "stripe"}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Product Summary */}
        <div
          style={{
            backgroundImage: `linear-gradient(to right, ${store?.main_color || "#7367f0"} ,#555)`,
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
  );
};

export default LeftSide;

{
  /* <div className="flex justify-between items-center bg-gray-50 border rounded-xl p-4">
            <div className="flex items-center space-x-4">
              <IconifyIcon icon="meteor-icons:coinbase" className="w-10 h-10 rounded-md" color={"#0857ff"} />
              <div>
                <p className="text-sm font-medium text-gray-700">Coinbase Commerce</p>
                <p className="text-sm text-gray-500">Connect your Coinbase account.</p>
              </div>
            </div>
            {paymentStatus["coinbase"] ? (
              <>
                {paymentStatus["coinbase"].active ? (
                  <Button
                    onClick={() => {
                      setPaymentToDisconnect("coinbase");
                      setDisconnectPayment(true);
                    }}
                    className="max-w-[8rem] bg-error-main hover:bg-error-dark"
                  >
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    onClick={() => setConnectCoinbase(true)}
                    className="max-w-[8rem] bg-primary-gradient hover:bg-darkprimary"
                  >
                    Connect
                  </Button>
                )}
              </>
            ) : (
              <div className="flex justify-center items-center">
                <Button loading className="max-w-[8rem] bg-secondary-main hover:bg-secondary-dark">
                  Loading
                </Button>
              </div>
            )}
          </div> */
}
