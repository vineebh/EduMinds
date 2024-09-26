import React, { useState, useEffect } from "react";
import Course from "../components/Course";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // Fetch course data from backend
  useEffect(() => {
    fetch("http://localhost:1000/courses")
      .then((res) => {
        if (!res.ok) {
          console.error("HTTP error:", res.status);
          throw new Error("Network response was not ok");
        }
        
        return res.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch courses. Please try again later.");
      });
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (

    <div className="min-h-screen bg-gradient-to-r from-slate-700 to-slate-900 p-6 ">
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
