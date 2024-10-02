import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import Chatbot from "./Chatbot";

const VideoPlayerPage = () => {
  const location = useLocation();
  const { videoUrl, topic_name } = location.state || {};
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);



  const toggleChatbot = () => {
    setIsChatbotVisible(!isChatbotVisible);
  };

  return (

    <div className="bg-slate-900 min-h-screen flex flex-col items-center px-4 sm:px-8 pt-16">
      {/* Video Title */}
      <h2 className="text-3xl sm:text-4xl mt-10 font-bold text-center text-white shadow-lg mb-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400">

        {topic_name ? topic_name : "Now Playing"}
      </h2>

      {/* Container for Video Player */}
      <div className="w-full max-w-3xl">
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl border border-blue-500 transition-transform transform hover:scale-105">
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              controls={true}
              playIcon={true}
              width="100%"
              height="400px" // Set your desired height here
              className="react-player"
            />
          ) : (
            <div className="text-center text-gray-400 py-8">
              No video selected. Please go back and choose a video.
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button for Chatbot */}
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

      {/* Chatbot Modal */}
      {isChatbotVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl h-5/6 p-6 z-10 overflow-hidden">
            <button
              onClick={toggleChatbot}
              className="mb-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-200"
            >
              Close
            </button>
            <div className="h-full overflow-y-auto">
              <Chatbot />
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
