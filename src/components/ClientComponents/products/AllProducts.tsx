"use client";

import { useStore } from "@/components/Providers/StoreContext";
import ProductLink from "@/components/ServerComponents/ProductLink";
import ProductSkeleton from "@/components/Skeletons/ProductSkeletons";
import { APIResponse, serverRequest } from "@/configs/serverApi";
import { ICategory, IPaging, IProducts } from "@/types/product";
import { IStoreDetails } from "@/types/store";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import ProductHeader from "./SearchBar";
import Pagination from "../reuseables/Pagination";
import EmptyProduct from "./EmptyProduct";

const LIMIT = 20;

const AllProducts = () => {
  const { store } = useStore();
  const [PRODUCTS, SetProducts] = useState<IProducts[]>([]);
  const [Categories, SetCategories] = useState<ICategory[]>([]);
  const [fetchhingProducts, SetFetchingProducts] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [paging, setPaging] = useState<IPaging>({
    currentPage: 1,
    itemsPerPage: 15,
    totalItems: 0,
    totalpages: 0,
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");

  const fetchCategories = async () => {
    try {
      const resp: APIResponse<ICategory[]> = await serverRequest(`categories/?shop_id=${store?.id}`, "GET", null);
      SetCategories(resp.result);
    } catch (error) {}
  };

  const fetchPaginatedProducts = useCallback(async () => {
    SetFetchingProducts(true);
    try {
      const resp: APIResponse<IProducts[]> = await serverRequest(
        `product/store?storeid=${store?.id}&limit=${LIMIT}&page=${page}&categoryid=${selectedCategory}&search=${search}`,
        "GET",
        null
      );

      SetProducts(resp.result || []);
      if (resp.paging) {
        setPaging(resp?.paging);
      }
      console.log(resp.result, "result");
    } catch (error) {
      console.log("ERROR", error);
    } finally {
      SetFetchingProducts(false);
    }
  }, [page, selectedCategory, search]);

  useEffect(() => {
    fetchPaginatedProducts();

    if (Categories.length === 0) {
      fetchCategories();
    }
  }, [selectedCategory, search, page]);

  return (
    <section className="bg-gray-200 mx-0 md:mx-6 text-gray-700 px-6 py-12 relative">
      <ProductHeader
        selectedCategory={selectedCategory}
        categories={Categories}
        onCategoryChange={(val: string) => {
          setSelectedCategory(val);
        }}
        setSearch={setSearch}
      />

      <div className="bg-gray-100 py-6 px-8">
        {/* Display empty component if no store or product */}

        {fetchhingProducts ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {PRODUCTS.map((product) => (
                <ProductLink key={product.id} product={product} store={store as IStoreDetails} />
              ))}
            </div>

            {PRODUCTS.length === 0 && <EmptyProduct />}
          </>
        )}

        <Pagination
          limit={LIMIT}
          currentPage={paging.currentPage}
          totalPages={paging.totalpages}
          onPageChange={(val) => setPage(val)}
        />
      </div>
    </section>
  );
};

export default AllProducts;
