// Videos.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios

const Videos = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate for navigation

  /*// Fetch course data from backend
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:1000/course");
  //       setCourses(response.data);
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //       setError("Failed to fetch courses. Please try again later.");
  //     }
  //   };

  //   fetchCourses();
  // }, []); */


  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  // Navigate to the VideoPlayerPage with the video URL in the state
  const handleWatchClick = (videoUrl, topic_name) => {
    navigate("/video", { state: { videoUrl, topic_name } });
  };

  return (
    <div className="text-white container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Video Lectures</h2>

      {/* Render the list of video lectures */}
      <div className="grid grid-cols-1 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 w-full flex justify-between items-center cursor-pointer"
          >
            <div className="flex-grow">
              <h3 className="text-xl font-semibold">{course.topic_name}</h3>
             
            </div>
            <button
              onClick={() => handleWatchClick(course.video_url, course.topic_name)} // Navigate to the video page
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Watch
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Videos;
