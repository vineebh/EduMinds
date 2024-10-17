import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setWatchedVideos } from "../store/progressSlice";

const Videos = ({ courses, C_ID, level, courseTitle }) => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const email_id = userInfo?.userID; // Check if userInfo exist
  const watchedVideos = useSelector((state) => state.progress.watchedVideos);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch watched videos from the database
    const fetchWatchedVideos = async () => {
      try {
        const response = await axios.post(
          `${API_URL}/get_watched_videos`,
          {
            email_id,
            courseTitle,
          }
        );
        if (response.status === 200) {
          dispatch(setWatchedVideos(response.data)); // Assuming response.data contains watched video IDs
        } else {
          throw new Error("Failed to fetch watched videos");
        }
      } catch (error) {
      }
    };

    if (email_id) {
      fetchWatchedVideos();
    }
  }, [email_id,courseTitle,dispatch]);

  // Navigate to VideoPlayerPage
  const handleWatchClick = (
    videoUrl,
    topic_name,
    videoId,
    index,
    courseTitle
  ) => {
    navigate("/video", {
      state: {
        videoUrl,
        topic_name,
        videos:courses,
        currentIndex: index,
        videoId,
        courseTitle,
        level,
        C_ID
      },
    });
  };

  return (
    <div className="text-white container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Video Lectures</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {courses.map((course, index) => (
          <div
            key={course.id}
            className={`bg-gray-800 border lg:flex lg:flex-row lg:items-center border-gray-600 rounded-lg p-4 shadow-lg transition-transform transform ${
              index === 0 || watchedVideos.includes(courses[index - 1].id)
                ? "hover:scale-105 cursor-pointer"
                : "opacity-50 cursor-not-allowed"
            } flex flex-col justify-between`}
          >
            <div className="flex-grow mb-4">
              <h3 className="text-xl font-semibold mb-2">
                {course.topic_name}
              </h3>
              <span className="text-sm text-gray-400">5 points</span>
            </div>
            <button
              onClick={() =>
                handleWatchClick(
                  course.video_url,
                  course.topic_name,
                  course.id,
                  index,
                  courseTitle
                )
              }
              className={`w-full lg:w-20 lg:h-10 py-2 ${
                index === 0 || watchedVideos.includes(courses[index - 1].id)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              } rounded transition-colors`}
              disabled={
                !(index === 0 || watchedVideos.includes(courses[index - 1].id))
              }
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
