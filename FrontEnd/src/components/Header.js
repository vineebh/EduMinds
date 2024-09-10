import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIdToken, setLoginStatus, setIsLogin } from "../store/authSlice";

const Header = () => {
  const loginStatus = useSelector((state) => state.auth.islogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("idToken");
    dispatch(setIdToken(null));
    dispatch(setLoginStatus(false));
    dispatch(setIsLogin(false));
    navigate('/auth');
  };

  return (
    <header className="bg-black shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-3xl font-bold text-white">EduTech</div>

        <nav className="hidden md:flex space-x-8 text-2xl">
          <Link to="/" className="text-blue-700 hover:text-blue-900 transition duration-300 text-lg font-medium">
            Home
          </Link>
          <Link to="/courses" className="text-blue-700 hover:text-blue-900 transition duration-300 text-lg font-medium">
            Courses
          </Link>
          <Link to="/about" className="text-blue-700 hover:text-blue-900 transition duration-300 text-lg font-medium">
            About
          </Link>
          <Link to="/contact" className="text-blue-700 hover:text-blue-900 transition duration-300 text-lg font-medium">
            Contact
          </Link>
        </nav>

        <div className="space-x-2">
          {loginStatus ? (
            <button
              onClick={logoutHandler}
              className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth" className="bg-blue-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300">
              Login
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};

export default Header;
