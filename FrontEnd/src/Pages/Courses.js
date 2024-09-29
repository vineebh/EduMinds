import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import Course from "../components/Course";
import { useSelector } from "react-redux";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const userInfo = useSelector((state)=>state.auth.userInfo)

  console.log(userInfo.userID)    //got email ID

  // Fetch course data from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:1000/courses");
        setCourses(response.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch courses. Please try again later.");
      }
    };

    fetchCourses();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-700 to-slate-900 p-6">
      <div className="relative space-y-6 py-4">
        {courses.map((data) => (
          <div
            key={data.id}
            className="relative w-full max-w-full mx-auto px-8 rounded-lg"
          >
            <Course courseData={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
