// VideoPlayerPage.js
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import Chatbot from "./Chatbot";

const VideoPlayerPage = () => {
  const location = useLocation();
  const { videoUrl, topic_name } = location.state || {};

  const [query, setQuery] = useState("");

  useEffect(() => {
    const storedQuery = localStorage.getItem("videoQuery");
    if (storedQuery) {
      setQuery(storedQuery);
    }
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSaveQuery = () => {
    localStorage.setItem("videoQuery", query);
  };

  return (
    <div className="bg-slate-900 min-h-screen flex items-center p-8 mt-10 pt-16">
    
      <h2 className="text-4xl font-bold mb-4 text-center text-white shadow-lg p-2 rounded">
        {topic_name ? topic_name : "Now Playing"}
      </h2>

      <div className="w-full flex justify-center mb-6">
        <div className="rounded-lg overflow-hidden shadow-lg" style={{ width: '640px', height: '360px' }}>
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              controls={true}
              playIcon={true}
              width="100%"
              height="100%"
              className="react-player"
              
            />
          ) : (
            <div className="text-center text-gray-400 p-4">
              No video selected. Please go back and choose a video.
            </div>
          )}
        </div>
      </div>

      <Chatbot/>
      <button
        onClick={() => window.history.back()}
        className="mt-4 px-6 py-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition duration-200"
      >
        Back to Videos
      </button>
    </div>
  );
};

export default VideoPlayerPage;
