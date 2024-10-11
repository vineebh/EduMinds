import React, { useState } from "react";
import { useNavigate } from "react-router";

const Article = ({ courses, C_ID }) => {
  const navigate = useNavigate();
  
  // State to track if the first article has been read
  const [canAccessNextArticles, setCanAccessNextArticles] = useState(false);

  const readMoreHandler = (articleData, topic_name, article_id) => {
    // Allow access to the next articles if the first article is read
    if (!canAccessNextArticles) {
      setCanAccessNextArticles(true);
    }
    console.log(topic_name);
    navigate("/article", {
      state: { articleData: articleData, topic_name, C_ID, article_id },
    });
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Articles</h1>
      <div className="space-y-6">
        {courses.map((course) => {
          let articleData;
          try {
            // Parse the articles string to an object
            articleData = JSON.parse(course.articles);
          } catch (error) {
            console.error("Invalid JSON structure in articles:", error);
            return null; // Skip rendering if there's a parsing error
          }

          // Determine if the article can be accessed
         
          const isFirstArticle = course.id === courses[0].id; // Check if it's the first article
          const isClickable = isFirstArticle || canAccessNextArticles;
          
          console.log(isFirstArticle) // Determine if clickable

          return (
            <div
              key={course.id} // Use course.id as the key
              className="border border-gray-600 rounded-lg p-4 bg-slate-800"
            >
              <h2 className="text-2xl font-semibold text-yellow-300">
                {articleData.title}
              </h2>
              <p className="text-gray-400 mt-2">
                {articleData.content.introduction}
              </p>
              <div className="mt-4 text-yellow-300 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (isClickable) {
                      readMoreHandler(articleData, course.topic_name, course.id);
                    }
                  }}
                  disabled={!isClickable} // Disable button if not clickable
                  className={`${
                    !isClickable ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isClickable ? 'Read more' : 'Unlock to read'} 
                </button>
                <span>5 Points</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Article;
