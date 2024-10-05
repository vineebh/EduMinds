import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import { setIdToken, setLoginStatus, setIsLogin } from "../store/authSlice";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await signOutUser();
      localStorage.removeItem("idToken");
      localStorage.removeItem("userID");
      dispatch(setIdToken(null));
      dispatch(setLoginStatus(false));
      dispatch(setIsLogin(false));
      navigate("/auth");
      handleLinkClick();
      console.log("clicked");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-neutral-900 to-zinc-600 shadow-lg fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-2 flex justify-between  lg:flex lg:justify-evenly lg:items-center ">
        <div className="text-2xl md:text-3xl font-bold text-white">
          <span className="pt-4">EduMinds</span>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <nav className="hidden md:flex md:items-center space-x-8 text-lg md:text-2xl text-white mx-auto">
          <Link
            to="/"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/courses"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Courses
          </Link>

          <Link
            to="/about"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 hover:text-gray-300 transition duration-300"
          >
            Contact
          </Link>
        </nav>

        {loginStatus ? (
          <button
            onClick={logoutHandler}
            className=" hidden lg:flex md:flex py-3 px-3 text-sm rounded bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className=" hidden lg:flex md:flex py-3 px-4 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
          >
            Login
          </Link>
        )}
      </div>

      {/* Sidebar for mobile view */}

      <div
        className={`fixed text-center top-0 right-0 h-full w-64 bg-neutral-900 p-4 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="text-white text-3xl float-right"
          onClick={toggleSidebar}
        >
          <IoMdClose />
        </button>
        <div className="flex flex-col mt-4">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="py-2 text-white hover:text-gray-300 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/courses"
            onClick={handleLinkClick}
            className="py-2 text-white hover:text-gray-300 transition duration-300"
          >
            Courses
          </Link>

          <Link
            to="/about"
            onClick={handleLinkClick}
            className="py-2 text-white hover:text-gray-300 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            className="py-2 text-white hover:text-gray-300 transition duration-300"
          >
            Contact
          </Link>
          { loginStatus? (
            <button
              onClick={logoutHandler}
               className="py-1 px-4 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              onClick={handleLinkClick}
               className="py-1 px-2 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;