import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12 border-t border-gray-200 flex flex-col justify-center items-center">
          <div className="sm:col-span-12 lg:col-span-3 flex items-center gap-4">
            <div className="mb-2">
              <Link to="/" className="block text-primary" aria-label="Cruip">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 -rotate-90"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </Link>
            </div>
            <div className="text-sm text-gray-600">
              <Link
                to="#"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Terms
              </Link>{" "}
              ·{" "}
              <Link
                to="#"
                className="text-gray-600 hover:text-gray-900 hover:underline transition duration-150 ease-in-out"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <p className="font-semibold opacity-50 text-md">
            2023 @ Copyright. Author by UET Restaurant nhóm 6.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
