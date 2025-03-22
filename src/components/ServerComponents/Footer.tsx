import { IStoreDetails } from "@/types/store";

type FooterProps = {
  store: IStoreDetails
}

export default function Footer({store}: FooterProps) {
    return (
      <footer className="text-gray-700 bg-gray-100 mx-6 mb-6 p-8 rounded-b-lg">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold capitalize mb-3">{store?.storename} © 2025</h3>
            <ul className="space-y-2">
              {/* <li><a href="#" className="hover:text-gray-400">What is VPN?</a></li> */}
              {/* <li><a href="#" className="hover:text-gray-400">Check security</a></li> */}
              <li><a href="#" className="hover:text-gray-400">Track Your Order</a></li>
            </ul>
          </div>
  
          {/* Navigation Section */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-400">Reviews</a></li>
              <li><a href="#" className="hover:text-gray-400">Tickets</a></li>
              <li><a href="#" className="hover:text-gray-400">Terms</a></li>
            </ul>
          </div>
  
          {/* Subscription Section */}
          <div>
            <h3 className="text-lg font-semibold font-mono mb-3">Subscribe</h3>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className={`w-full px-4 py-2 text-white rounded-md transition ${store?.customization?.main_color ? `bg-[${store?.customization?.main_color}]` : "bg-[#7367f0]"}`}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="flex justify-between items-center mt-8 border-t border-gray-700 pt-4">
          <div className="flex space-x-4">
            <div className="w-16 h-4 bg-gray-800 rounded-md"></div>
            <div className="w-16 h-4 bg-gray-800 rounded-md"></div>
            <div className="w-16 h-4 bg-gray-800 rounded-md"></div>
          </div>
  
          {/* Language Selector */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold font-mono">🌍Powered By SELLIT</span>
            {/* <select className="bg-gray-800 text-white p-2 rounded-md border border-gray-700 focus:outline-none">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select> */}
          </div>
        </div>
      </footer>
    );
  }
  

//   bg-gray-900 text-white