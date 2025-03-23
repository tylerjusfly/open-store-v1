"use client";

import React, { Fragment, useEffect, useState } from 'react'
import { useStore } from '../Providers/StoreContext';
import { cn } from '@/configs/utils';
import Link from 'next/link';
import { APIResponse, serverRequest } from '@/configs/serverApi';
import ProductSkeleton from '../Skeletons/ProductSkeletons';
import { IProducts } from '@/types/product';
import ProductLink from '../ServerComponents/ProductLink';
import { IStoreDetails } from '@/types/store';

const BingeProducts = () => {
    const { store } = useStore();
    const [PRODUCTS, SetProducts] = useState<IProducts[]>([])
    const [fetchhingProducts, SetFetchingProducts] = useState<boolean>(true)

    const fetchthreeProducts = async() => {
        try {
            const resp : APIResponse<IProducts[]> = await serverRequest(`product/store?storeid=${store?.id}&limit=3`, "GET", null)

            SetProducts(resp.result|| [])
            
        } catch (error) {
            console.log("ERROR", error)
        }
        finally{
            SetFetchingProducts(false)
        }
    }

    useEffect(() => {
        if(fetchhingProducts){
            fetchthreeProducts()
        }
    }, [])

  return (
    <section
      // style={{
      //   backgroundColor: store?.customization?.main_color || "#7367f0",
      //   opacity: 30,
      //   backgroundBlendMode
      // }}
      className="bg-gray-200 mx-6 text-gray-700 py-12 relative"
    >
      {/* Floating particles effect (optional) */}
      {/* <div className="absolute inset-0 bg-gray-200 bg-opacity-70"></div> */}

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Products</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Display empty component if no store or product */}
          {PRODUCTS.map((product) => (
            <ProductLink key={product.id} product={product} store={store as IStoreDetails} />
          ))}

          {fetchhingProducts && (
            <Fragment>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </Fragment>
          )}
        </div>

        {/* View All Button
        <button className="mt-6 px-6 py-3 bg-purple-600 text-white rounded-md text-lg hover:bg-purple-700 transition">
          View all products →
        </button> */}
      </div>
    </section>
  );
}

export default BingeProducts