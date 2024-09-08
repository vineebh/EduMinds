import React from 'react';
import '.././index.css'; 

const Course = ({ courseData }) => {
  const { courseName, description, image, professorName, duration } = courseData;

  return (
    <div className="p-8 rounded-3xl shadow-2xl h-full bg-white bg-opacity-20 backdrop-blur-md px-6 border border-gray-700 p-10">
      {/* Course Name */}
      <h1 className="text-4xl font-bold text-gradient text-white text-transparent bg-clip-text text-center mb-8 drop-shadow-xl">{courseName}</h1>
      
      {/* Content Layout */}
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-6">
          <img
            src={image}
            alt={courseName}
            className="w-full h-56 object-cover rounded-lg border-4 shadow-lg"
          />
          {/* Duration and Instructor */}
          <div className="flex flex-col text-gray-100 text-sm mt-4 space-y-1">
            <span className="font-semibold">Duration: {duration}</span>
            <span className="font-semibold">Instructor: {professorName}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full md:w-2/3">
          <p className="text-white text-lg leading-relaxed mb-6 pr-4">
            <span className='font-bold text-xl'>Description :</span> {description}
          </p>
        </div>
      </div>

      {/* Enroll Button */}
      <div className="flex justify-end ">
        <button
          className="py-3 px-8 mr-4 rounded-lg bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
        >
          Enroll
        </button>
      </div>
    </div>
  );
};

export default Course;
