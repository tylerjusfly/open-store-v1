import { cn } from "@/configs/utils";
import React from "react";

export default function ProductSkeleton() {
  return (
    <div
      className={cn(
        "bg-[#0D0A1A] border-transparent border-2 rounded-lg p-5 shadow-lg relative animate-pulse"
      )}
    >
      {/* Rating badge skeleton */}
      <div className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-2 py-1 rounded-md w-12 h-6"></div>

      {/* Product Image skeleton */}
      <div className="w-full h-40 bg-gray-700 rounded-md"></div>

      {/* Product Info skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-6 bg-gray-700 rounded-md w-3/4"></div>
        <div className="h-6 bg-gray-700 rounded-md w-1/2"></div>
      </div>

      {/* Stock status skeleton */}
      <div className="h-4 bg-gray-700 rounded-md w-20 mt-2"></div>
    </div>
  );
}