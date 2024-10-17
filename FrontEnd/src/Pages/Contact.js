import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContactData } from '../store/contectSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const Contact = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const contactData = useSelector((state) => state.contact.contactData);

  const [errors, setErrors] = useState({});

  // Pre-fill the email field if the user is logged in
  useEffect(() => {
    if (loginStatus && userInfo?.userID) {
      dispatch(setContactData({ email: userInfo.userID }));
    }
  }, [loginStatus, userInfo, dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setContactData({ [id]: value }));
  };

  const validateForm = () => {
    let formErrors = {};
    if (!contactData.name) formErrors.name = "Name is required";
    if (!loginStatus && !contactData.email) formErrors.email = "Email is required";
    if (!loginStatus && contactData.email && !/\S+@\S+\.\S+/.test(contactData.email)) {
      formErrors.email = "Email address is invalid";
    }
    if (!contactData.message) formErrors.message = "Message is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const response = await axios.post("http://localhost:1000/contactus", {
        email_id: contactData.email,
        name: contactData.name, 
        message: contactData.message
      })
      if (response.status === 201){
        toast.success('Message sent!');
      }
      
      // Reset form fields by dispatching an action
      dispatch(setContactData({ name: "", email: loginStatus ? userInfo.userID : "", message: "" }));
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className="bg-gray-900 fixed lg:pt-16 inset-0 flex items-center justify-center sm:py-16">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-3xl w-full mt-20">
        {/* Contact Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-gray-300 mb-8 text-center">
          We’d love to hear from you! Whether you have questions, feedback, or just want to get in touch, feel free to drop us a message.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-white font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              value={contactData.name || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white"
            />
            {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Email Input */}
          {!loginStatus && (
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={contactData.email || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
              {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
            </div>
          )}

          {/* Message Input */}
          <div className="mb-4">
            <label htmlFor="message" className="block text-white font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Your Message"
              value={contactData.message || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white"
            />
            {errors.message && <p className="text-red-500 mt-1">{errors.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:scale-105 transition-transform duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
