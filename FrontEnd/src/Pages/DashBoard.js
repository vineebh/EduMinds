import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Videos from "../components/Videos";
import Article from "../components/Article";
import ProgressBar from "../components/ProgressBar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashBoard = () => {
  const [view, setView] = useState("video");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = useLocation();
  const { C_ID, level, courseTitle, State } = location.state || {};
  console.log(location)
  const [Level, setLevel] = useState(0);

  useEffect(() => {
    const postUserData = async () => {
      try {
        const response = await axios.post("http://localhost:1000/userdata", {
          email_id: userInfo.userID,
          course_title: courseTitle,
          Level: level,
        });
        if (response.success) {
          toast.success("enrolled");
        }

        console.log("Response:", response.data);
      } catch (error) {
        console.error(
          "Post error:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to enroll course. Please try again later.");
      }
    };

    const fetchCourses = async () => {
      if (!C_ID) return;

      try {
        const response = await axios.get(
          `http://localhost:1000/course/${C_ID}`
        );
        setCourses(response.data);
      } catch (error) {
        console.error(
          "Fetch error:",
          error.response ? error.response.data : error.message
        );
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (State === "New") {
      postUserData();
    }
    fetchCourses();
  }, [C_ID, courseTitle, level, userInfo?.userID, State]);

  useEffect(() => {
    if (level === "Beginner") {
      setLevel(1);
    } else if (level === "Intermediate") {
      setLevel(2);
    } else if (level === "Advanced") {
      setLevel(3);
    }
  }, []);

  const filteredData = courses.filter((data) => data.level === Level);

  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen py-8">
      <section className="container mx-auto flex flex-col lg:flex-row gap-8 items-start mt-10 px-4">
        {/* Left section - Video/Article */}

        <article className="relative shadow-2xl flex-1 border lg:border-none p-6 bg-gray-800 border-gray-600 rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
          <h1 className="text-white font-bold text-3xl mb-6 text-center">
            {courseTitle}
          </h1>

          <div className="h-1 w-3/4 mx-auto bg-gradient-to-r from-gray-800 via-yellow-500 to-gray-800 my-4 rounded-full"></div>
          <aside className="lg:hidden w-full  flex justify-center lg:w-1/4 p-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
            <ProgressBar Level={level} />
          </aside>
          {/* Toggle Switch */}
          <label className="flex items-center justify-center mt-8 mb-6 cursor-pointer relative">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={view === "article"}
              onChange={() => setView(view === "video" ? "article" : "video")}
            />
            <div className="w-52 h-12 bg-gray-700 rounded-full shadow-inner relative transition-all duration-500 ease-in-out flex items-center">
              <div
                className={`absolute w-1/2 h-full bg-gradient-to-r from-yellow-400 to-teal-500 rounded-full transition-all duration-500 ease-in-out ${
                  view === "article" ? "translate-x-full" : "translate-x-0"
                }`}
              />
              <div className="w-full flex justify-between text-white text-sm font-semibold px-6">
                <span>Video</span>
                <span>Article</span>
              </div>
              <div
                className={`absolute left-2 w-10 h-10 bg-gray-900 rounded-full shadow-lg flex items-center justify-center transition-transform duration-500 ease-in-out transform ${
                  view === "article" ? "translate-x-40" : "translate-x-0"
                }`}
              >
                <span className="text-white text-xl">
                  {view === "video" ? "▶️" : "📰"}
                </span>
              </div>
            </div>
          </label>

          {/* Conditional Rendering based on the selected view */}
          <div className="mt-8">
            {view === "video" ? (
              <Videos courses={filteredData} />
            ) : (
              <Article courses={filteredData} />
            )}
          </div>
        </article>

        {/* Right section - Progress Bar */}
        <aside className="hidden lg:block lg:w-1/4 p-2 rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
          <ProgressBar Level={level} />
        </aside>
      </section>
    </main>
  );
};

export default DashBoard;
