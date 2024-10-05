import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Videos = ({ courses }) => {
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Navigate to the VideoPlayerPage with the video URL in the state
  const handleWatchClick = (videoUrl, topic_name) => {
    navigate("/video", { state: { videoUrl, topic_name } });
  };

  return (
    <div className="text-white container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Video Lectures</h2>

      {/* Render the list of video lectures */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
        {courses.map((course, index) => (
          <div
            key={index}
            className="bg-gray-800 border lg:flex lg:flex-row lg:items-center border-gray-600 rounded-lg p-4 shadow-lg transition-transform transform hover:scale-105 cursor-pointer flex flex-col justify-between"
          >
            <div className="flex-grow mb-4  ">
              <h3 className="text-xl font-semibold mb-2">{course.topic_name}</h3>
              <span className="text-sm text-gray-400">5 points</span> {/* Show points only on mobile */}
            </div>
            <button
              onClick={() => handleWatchClick(course.video_url, course.topic_name)}
              className="w-full lg:w-20 lg:h-10 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
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
