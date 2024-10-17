import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons from react-icons
import {
  createUserEmailAndPass,
  signInUserEmailAndPass,
  signInWithGoogle,
} from "../../firebase/auth";
import { setIdToken, setIsLogin, setLoginStatus } from "../../store/authSlice";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const Auth = () => {
  const [isLogin, setLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    firebase: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });

    // Validate name for signup
    if (name === "name" && !isLogin && value.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name must be at least 3 characters long",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    }

    // Validate password
    if (name === "password" && value.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = authData;

    // Check for errors before proceeding
    if (!isLogin && name.length < 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name must be at least 3 characters long",
      }));
      return;
    }

    if (password.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters long",
      }));
      return;
    }

    try {
      if (isLogin) {
        const response = await signInUserEmailAndPass(email, password);
        const token = response.user.accessToken;
        localStorage.setItem("idToken", token);
        localStorage.setItem("userID", response.user.email); // store email id in local storage
        dispatch(setIdToken(token));
        dispatch(setLoginStatus(true));

        navigate(window.history.back());
        toast.success("Login Successfully"); // Toast notification for successful login


      } else {
        const response = await createUserEmailAndPass(email, password);
        const token = response.user.accessToken;
        localStorage.setItem("idToken", token);
        localStorage.setItem("userID", response.user.email); // store email id in local storage
        dispatch(setIdToken(token));
        dispatch(setIsLogin(true));

        navigate(window.history.back());
        toast.success("Signup Successfully"); // Toast notification for successful signup

      }
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firebase: error.message,
      }));
    }
  };

  const toggleAuthMode = () => {
    setLogin((login) => !login);
    setAuthData({
      name: "",
      email: "",
      password: "",
    });

    setErrors({ name: "", email: "", password: "", firebase: "" });
  };

  const loginWithGoogleHandler = async () => {
    try {
      const result = await signInWithGoogle();
      const token = result.user.accessToken;
      localStorage.setItem("idToken", token);
      localStorage.setItem("userID", result.user.email); // store email id in local storage
      dispatch(setIdToken(token));
      dispatch(setLoginStatus(true));
      dispatch(setIsLogin(true))
      toast.success("Login Successfully"); // Toast notification for successful Google login
      navigate(window.history.back());

    } catch (error) {
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center fixed inset-0 px-6">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md h-auto">
        <h1 className="text-3xl font-bold text-red-500 mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-300 font-semibold mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={authData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={authData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </div>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-gray-300 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              id="password"
              name="password"
              placeholder="Your Password"
              value={authData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white"
            />
            <span
              className="absolute right-3 top-11 text-gray-400 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition duration-300 w-full"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
          <button
            type="button"
            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 w-full mt-3"
            onClick={loginWithGoogleHandler}
          >
            Login With Google
          </button>
          <button
            type="button"
            className="bg-gray-700 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition duration-300 w-full mt-3"
            onClick={toggleAuthMode}
          >
            {isLogin
              ? "Don't Have an Account? Signup"
              : "Already Have an Account? Login"}
          </button>


        </form>
      </div>
    </div>
  );
};

export default Auth;
