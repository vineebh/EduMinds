import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ title, description, imageUrl, link }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 border border-transparent shadow-xl rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl mx-auto my-6"
         style={{ maxWidth: '400px', height: '500px' }}>
      {/* Image Section */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-2/5 object-cover rounded-t-lg"
        style={{ maxHeight: '50%' }}
      />
      
      {/* Content Section */}
      <div className="p-5 h-3/5 flex flex-col justify-between bg-slate-900 text-white">
        {/* Title */}
        <h3 className="text-lg md:text-2xl font-bold text-white mb-2">
          {title}
        </h3>
        
        {/* Description with Fixed Height and Overflow */}
        <div className="overflow-hidden text-ellipsis" style={{ maxHeight: '9rem' }}>
          <p className="text-sm md:text-base lg:text-lg opacity-90">
            {description}
          </p>
        </div>

        {/* Learn More Button */}
        <div className="flex justify-center md:justify-end mt-4">
          <Link to={link}>
            <button className="bg-blue-500 hover:bg-blue-600 text-sm md:text-base text-white px-6 py-3 rounded-md shadow-lg transition-all duration-300 w-full md:w-auto">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
