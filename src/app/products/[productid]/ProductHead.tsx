"use client";

import React from "react";
import { IProductsDetails } from "@/types/product";
import { BadgeDollarSign, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type ProductHeadProps = {
  product_data: IProductsDetails;
};

const ProductHead = ({ product_data }: ProductHeadProps) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center">
      <button
        onClick={() => {
          router.back();
        }}
        className="p-2 cursor-pointer rounded-full bg-gray-200"
      >
        <ChevronLeft className="h-5 w-5 text-gray-600" />
      </button>
      <button className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-600 font-medium">
        <BadgeDollarSign className="h-4 w-4 mr-2" />
        {product_data?.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
      </button>
    </div>
  );
};

export default ProductHead;
