import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { setIsLogin, setIdToken, setLoginStatus } from "../../store/authSlice";
import { signInUserEmailAndPass, createUserEmailAndPass, signOutUser, signInWithGoogle } from "../../firebase/auth";

const Auth = () => {
  const isLogin = useSelector((state) => state.auth.islogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthData({ ...authData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = authData;

    try {
      if (isLogin) {
        const response = await signInUserEmailAndPass(email, password);
        const token = response.user.accessToken;
        localStorage.setItem("idToken", token);
        dispatch(setIdToken(token));
        dispatch(setLoginStatus());
        navigate('/home')
      } else {
        await createUserEmailAndPass(email, password);
      }
      dispatch(setIsLogin(true));
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  const toggleAuthMode = () => {
    dispatch(setIsLogin(!isLogin));
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
      localStorage.removeItem("idToken");
      dispatch(setIdToken(null));
      dispatch(setLoginStatus());
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  const loginWithGoogleHandler = async () => {
    try {
      const result = await signInWithGoogle();
      const token = result.token;
      localStorage.setItem("idToken", token);
      dispatch(setIdToken(token));
      dispatch(setLoginStatus());
      navigate('/home')
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <h1 className="text-3xl font-bold text-blue-800 mb-6 text-center">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-800 font-semibold mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Full Name"
                value={authData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={authData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Your Password"
              value={authData.password}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition duration-300 w-full"
          >
            {isLogin ? "Login" : "Signup"}
          </button>
          <button
            type="button"
            className="px-2 py-3 border border-black bg-red-400 w-full mt-3"
            onClick={loginWithGoogleHandler}
          >
            Login With Google
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition duration-300 w-full my-3"
            onClick={toggleAuthMode}
          >
            {isLogin ? "Don't Have an Account? Signup" : "Already Have an Account? Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
