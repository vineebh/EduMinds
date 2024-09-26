import React from 'react';

const ProgressBar = () => {
  const courseLevel = 'Intermediate'; // Example course level
  const progressPercentage = 55; // Example progress percentage

  return (
    <div className="w-full max-w-xs mx-auto bg-gray-800 rounded-lg shadow-lg flex flex-col p-6 ">
      <h3 className="text-2xl font-semibold text-white mb-2 text-center">Course Level</h3>
      <p className="text-yellow-400 font-bold text-lg mb-4 text-center">{courseLevel}</p>
      
      <div className="bg-gray-600 rounded-full h-4 w-full overflow-hidden mb-2">
        <div 
          className="bg-yellow-400 h-full rounded-full transition-all duration-300" 
          style={{ width: `${progressPercentage}%` }} // Dynamically set the width
        ></div>
      </div>
      
      <p className="text-gray-300 text-center">{progressPercentage}% Completed</p>
    </div>
  );
};

export default ProgressBar;
