import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Videos from "../components/Videos";
import Article from "../components/Article";
import ProgressBar from "../components/ProgressBar";
import EnrollmentPopup from "../components/EnrollmentPopup";

const DashBoard = () => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const [view, setView] = useState("video");
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const { C_ID, level, courseTitle, State, from } = location.state || {};
  const [Level, setLevel] = useState(0);

  useEffect(() => {
    // Check if the user is coming from "/assessment" or "/mcq"
    const previousPage = location.state?.from;
    const isComingFromAssessmentOrMCQ =
      previousPage === "/assessment" || previousPage === "/mcq";

    if (isComingFromAssessmentOrMCQ) {
      const handlePopState = (event) => {
        event.preventDefault();
        navigate("/courses");
      };

      window.history.pushState(null, null);
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }
  }, [navigate, location.state?.from]);

  useEffect(() => {
    const postUserData = async () => {
      try {
        await axios.post(`${API_URL}/userdata`, {
          email_id: userInfo.userID,
          course_title: courseTitle,
          Level: level,
        });

        setShowPopup(true);
        return true;
      } catch (error) {
        setError("Failed to enroll course. Please try again later.");
        return false;
      }
    };

    const fetchCourses = async () => {
      if (!C_ID) return;

      try {
        const response = await axios.get(
          `${API_URL}/course/${C_ID}`
        );

        if (response.status === 200) {
          setCourses(response.data);
        }
      } catch (error) {
        setError("Failed to fetch courses. Please try again later.");
      } finally {
        setLoading(false); // End loading once data is fetched
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
  }, [level]);

  const filteredData = courses.filter((data) => data.level === Level);

  return (
    <main className="bg-gradient-to-b from-gray-800 to-gray-900 min-h-screen py-8">
      {/* Show the loader when loading */}
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-t-4 border-yellow-400 rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <>
          <section className="container mx-auto flex flex-col lg:flex-row gap-8 items-start mt-10 px-4">
            {/* Left section - Video/Article */}
            <article className="relative shadow-2xl flex-1 border lg:border-none p-6 bg-gray-800 border-gray-600 rounded-lg transition-all duration-300 ease-in-out hover:shadow-2xl">
              <h1 className=" text-red-100 font-bold text-3xl mb-6 text-center z-100">
                {courseTitle}
              </h1>
              <div className="h-1 w-3/4 mx-auto bg-gradient-to-r from-gray-800 via-yellow-500 to-gray-800 my-4 rounded-full"></div>

              <aside className="lg:hidden w-full  flex justify-center lg:w-1/4 p-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
                <ProgressBar
                  Level={level}
                  courseLevel={Level}
                  course_title={courseTitle}
                  total={filteredData.length}
                  C_ID={C_ID}
                />
              </aside>

              {/* Toggle Switch */}
              <label className="flex items-center justify-center mt-8 mb-6 cursor-pointer relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={view === "article"}
                  onChange={() =>
                    setView(view === "video" ? "article" : "video")
                  }
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
                    className={`absolute left-1 w-10 h-10 bg-gray-900 rounded-full shadow-lg flex items-center justify-center transition-transform duration-500 ease-in-out transform ${
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
                  <Videos
                    courses={filteredData}
                    C_ID={C_ID}
                    level={level}
                    courseTitle={courseTitle}
                  />
                ) : (
                  <Article
                    courses={filteredData}
                    C_ID={C_ID}
                    courseTitle={courseTitle}
                  />
                )}
              </div>
            </article>

            {/* Right section - Progress Bar */}
            <aside className="hidden lg:block lg:w-1/4 p-2 rounded-lg shadow-xl transition-all duration-300 ease-in-out hover:shadow-2xl">
              <ProgressBar
                Level={level}
                course_title={courseTitle}
                total={filteredData.length}
                courseLevel={Level}
                C_ID={C_ID}
              />
            </aside>
          </section>

          {/* Popup for successful enrollment */}
          {showPopup && (
            <EnrollmentPopup
              courseName={courseTitle}
              onClose={() => setShowPopup(false)} // Close popup after 5 seconds or on manual close
            />
          )}
        </>
      )}
    </main>
  );
};

export default DashBoard;
