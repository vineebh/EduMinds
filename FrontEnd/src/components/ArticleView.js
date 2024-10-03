import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ArticleView = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize articleData with fallback values
  const [articleData, setArticleData] = useState({
    title: "No Title Available",
    content: { full: "No content available." },
  });

  useEffect(() => {
    if (location.state?.title && location.state?.content?.full) {
      // Set article data from location state if available
      setArticleData(location.state);
    } else {
      // Fallback to localStorage if location state is not available
      const storedArticle = localStorage.getItem("currentArticle");
      if (storedArticle) {
        try {
          const parsedArticle = JSON.parse(storedArticle);
          if (parsedArticle?.title && parsedArticle?.content?.full) {
            setArticleData(parsedArticle);
          } else {
            throw new Error("Incomplete article data in localStorage");
          }
        } catch (error) {
          console.error("Failed to parse stored article:", error);
        }
      }
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg p-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-yellow-400 text-black px-4 py-2 rounded mb-6 hover:bg-yellow-300"
          aria-label="Go Back"
        >
          Back
        </button>

        <h1 className="text-4xl font-bold mb-4">{articleData.title || "No Title Available"}</h1>

        <div className="text-lg leading-relaxed space-y-4">
          <p>{articleData?.content?.full || "No content available."}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
