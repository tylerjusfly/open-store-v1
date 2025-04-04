import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  limit: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, limit, totalItems }) => {
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row items-center justify-between px-4 py-3 mt-4">
      <p className="text-sm text-gray-700">
        Viewing{" "}
        <span className="font-medium">
          {(currentPage - 1) * limit + 1}-{Math.min(currentPage * limit, totalPages * limit)}
        </span>{" "}
        of <span className="font-medium">{totalItems}</span> results
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-gray-500 bg-gray-100 border rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
