import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

type ErrorModalWithRouterProps = {
  data: string;
  setOpenErrorModalText: (val: string | null) => void;
  btn_msg?: string;
};

const ErrorModalWithRouter = ({ data, setOpenErrorModalText, btn_msg }: ErrorModalWithRouterProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900/20 backdrop-blur">
      <div className="bg-white p-10 rounded-lg shadow-lg w-96 text-center relative">
        {/* Message */}
        <p className="text-gray-600 font-semibold font-mono text-lg">{data}</p>

        {/* Button */}
        <button
          onClick={() => {
            setOpenErrorModalText(null);
          }}
          className="mt-6 w-full cursor-pointer bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
        >
          {btn_msg ? btn_msg : "Back to product"}
        </button>
      </div>
    </div>
  );
};

export default ErrorModalWithRouter;
