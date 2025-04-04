import { IStoreDetails } from "@/types/store";
import Link from "next/link";

type HeaderProps = {
  store: IStoreDetails
}

export default function Header({store}: HeaderProps) {
  return (
    <header className="m-0 md:mx-6 md:mt-6 p-4 rounded-t-lg text-gray-700 bg-gray-100">
      {/* Left Side - Store Info */}
      <div className="flex items-center justify-between space-x-3">
        <Link href="/">
          <img
            src={store?.display_picture || "/attachment.png"}
            alt="Store Logo"
            className="h-12 w-12 rounded-full object-cover"
          />
        </Link>

        <button
          style={{
            backgroundColor: store?.customization?.main_color || "#7367f0",
          }}
          className={`px-5 py-2 text-white rounded-full transition`}
        >
          + Create Ticket
        </button>
      </div>
      {/* flex-wrap md:flex-nowrap items-center justify-between */}

      {/* <span className="text-xl font-semibold font-mono">{store?.storename || ""}</span> */}
      {/* Center - Navigation Links */}
      {/* <nav className="flex items-center my-3 md:mt-0 space-x-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/products" className="hover:text-blue-600 transition">
          Products
        </Link>
        <Link href="/reviews" className="hover:text-blue-600 transition">
          Reviews
        </Link>
      </nav> */}
    </header>
  );
}