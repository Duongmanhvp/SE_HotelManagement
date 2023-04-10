import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0 mr-4 text-primary hover:opacity-80 duration-200">
            {/* Logo */}
            <Link
              to="/home"
              className="flex justify-start items-center"
              aria-label="Cruip"
            >
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
              <p className="ml-3 font-bold text-2xl">Booking</p>
            </Link>
          </div>

          {/* Site navigation */}
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-start flex-wrap items-center">
              <li>
                <Link
                  to="/home"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    document
                      .getElementById("about")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    document
                      .getElementById("contact")
                      .scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Contact
                </Link>
              </li>
            </ul>
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li className="rounded-full bg-primary hover:bg-primary/80 duration-200">
                <Link
                  to="/signin"
                  className="font-medium text-white px-6 py-3 flex items-center "
                >
                  Sign in
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
