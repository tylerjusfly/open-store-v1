"use client";

import { useStore } from "@/components/Providers/StoreContext";
import { hexToRgba } from "@/configs/utils";
import { IProductsDetails } from "@/types/product";
import { useAppStore } from "@/zustand/checkout.store";
import { Minus, Plus, Zap, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";

type Props = {
  product_data: IProductsDetails;
};

export default function ProductPurchase({ product_data }: Props) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { store } = useStore();
  const setItemToCart = useAppStore((state) => state.setStoreItem);
  const price = product_data.amount;
  const stock = product_data.stock;
  const [ErrorModalText, setOpenErrorModalText] = useState<string | null>(null);

  const onSetItemTOCart = () => {
    if (product_data.stock === 0) {
      setOpenErrorModalText(`This product is currently out of stock.`);
      return;
    }
    if (quantity > product_data.max_purchase) {
      setOpenErrorModalText(`Maximum allowed quantity is ${product_data.max_purchase}.`);
      return;
    }
    if (quantity < product_data.min_purchase) {
      setOpenErrorModalText(`Minimum allowed quantity is ${product_data.min_purchase}.`);
      return;
    }

    setItemToCart({
      id: product_data.id,
      name: product_data.name,
      quantity: quantity,
      cost: product_data.amount,
      img_src: product_data.image_src,
    });

    router.push("/checkout");
  };

  return (
    <Fragment>
      <div
        style={{
          backgroundImage: `linear-gradient(to top, #f7fafc, ${hexToRgba(store?.main_color || "#7367f0", 1)})`,
        }}
        className="text-white p-6 rounded-xl shadow-lg w-96 space-y-4 relative"
      >
        {/* Price Section */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Price</span>
          <span className="text-2xl font-bold">${price.toFixed(2)}</span>
        </div>

        {/* Delivery Time */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Delivery Time</span>
          <span className="flex items-center text-purple-400">
            <Zap className="h-4 w-4 mr-1" /> Instant
          </span>
        </div>

        {/* Stock */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">In Stock</span>
          <span className="flex items-center text-purple-400">
            <Check className="h-4 w-4 mr-1" /> {stock}
          </span>
        </div>

        {/* Quantity Selector */}
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">Quantity</span>
          <div className="flex items-center bg-black px-3 py-1 rounded-lg">
            <button className="text-white px-2 cursor-pointer" onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}>
              <Minus className="h-5 w-5" />
            </button>
            <span className="px-4">{quantity}</span>
            <button
              className="text-white px-2 cursor-pointer"
              onClick={() => setQuantity((prev) => Math.min(stock || 1, prev + 1))}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Buttons */}
        <button
          style={{
            color: store?.main_color || "#7367f0",
          }}
          className="w-full py-2 rounded-lg bg-white text-purple-900 font-semibold"
        >
          Add to Cart
        </button>
        <button
          style={{
            backgroundImage: `linear-gradient(to left, ${store?.main_color || "#7367f0"} ,#000)`,
          }}
          onClick={() => {
            if (product_data) {
              onSetItemTOCart();
            }
          }}
          className="w-full cursor-pointer py-2 rounded-full text-white font-semibold"
        >
          Buy Now
        </button>
      </div>

      {ErrorModalText && <ProductModal data={ErrorModalText} setOpenErrorModalText={setOpenErrorModalText} />}
    </Fragment>
  );
}

type ProductModalProps = {
  data: string;
  setOpenErrorModalText: (val: string | null) => void;
};

const ProductModal = ({ data, setOpenErrorModalText }: ProductModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96 text-center relative">
        {/* Message */}
        <p className="text-gray-600 font-semibold font-mono text-lg">{data}</p>

        {/* Button */}
        <button
          onClick={() => setOpenErrorModalText(null)}
          className="mt-6 w-full cursor-pointer bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
        >
          Back to product
        </button>
      </div>
    </div>
  );
};
