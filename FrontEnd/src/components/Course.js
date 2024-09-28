import React from 'react';
import '.././index.css'; 
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Course = ({ courseData }) => {
  const { courseName, description, image, professorName, duration } = courseData;
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const navigate = useNavigate();

  const enrollHandler = () => {
    if (loginStatus === true) {
      navigate(`/Assessment/${courseName}`); // Pass courseName to the URL
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl h-full bg-white bg-opacity-20 backdrop-blur-md border border-gray-700 mt-8 sm:mt-10 lg:mt-12">
      {/* Course Name */}
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gradient text-white text-transparent bg-clip-text text-center mb-4 sm:mb-6 lg:mb-8 drop-shadow-xl">
        {courseName}
      </h1>

      {/* Content Layout */}
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:pr-4 lg:pr-6">
          <img
            src={image}
            alt={courseName}
            className="w-full h-36 sm:h-40 md:h-48 lg:h-56 object-cover rounded-lg border-4 shadow-lg"
          />
          {/* Duration and Instructor */}
          <div className="flex flex-col text-gray-100 text-xs sm:text-sm mt-4 space-y-1">
            <span className="font-semibold">Duration: {duration}</span>
            <span className="font-semibold">Instructor: {professorName}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full sm:w-2/3 mt-4 sm:mt-0">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 lg:mb-8 pr-0 sm:pr-4 lg:pr-6 text-white">
            <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">Description:</span> {description}
          </p>
        </div>
      </div>

      {/* Enroll Button */}
      <div className="flex justify-center sm:justify-end mt-4 sm:mt-6 lg:mt-8">
        <button
          className="py-2 px-4 sm:py-2.5 sm:px-6 md:py-3 md:px-8 lg:py-3 lg:px-8 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
          onClick={enrollHandler}
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default Course;
