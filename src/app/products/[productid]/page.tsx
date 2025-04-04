import EmptyProduct from "@/components/ClientComponents/products/EmptyProduct";
import { APIResponse, serverRequest } from "@/configs/serverApi";
import { IProductsDetails } from "@/types/product";
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

  return (
    <div className="min-h-screen bg-gray-100 m-0 md:mx-6 px-6 py-6">
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

          <div className="bg-gray-100 p-6 rounded-lg flex items-center justify-center">
            <ProductPurchase product_data={product_data} />
          </div>
        </div>
      ) : (
        <EmptyProduct />
      )}
    </div>
  );
}