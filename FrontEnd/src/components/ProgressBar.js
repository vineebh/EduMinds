import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios
import { useSelector } from 'react-redux';

const ProgressBar = ({ Level, course_title, total }) => {
  const watchedVideos = useSelector((state) => state.progress.watchedVideos);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [progress, setProgress] = useState(0);
  const [points, setPoints] = useState(0);
  const email = userInfo?.userID;

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        
        const response = await axios.post('http://localhost:1000/userpoints', {
          email,
          course_title
        });
  
        if (response.status === 200) {
          const userPoints = response.data.data.points;
          setPoints(userPoints);
        } else {
          console.warn(response.data.msg);
          setPoints(0);
        }
      } catch (error) {
        console.error('Error fetching user points:', error);
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
      setProgress(progressPercentage); // Ensure progress doesn't exceed 100%
    }
  }, [watchedVideos, total]);

  return (
    <div className="lg:fixed w-full max-w-[350px] bg-gray-800 border border-white shadow-xl rounded-lg flex flex-col p-6">
      <h3 className="text-2xl font-semibold text-white mb-2 text-center">Course Level</h3>
      <p className="text-yellow-400 font-bold text-lg mb-4 text-center">{Level}</p>

      <div className="bg-gray-600 rounded-full h-4 w-full overflow-hidden mb-2">
        <div
          className="bg-yellow-400 h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <p className="text-gray-300 text-center">{progress}% Completed</p>
      <p className="text-yellow-400 text-lg mt-4 text-center">{points} points</p>
    </div>
  );
};

export default ProgressBar;
