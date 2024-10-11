import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useLocation, useNavigate } from "react-router-dom";
import Chatbot from "../components/Chatbot";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setWatchedVideos } from "../store/progressSlice";

const VideoPlayerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    videoUrl,
    topic_name,
    videos,
    currentIndex,
    videoId,
  } = location.state || {};
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef(null);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const email_id = userInfo?.userID;
  const watchedVideos = useSelector((state) => state.progress.watchedVideos);
  const dispatch = useDispatch();
  
  // Toggle Chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  // Called when video ends
  const handleVideoEnd = async () => {
    console.log(`Video at index ${currentIndex} ended`);
    toast.success("Video finished! Unlocking next video...");

    // Mark the current video as watched in the database
    if (!watchedVideos.includes(videoId)) {
      try {
        const response = await axios.post(
          "http://localhost:1000/watched_videos",
          {
            email_id,
            watched_video_id: videoId, // Ensure this refers to the actual video ID
          }
        ); 
        if (response.status === 200) {
          dispatch(setWatchedVideos((prev) => ([...prev, videoId])));
          console.log("Video marked as watched:", videoId);
        }
      } catch (error) {
        console.error("Error marking video as watched:", error);
      }
    }
  };

  // Handle playback speed change
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
      if (watchedVideos.includes(videoId)) {
        console.log("Current video watched. Navigating to next video...");

        // Navigate to the next video
        navigate("/video", {
          state: {
            videoUrl: nextVideo.video_url,
            topic_name: nextVideo.topic_name,
            videos,
            currentIndex: currentIndex + 1,
            watchedVideos,
            videoId: nextVideo.id, // Pass the next video ID
          },
        });
      } else {
        toast.error(
          "You must watch the current video before accessing the next one."
        );
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
              onEnded={handleVideoEnd}
              width="100%"
              height="400px"
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

      {/* Playback Speed and Volume Controls */}
      <div className="flex flex-col md:flex-row items-center gap-6 mt-4">
        <div className="flex items-center">
          <label className="text-white mr-2" htmlFor="playback-speed">
            Playback Speed:
          </label>
          <select
            id="playback-speed"
            value={playbackSpeed}
            onChange={handleSpeedChange}
            className="px-3 py-1 rounded-md bg-gray-800 text-white shadow focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
          </select>
        </div>
        <div className="flex items-center mt-2 md:mt-0">
          <label className="text-white mr-2" htmlFor="volume">
            Volume:
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={handleVolumeChange}
            className="ml-2 h-1 w-32 bg-gray-600 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
      </div>

      {/* Chatbot and Buttons Section */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          onClick={() => navigate(-1)} // Use navigate(-1) to go back
          className="bg-gray-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          Go Back
        </button>
        <button
          onClick={toggleChatbot}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          {isChatbotVisible ? "Hide Chatbot" : "Ask Doubt to AI"}
        </button>
        <button
          onClick={handleNextVideo}
          className="bg-green-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105"
        >
          Next Video
        </button>
      </div>

      {/* Chatbot Component */}
      {isChatbotVisible && <Chatbot  setIsChatbotVisible={setIsChatbotVisible}/>}
    </div>
  );
};

export default VideoPlayerPage;
