export default function EmptyProduct() {
    return (
      <div className="flex w-auto items-center justify-center bg-gray-100">
        <div className="p-6 text-center">
          <img
            src="https://www.sapmedicines.com/frontend/images/empty-cart.jpg"
            className="w-40 mx-auto"
          />
          <h2 className="text-lg font-semibold text-gray-800 mt-4">
          Looks Like There's Nothing to <span className="text-orange-500 font-bold">Show</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">
          Search Some Products to Get Started.
          </p>
        </div>
      </div>
    );
  }
  