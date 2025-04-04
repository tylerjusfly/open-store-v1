"use client";

import React from "react";
import { useStore } from "../Providers/StoreContext";
import { cn, hexToRgba } from "@/configs/utils";
import Link from "next/link";

const HeroSection = () => {
  const { store } = useStore();
  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to right, #f7fafc, ${hexToRgba(store?.customization?.main_color || "#7367f0")})`,
      }}
      className="flex m-0 md:mx-6 flex-col md:flex-row items-center justify-between p-10 text-gray-700"
    >
      <div className="max-w-xl">
        <p className="text-sm uppercase text-gray-500 font-semibold">🚀🚀</p>
        <h1 className="text-4xl font-bold  mt-2 capitalize">Welcome to {store?.storename}</h1>
        <p className="text-lg text-gray-600 mt-3">{store?.hero_text}</p>
        <button
          style={{
            backgroundColor: store?.customization?.main_color || "#7367f0",
          }}
          className={`mt-6 cursor-pointer text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md`}
        >
          <Link href="/products">View Our Products</Link>
        </button>
      </div>

      <div className="mt-10 md:mt-0">
        {store?.customization?.hero_svg ? (
          <img src={store.customization.hero_svg} alt="Illustration" className="w-64 md:w-80" />
        ) : (
          <img src="/hero-img.svg" alt="Illustration" className="w-64 md:w-80" />
        )}
      </div>
    </section>
  );
};

export default HeroSection;
