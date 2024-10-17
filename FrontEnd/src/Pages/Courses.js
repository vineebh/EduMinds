import React, { useState, useEffect } from "react";
import axios from "axios";
import Course from "../components/Course";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";

const Courses = () => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const [courses, setCourses] = useState([]);
  const [enroll, setEnroll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userInfo = useSelector((state) => state.auth.userInfo);

  // Fetch courses data from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${API_URL}/courses`);
        setCourses(response.data);
      } catch (error) {
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch enrollment data based on user info
  useEffect(() => {
    const checkEnroll = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/checkuser?email=${userInfo.userID}`
        );

        if (res.status === 200 && res.data.data) {
          setEnroll(
            res.data.data.map((course) => ({
              course_title: course.course_title,
              level: course.level,
            }))
          );
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          const msg = error.response.data.msg;
          if (msg === "Email not found") {
            setError("Email not found. Please check your email and try again.");
          } else if (msg === "No courses found for this email") {
            setError("No courses found for this email.");
          }
        } else {
          setError("Failed to fetch enrollment data. Please try again later.");
        }
      }
    };

    if (userInfo.userID) {
      checkEnroll();
    }
  }, [userInfo?.userID]);

  if (loading) {
    return <Loader size="20" color="from-yellow-300 to-blue-600" />; // Show loader while loading
  }


  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-700 to-slate-900 p-6">
      <div className="relative space-y-6 py-4">
        {courses.map((data) => (
          <div
            key={data.c_id}
            className="relative w-full max-w-full mx-auto px-8 rounded-lg"
          >
            <Course courseData={data} Enroll={enroll} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
