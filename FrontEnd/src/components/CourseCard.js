import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, imageUrl, link }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto my-4">
      {/* Image Section */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-32 sm:h-36 md:h-40 lg:h-48 object-cover"
      />
      
      {/* Content Section */}
      <div className="p-4 md:p-5">
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-blue-600 mb-2">
          {title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mb-4">
          {description}
        </p>
        
        {/* Learn More Button */}
        <div className="flex justify-center md:justify-end">
          <Link to={link}>
            <button className="bg-blue-600 text-xs sm:text-sm md:text-base lg:text-lg text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 w-full md:w-auto">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
