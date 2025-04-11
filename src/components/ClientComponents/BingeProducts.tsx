"use client";

import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "../Providers/StoreContext";
import { APIResponse, serverRequest } from "@/configs/serverApi";
import ProductSkeleton from "../Skeletons/ProductSkeletons";
import { IProducts } from "@/types/product";
import ProductLink from "../ServerComponents/ProductLink";
import { IStoreDetails } from "@/types/store";
import EmptyProduct from "./products/EmptyProduct";
import { hexToRgba } from "@/configs/utils";

const BingeProducts = () => {
  const { store } = useStore();
  const [PRODUCTS, SetProducts] = useState<IProducts[]>([]);
  const [fetchhingProducts, SetFetchingProducts] = useState<boolean>(true);

  const fetchthreeProducts = async () => {
    try {
      const resp: APIResponse<IProducts[]> = await serverRequest(`product/store?storeid=${store?.id}&limit=3`, "GET", null);

      SetProducts(resp.result || []);
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      SetFetchingProducts(false);
    }
  };

  useEffect(() => {
    if (fetchhingProducts) {
      fetchthreeProducts();
    }
  }, []);

  return (
    <section
      style={{
        backgroundImage: `linear-gradient(to right, #f7fafc, ${hexToRgba(store?.main_color || "#7367f0")})`,
      }}
      className="m-0 md:mx-6 text-gray-700 py-12 relative"
    >
      {/* Floating particles effect (optional) */}
      {/* <div className="absolute inset-0 bg-gray-200 bg-opacity-70"></div> */}

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Products</h2>

        {fetchhingProducts ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : (
          <Fragment>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {/* Display empty component if no store or product */}
              {PRODUCTS.map((product) => (
                <ProductLink key={product.id} product={product} store={store as IStoreDetails} />
              ))}
            </div>

            {PRODUCTS.length === 0 && <EmptyProduct />}
          </Fragment>
        )}
      </div>
    </section>
  );
};

export default BingeProducts;
