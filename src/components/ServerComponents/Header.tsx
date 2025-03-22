import { IStoreDetails } from "@/types/store";
import Link from "next/link";

type HeaderProps = {
  store: IStoreDetails
}

export default function Header({store}: HeaderProps) {
    return (
      <header className="flex flex-wrap md:flex-nowrap items-center justify-between mx-6 mt-6 p-4 rounded-t-lg shadow-md text-gray-700 bg-gray-100">
      {/* Left Side - Store Info */}
      <div className="flex items-center space-x-3">
        <img src={store?.display_picture || "/attachment.png"} alt="Store Logo" className="h-12 w-12 rounded-full object-cover" />
        <span className="text-xl font-semibold font-mono">{store?.storename || ""}</span>
      </div>
    
      {/* Center - Navigation Links */}
      <nav className="flex items-center space-x-6 font-medium">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/products" className="hover:text-blue-600 transition">Products</Link>
        <Link href="/reviews" className="hover:text-blue-600 transition">Reviews</Link>
      </nav>
    
      {/* Right Side - Action Button */}
      <button className={`px-5 py-2 text-white rounded-md ${store?.customization?.main_color ? `bg-[${store?.customization?.main_color}]` : "bg-[#7367f0]"} transition`}>
        + Create Ticket
      </button>
    </header>
    
    );
  }
  
//   https://t4.ftcdn.net/jpg/00/93/91/93/240_F_93919369_6hvglsKja2qsop5DXfUHqq1VThTRhyQd.jpg