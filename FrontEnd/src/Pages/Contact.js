import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContactData } from '../store/contectSlice';

const Contact = () => {
  const dispatch = useDispatch();
  const contactData = useSelector((state) => state.contact.contactData);

  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(setContactData({ [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('contactData', JSON.stringify(contactData));
    alert('Message sent!');
  };

  return (
    <div className="bg-gray-900 min-h-screen py-16">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">Contact Us</h1>
        <p className="text-lg text-gray-300 mb-8 text-center">
          We’d love to hear from you! Whether you have questions, feedback, or just want to get in touch, feel free to drop us a message.
        </p>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-semibold mb-2">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                value={contactData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                value={contactData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-white font-semibold mb-2">Message</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                value={contactData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 rounded-md bg-gray-900 text-white"
              />
            </div>
            <button
              type="submit"
              className= "bg-gradient-to-r from-green-400 via-blue-500 to-purple-60 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;