import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

const VideoPlayerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl, topic_name, videos, currentIndex, userEmail } = location.state || {}; // Add userEmail
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef(null);
  const [watchedVideos, setWatchedVideos] = useState([]);
  const userInfo = useSelector((state) => state.auth.userInfo)
  const email_id = userInfo.userId;

  // Fetch watched videos on component mount
  useEffect(() => {
    const fetchWatchedVideos = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/watched-videos/${email_id}`);
        setWatchedVideos(response.data);
      } catch (error) {
        console.error("Error fetching watched videos:", error);
      }
    };
    fetchWatchedVideos();
  }, [userEmail]);

  // Toggle Chatbot Visibility
  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  // Called when video ends
  const handleVideoEnd = async () => {
    console.log(`Video at index ${currentIndex} ended`);
    toast.success("Video finished! Unlocking next video...");

    // Mark the current video as watched in the database
    if (!watchedVideos.includes(currentIndex)) {
      try {
        await axios.post('http://localhost:1000/watched-videos', {
          email_id: userEmail,
          video_id: currentIndex,
        });
        setWatchedVideos([...watchedVideos, currentIndex]);
        console.log("Video marked as watched:", currentIndex);
      } catch (error) {
        console.error("Error marking video as watched:", error);
      }
    }

    console.log("Updated watched videos:", watchedVideos);
  };

  // Handle speed change
  const handleSpeedChange = (event) => {
    setPlaybackSpeed(parseFloat(event.target.value));
  };

  // Handle volume change
  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };

  // Navigate to the next video
  const handleNextVideo = () => {
    console.log("Current Index:", currentIndex);
    
    // Check if there are more videos
    if (videos && Array.isArray(videos) && currentIndex < videos.length - 1) {
      const nextVideo = videos[currentIndex + 1]; // Get the next video
      console.log("Next Video:", nextVideo);

      // Check if the current video has been watched
      if (watchedVideos.includes(currentIndex)) {
        console.log("Current video watched. Navigating to next video...");

        // Navigate to the next video
        navigate("/video", {
          state: {
            videoUrl: nextVideo.video_url,
            topic_name: nextVideo.topic_name,
            videos,
            currentIndex: currentIndex + 1,
            userEmail, // Pass userEmail to the next video
          },
        });
      } else {
        toast.error("You must watch the current video before accessing the next one.");
      }
    } else {
      toast.error("You have reached the last video.");
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center px-4 sm:px-8 pt-16">
      <h2 className="text-4xl mt-4 font-bold text-center text-white shadow-lg mb-6 py-2 rounded-lg">
        {topic_name ? topic_name : "Now Playing"}
      </h2>

      <div className="w-full max-w-3xl">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-blue-500 transition-transform transform hover:scale-105">
          {videoUrl ? (
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              controls={true}
              onEnded={handleVideoEnd} // Trigger when video ends
              width="100%"
              height="400px"
              className="react-player"
              playbackRate={playbackSpeed}
              volume={volume}
            />
          ) : (
            <div className="text-center text-gray-400 py-8">
              No video selected. Please go back and choose a video.
            </div>
          )}
        </div>
      </div>

      {/* Controls for Playback Speed and Volume */}
      <div className="flex flex-col md:flex-row items-center gap-x-6 mt-4">
        <div className="flex items-center">
          <label className="text-white" htmlFor="playback-speed">
            Playback Speed:
          </label>
          <select
            id="playback-speed"
            value={playbackSpeed}
            onChange={handleSpeedChange}
            className="ml-2 px-2 py-1 rounded bg-gray-800 text-white"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <label className="text-white" htmlFor="volume">
            Volume:
          </label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="ml-2 w-24 md:w-32"
          />
        </div>
      </div>

      {/* Toggle Button for Chatbot */}
      <div className="flex items-center gap-x-6 mt-10 justify-center flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
        >
          Back to Videos
        </button>
        <button
          onClick={toggleChatbot}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          {isChatbotVisible ? "Hide Chatbot" : "Ask Doubt to AI"}
        </button>
        
        <button
          onClick={handleNextVideo}
          className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
        >
          Next
        </button>
      </div>

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
          <div className="relative bg-white rounded-lg shadow-lg w-3/4 h-max z-10 overflow-hidden">
            <div className="h-full w-full">
              <Chatbot toggleChatbot={toggleChatbot} />
            </div>
          </div>
          <div
            className="fixed inset-0 bg-black opacity-50 z-0"
            onClick={toggleChatbot}
          ></div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayerPage;
