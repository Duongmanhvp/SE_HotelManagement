import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarImg from "../../assets/avatar.jpg";
import UserContext from "../../context/UserContext";
import { useCookies } from "react-cookie";

function Header() {
  const [top, setTop] = useState(true);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies("userId");
  const [user, setUser] = useContext(UserContext);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  async function handleLogout() {
    setUser(null);
    removeCookie("userId");
    navigate("/");
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
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
                  to={"/home"}
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
                  to={"/home"}
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

            <ul className="flex flex-grow justify-end flex-wrap gap-8 items-center">
              {user && (
                <li className="relative">
                  <img
                    src={AvatarImg}
                    className="w-12 h-12 object-cover rounded-full cursor-pointer"
                    onClick={() => setDropdown(!dropdown)}
                  ></img>
                  <div
                    className={`absolute top-full -left-1/2 mt-1 duration-200 overflow-hidden ${
                      dropdown ? "h-fit" : "h-0"
                    }`}
                  >
                    <Dropdown logout={handleLogout}></Dropdown>
                  </div>
                </li>
              )}
              {!user && (
                <li className="rounded-full bg-primary hover:bg-primary/80 duration-200">
                  <Link
                    to="/login"
                    className="font-medium text-white px-6 py-3 flex items-center "
                  >
                    Sign in
                  </Link>
                </li>
              )}
              {user && user.role === "ADMIN" && (
                <li className="rounded-full bg-tranparent border-2 border-primary hover:bg-primary/80 duration-200">
                  <Link
                    to="/admin"
                    className="font-medium text-black px-6 py-3 flex items-center hover:text-white"
                  >
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

function Dropdown({ logout }) {
  return (
    <div
      id="dropdown"
      className=" bg-white divide-y divide-gray-100 rounded-lg shadow w-52 dark:bg-gray-700 border-[1px]"
    >
      <ul
        className="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <Link
            to={"/account"}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to={"/account/update"}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Update profile
          </Link>
        </li>
        <li>
          <Link
            to={"/account/password"}
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Change password
          </Link>
        </li>
        <li
          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
          onClick={logout}
        >
          Sign out
        </li>
      </ul>
    </div>
  );
}

export default Header;
