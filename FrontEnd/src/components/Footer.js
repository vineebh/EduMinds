import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import LOGO from "../assests/img/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-[#1F1F1F] text-gray-300 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Logo and Description */}
        <div className="flex items-center">
          <img
            src={LOGO}
            alt="EduMinds Logo"
            className="h-16 w-auto mr-4 object-cover"
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
              className="hover:text-blue-500 transition duration-300"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-500 transition duration-300"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-500 transition duration-300"
            >
              Contact
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex space-x-6 text-lg">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition duration-300"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 transition duration-300"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-lg text-white mt-8 pt-4 border-t-4 border-gray-200">
        © {new Date().getFullYear()} EduMinds. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
