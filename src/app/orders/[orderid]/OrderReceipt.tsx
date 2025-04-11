"use client";

import { formatDate } from "@/configs/utils";
import { IOrderDetails } from "@/types/orders";

type Props = {
  data: IOrderDetails;
};

export default function SellitReceipt({ data }: Props) {

  const afterPlatformFee = (data.product_price * data.qty) - parseInt(data.platform_fee)
  const couponAmount = ((data.product_price * data.coupon_value) / 100) * +data.qty

  return (
    <div className="bg-white p-6 font-sans max-w-full mx-0 md:mx-6">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center">
          <div className="mr-2">
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              <path d="M15.5 11c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold capitalize">{data.shop_id.storename}®</h1>
          </div>
        </div>
        {data.order_status === "paid" ? (
          <div className="text-green-600 font-bold text-xl">PAID</div>
        ) : (
          <div className="text-red-600 font-bold text-xl">UNPAID</div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-6">Payment Receipt #{data.id}</h2>

        <div className="mb-6">
          <p className="text-gray-700 uppercase">{data.order_from}</p>
          <p className="text-gray-700">2407 Bay Crest Ln</p>
          <p className="text-gray-700">Evansville GA 30922-2197</p>
        </div>
      </div>

      {/* <div className="border-t border-b py-3 mb-4 flex justify-between">
        <div className="text-sm text-gray-600">Credit Card Payment: Visa ending in 3865</div>
        <div className="font-semibold">${data.total_amount.toFixed(2)}</div>
      </div> */}

      <div className="mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 font-semibold">Date</th>
              <th className="text-left py-2 font-semibold">Type</th>
              <th className="text-left py-2 font-semibold">Description</th>
              <th className="text-right py-2 font-semibold">Total</th>
              <th className="text-right py-2 font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-gray-700">
              <td className="py-2"></td>
              <td className="py-2">{data.product_type}</td>
              <td className="py-2">{data.product_name} x {data.qty}</td>
              <td className="py-2 text-right">${data.product_price.toFixed(2)}</td>
              <td className="py-2 text-right">${(data.product_price * data.qty).toFixed(2)}</td>
            </tr>
            <tr className="border-b text-gray-700">
              <td className="py-2">{formatDate(data.created_at)}</td>
              <td className="py-2">Platform</td>
              <td className="py-2 text-blue-500">Platform fee</td>
              <td className="py-2 text-right text-red-500">${parseInt(data.platform_fee).toFixed(2)}</td>
              <td className="py-2 text-right">${afterPlatformFee.toFixed(2)}</td>
            </tr>
            <tr className="border-b text-gray-700">
              <td className="py-2">{formatDate(data.created_at)}</td>
              <td className="py-2">Coupon</td>
              <td className="py-2">
                {data.applied_coupon
                  ? data.applied_coupon === "percent"
                    ? `${data.coupon_value}% OFF`
                    : `$${data.coupon_value} OFF`
                  : "--"}
              </td>
              <td className="py-2 text-right">${couponAmount.toFixed(2)}</td>
              <td className="py-2 text-right">${(afterPlatformFee - couponAmount).toFixed(2)}</td>
            </tr>
            <tr className="text-gray-700">
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2"></td>
              <td className="py-2 text-right">Total balance</td>
              <td className="py-2 text-right">$ {data.total_amount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-sm text-gray-600 mb-6">
        <p>
          To see your entire transaction history, <span className="text-blue-500">visit your reports page</span>.
        </p>
      </div>

      <div className="text-sm text-gray-700 mb-6">
        <p>ARRRRRRR... we thank you for y'er business!</p>
      </div>

      <div className="text-xs text-gray-500">
        <p>
          <span className="capitalize">Sellit Marketplace </span> LLC · PO Box 9146, Jackson, WY 83002 · <span className="text-blue-500">{data.shop_id?.discord_link|| "contact@sellit.com"}</span>
        </p>
      </div>
    </div>
  );
}
