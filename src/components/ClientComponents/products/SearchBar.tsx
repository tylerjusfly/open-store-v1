import { ICategory } from "@/types/product";
import { Search } from "lucide-react";
import { useState } from "react";

type Props = {
    categories : ICategory[]
    onCategoryChange: (value:string) => void
    selectedCategory: string
    setSearch: (val:string) => void
}

export default function ProductHeader({ categories, onCategoryChange, selectedCategory, setSearch }:Props) {


  const handleCategoryChange = (event:any) => {
    onCategoryChange(event.target.value); // Pass the selected category to the parent component
  };

  return (
    <div className="bg-gray-100 py-6 px-8 flex items-center justify-between">
      {/* <div>
        <h1 className="text-2xl font-semibold text-gray-900 mt-1">
          Explore All Products
        </h1>
      </div> */}

      {/* Search Input */}
      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full max-w-md">
        <Search className="text-gray-400 h-5 w-5 mr-2" />
        <input
          type="text"
          onChange={(e)=> {
            if(e.target.value.length > 2){
                setSearch(e.target.value)
            }else if(e.target.value.length > 0){
                setSearch("")
            }
          }}
          placeholder="Search for products or items"
          className="w-full outline-none text-gray-600 placeholder-gray-400"
        />
      </div>

      {/* Category Filter */}
      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border border-gray-300 rounded-md p-2 text-gray-600 outline-none"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.category_name}
          </option>
        ))}
      </select>
    </div>
  );
}
