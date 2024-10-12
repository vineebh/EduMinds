import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo or Title */}
        <div className="text-xl font-bold">
          <span>EduMinds</span>
          <div className="hidden md:block mt-2 text-left">
            EduTech is committed to accessible and enjoyable learning for all. Our vision is to provide education regardless of location or background.
          </div>
        </div>

        {/* Footer Links for Desktop view (Centered) */}
        <div className="hidden md:flex flex-col items-center mt-4 md:mt-0 md:ml-6 p-4 border-2 border-dashed border-gray-400 rounded-lg bg-transparent">
          <Link
            to="/"
            className="hover:text-blue-600 transition duration-300 py-1"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="hover:text-blue-600 transition duration-300 py-1"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 transition duration-300 py-1"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 transition duration-300 py-1"
          >
            Contact
          </Link>
        </div>

        {/* Footer Links for Mobile view (Right aligned) */}
        <div className="flex flex-col items-end md:hidden space-y-2 text-sm text-center mt-4">
          <Link
            to="/"
            className="hover:text-blue-600 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="hover:text-blue-600 transition duration-300"
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="hover:text-blue-600 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-600 transition duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="hidden md:flex flex-col items-center mt-4 md:mt-0 md:ml-6 p-4 space-x bg-transparent">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition duration-300"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-200 hover:text-blue-600 mt-4">
        © {new Date().getFullYear()} EduMinds. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
