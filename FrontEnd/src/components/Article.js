import React from "react";
import { useNavigate } from "react-router-dom";

const Article = ({ courses }) => {
  const navigate = useNavigate();

  const handleReadMoreClick = (articleData, index) => {
    // Save the article data to localStorage
    localStorage.setItem("currentArticle", JSON.stringify({
      title: articleData.title,
      content: articleData.content,
    }));
    // Navigate to the article view page
    navigate(`/article/${index}`, {
      state: { 
        title: articleData.title, 
        content: articleData.content 
      }
    });
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Articles</h1>
      <div className="space-y-6">
        {courses.map((course, index) => {
          let articleData;
          try {
            articleData = JSON.parse(course.articles);
          } catch (error) {
            console.error("Invalid JSON structure in articles:", error);
            return (
              <div key={index} className="border border-red-600 rounded-lg p-4 bg-slate-800">
                <h2 className="text-red-300">Error Loading Article</h2>
                <p className="text-gray-400 mt-2">
                  Unable to parse article data. Please contact support.
                </p>
              </div>
            ); 
          }

          // Ensure content and introduction exist to avoid errors
          const introductionText = articleData?.content?.introduction || "No introduction available.";

          return (
            <div key={index} className="border border-gray-600 rounded-lg p-4 bg-slate-800">
              <h2 className="text-2xl font-semibold text-yellow-300">{articleData?.title || "Untitled"}</h2>
              <p className="text-gray-400 mt-2">
                {introductionText}
              </p>
              <div className="mt-4">
                <button 
                  onClick={() => handleReadMoreClick(articleData, index)}
                  className="text-yellow-400 hover:underline"
                >
                  Read more
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Article;
