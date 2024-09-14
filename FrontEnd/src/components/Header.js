import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../firebase/auth";
import { setIdToken, setLoginStatus } from "../store/authSlice";

const Header = () => {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await signOutUser();
      localStorage.removeItem("idToken");
      dispatch(setIdToken(null));
      dispatch(setLoginStatus());
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-neutral-900 to-zinc-600 shadow-lg fixed w-full top-0 mb-10 left-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-bold text-white">EduTech</div>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
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
                d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex space-x-8 text-lg md:text-2xl text-white absolute md:relative top-16 left-0 md:top-auto md:left-auto bg-neutral-900 md:bg-transparent w-full md:w-auto transition-transform duration-300`}
        >
          <Link
            to="/"
            className="block py-2 px-4 md:py-0 md:px-0 hover:text-gray-300 transition duration-300 text-lg font-medium"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block py-2 px-4 md:py-0 md:px-0 hover:text-gray-300 transition duration-300 text-lg font-medium"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="block py-2 px-4 md:py-0 md:px-0 hover:text-gray-300 transition duration-300 text-lg font-medium"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 px-4 md:py-0 md:px-0 hover:text-gray-300 transition duration-300 text-lg font-medium"
          >
            Contact
          </Link>
        </nav>

        {/* Authentication Buttons */}
        <div className="space-x-2 hidden md:flex">
          {loginStatus ? (
            <button
              onClick={logoutHandler}
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Authentication Buttons for Mobile */}
      <div className={`${
            menuOpen ? "block" : "hidden"
          } md:hidden w-full flex justify-end px-6 py-2`}>
        {loginStatus ? (
          <button
            onClick={logoutHandler}
            className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/auth"
            className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
