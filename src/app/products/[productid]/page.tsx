import EmptyProduct from "@/components/ClientComponents/products/EmptyProduct";
import { APIResponse, serverRequest } from "@/configs/serverApi";
import { IProductsDetails } from "@/types/product";
import { ChevronLeft, MessageCircle, BadgeAlert, BadgeCheckIcon, BadgeDollarSign } from "lucide-react";
import { Fragment } from "react";
import ProductPurchase from "./ProductPurchase";
import ProductHead from "./ProductHead";

type Props = {
  params: Promise<{ productid: string }>;
};

const fetchProductDetails = async (id: string) => {
  try {
    const data: APIResponse<IProductsDetails> = await serverRequest(`product/view/?id=${id}`, "GET", null, "no-cache");

    return data.result;
  } catch (error) {
    return null;
  }
};

export default async function ProductDetails({ params }: Props) {
  const productid = (await params).productid;
  const product_data = await fetchProductDetails(productid);
  console.log(product_data);

  return (
    <div className="min-h-screen bg-gray-100 mx-6 px-6 py-6">
      {product_data ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">  
          {/* Left Section (Product Details) */}
          <div>

            <ProductHead product_data={product_data} />
           
            {/* Product Info */}
            <div className="mt-6 text-center">
              <h1 className="text-xl font-semibold text-gray-900">{product_data?.name || ""}</h1>
              <p className="text-gray-500 text-sm">Type: {product_data?.product_type}</p>
            </div>

            {/* Product Image */}
            <div className="flex justify-center mt-4">
              <img
                src={product_data?.image_src || "/attachment.png"}
                alt={product_data?.name || "Product Image"}
                className="w-72 h-48 object-cover rounded-lg shadow-md"
              />
            </div>

            {/* Store Information */}
            <div className="bg-white p-4 mt-6 rounded-lg shadow-md">
              <p className="text-gray-900 font-medium">
                <span dangerouslySetInnerHTML={{ __html: product_data?.description }} />
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex justify-around mt-6">
              <button className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-2">Overview</button>
              <button className="text-gray-500">Review</button>
            </div>
          </div>

          {/* Right Section (Second Side of the Page) */}
          <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
            <ProductPurchase product_data={product_data}/>
            {/* <p className="text-gray-700 text-lg">Second side of the page</p> */}
          </div>
        </div>
      ) : (
        <EmptyProduct />
      )}
    </div>
);
}
// <Fragment>
//   <div className="min-h-screen bg-gray-100 px-6 mx-6 py-6">
//     {product_data ? (
//         <>
//       <Fragment>
//         <div className="flex justify-between items-center">
//           <button className="p-2 rounded-full bg-gray-200">
//             <ChevronLeft className="h-5 w-5 text-gray-600" />
//           </button>
//           <button className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-gray-600 font-medium">
//             <BadgeDollarSign className="h-4 w-4 mr-2" />
//             {product_data && product_data.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
//           </button>
//         </div>

//         {/* Product Info */}
//         <div className="mt-6 text-center">
//           <h1 className="text-xl font-semibold text-gray-900">{product_data?.name || ""}</h1>
//           <p className="text-gray-500 text-sm">Type: {product_data.product_type}</p>
//         </div>

//         {/* Product Image */}
//         <div className="flex justify-center mt-4">
//           <img
//             src={product_data?.image_src || "/attachment.png"}
//             alt="ProArt Studiobook"
//             className="w-72 h-48 object-cover rounded-lg shadow-md"
//           />
//         </div>

//         {/* Store Information */}
//         <div className="bg-white p-4 mt-6 rounded-lg flex items-center justify-between shadow-md">
//           <div className="flex items-center">
//             <div className="ml-3">
//               <p className="text-gray-900 font-medium">
//                 <span dangerouslySetInnerHTML={{ __html: product_data.description }} />
//               </p>
//             </div>
//           </div>
//           <button className="text-gray-500">&gt;</button>
//         </div>
//         {/* Navigation Tabs */}
//         <div className="flex justify-around mt-6">
//           <button className="text-gray-900 font-semibold border-b-2 border-gray-900 pb-2">Overview</button>
//           <button className="text-gray-500">Specification</button>
//           <button className="text-gray-500">Review</button>
//         </div>
//       </Fragment>

//       <div>second side of the page</div>
//         </>
//     ) : (
//       <EmptyProduct />
//     )}
//   </div>
// </Fragment>
