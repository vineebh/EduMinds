import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProgressBar = ({ Level, course_title, total, courseLevel, C_ID }) => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const watchedVideos = useSelector((state) => state.progress.watchedVideos);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const email = userInfo?.userID;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.post(`${API_URL}/userpoints`, {
          email,
          course_title,
        });

        if (response.status === 200) {
          const userPoints = response.data.data.points;
          setPoints(userPoints);
        } else {
          setPoints(0);
        }
      } catch (error) {
        setPoints(0); // Handle error by setting points to 0
      }
    };

    if (email && course_title) {
      fetchUserPoints();
    }
  }, [email, course_title]);
  useEffect(() => {
    if (total > 0) {
      const progressPercentage = Math.min(
        parseInt((watchedVideos.length / total) * 100),
        100
      );
      setProgress(progressPercentage);
    }
  }, [watchedVideos, total]);

  const everyDayQuestionHandler = async () => {
    navigate("/everydayquestion", {
      state: { C_ID, level: courseLevel, courseTitle: course_title }
    });
  };
  
  const levelUpHandler = () => {
    navigate('/levelUp' ,{state :{C_ID, level:courseLevel, courseTitle:course_title}})
  };

  return (
    <div className="lg:fixed w-full max-w-[350px] bg-gray-800 border border-white shadow-xl rounded-lg flex flex-col p-6">
      <h3 className="text-2xl font-semibold text-white mb-2 text-center">
        Course Level
      </h3>
      <p className="text-yellow-400 font-bold text-lg mb-4 text-center">
        {Level}
      </p>

      <div className="bg-gray-600 rounded-full h-4 w-full overflow-hidden mb-2">
        <div
          className="bg-yellow-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-gray-300 text-center">{progress}% Completed</p>
      <p className="text-yellow-400 text-lg mt-4 text-center">
        {points} points
      </p>

      <div className="flex justify-center space-x-4 mt-4">
        <button
          className="bg-teal-500 px-4 py-2 rounded-full shadow-md hover:bg-teal-600 transition-all"
          onClick={everyDayQuestionHandler}
        >
          Everyday Question
        </button>
        {progress === 100 && (
          <button
            className="bg-yellow-500 px-4 py-2 rounded-full shadow-md hover:bg-yellow-600 transition-all"
            onClick={levelUpHandler}
          >
            Level Up
          </button>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
