import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import LOGO from "../assests/img/logo.jpeg";
import { toast } from "react-toastify";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState(""); // Added state to handle email input

  const submitHandler = async (event) => {
    event.preventDefault(); // Prevents default form submission
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("http://localhost:1000/newsletter", { email });
      toast.success("You have successfully subscribed to our newsletter");
      setEmail(""); // Clears the email input field after success
    } catch (error) {
      console.error(error);
      toast.error("Subscription failed. Please try again.");
    }
  };

  return (
    <footer className="bg-[#1F1F1F] text-gray-300 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and Description */}
        <div className="flex items-center">
          <img
            src={LOGO}
            alt="EduMinds Logo"
            className="h-12 scale-120 mr-4 bg-cover rounded-full"
          />
          <div className="text-lg font-bold text-white">
            EduMinds
            <div className="font-normal w-3/4 md:w-1/2 text-gray-400 hidden md:block mt-1 text-lg">
              EduTech is committed to accessible and enjoyable learning for all.
              Our vision is to provide education regardless of location or
              background.
            </div>
          </div>
        </div>

        {/* Quick Links & Social Media in Horizontal Layout */}
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
          {/* Quick Links */}
          <div className="flex space-x-6 text-sm font-semibold">
            <Link
              to="/"
              className="hover:text-blue-500 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-500 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Newsletter and Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-xl font-bold text-white">Stay Updated</h2>
          <p className="text-gray-400 mt-2 md:ml-4 text-sm">
            Subscribe to our newsletter to stay updated on our latest courses and offers.
          </p>
          <form className="mt-4 flex" onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Updates email state on input change
              className="w-full px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>

          {/* Social Media Icons */}
          <div className="flex space-x-6 text-2xl mt-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-400 mt-12 pt-6 border-t border-gray-700">
        © {new Date().getFullYear()} EduMinds. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
