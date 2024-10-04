import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import Chatbot from "./Chatbot";

const VideoPlayerPage = () => {
  const location = useLocation();
  const { videoUrl, topic_name } = location.state || {};
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef(null);

  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  const handleSpeedChange = (event) => {
    setPlaybackSpeed(parseFloat(event.target.value)); // Ensure speed is a number
  };

  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value)); // Ensure volume is a number
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center px-4 sm:px-8 pt-16">
      {/* Video Title */}
      <h2 className="text-4xl mt-4 font-bold text-center text-white shadow-lg mb-6 py-2 rounded-lg ">
        {topic_name ? topic_name : "Now Playing"}
      </h2>

      {/* Container for Video Player */}
      <div className="w-full max-w-3xl">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-blue-500 transition-transform transform hover:scale-105">
          {videoUrl ? (
            <ReactPlayer
              ref={playerRef}
              url={videoUrl}
              controls={true}
              playIcon={true}
              width="100%"
              height="400px" // Adjusted height
              className="react-player"
              playbackRate={playbackSpeed} // Set playback speed
              volume={volume} // Set volume
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
          <label className="text-white" htmlFor="playback-speed">Playback Speed:</label>
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
          <label className="text-white" htmlFor="volume">Volume:</label>
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
          onClick={toggleChatbot}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
          {isChatbotVisible ? "Hide Chatbot" : "Ask Doubt to AI"}
        </button>

        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mt-4 px-6 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-200"
        >
          Back to Videos
        </button>
      </div>

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg w-3/4 h-max z-10 overflow-hidden">
            <div className="h-full w-full">
              <Chatbot toggleChatbot={toggleChatbot} />
            </div>
          </div>
          {/* Overlay */}
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
