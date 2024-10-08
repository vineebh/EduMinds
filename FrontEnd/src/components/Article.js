import React from "react";
import { useNavigate } from "react-router";

const Article = ({ courses }) => {
  const navigate = useNavigate();

  const readMoreHandler = (articleData, index) => {
    navigate('/articleView', {
      state: {
        articleData: articleData,
        currentIndex: index,
        articles: courses,
      },
    });
  };

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Articles</h1>
      <div className="space-y-6">
        {courses.map((course, index) => {
          let articleData;
          try {
            // Parse the articles string to an object
            articleData = JSON.parse(course.articles);
          } catch (error) {
            console.error("Invalid JSON structure in articles:", error);
            return null; // Skip rendering if there's a parsing error
          }

          return (
            <div key={index} className="border border-gray-600 rounded-lg p-4 bg-slate-800">
              <h2 className="text-2xl font-semibold text-yellow-300">{articleData.title}</h2>
              <p className="text-gray-400 mt-2">{articleData.content.introduction}</p>
              <div className="mt-4 text-yellow-300 flex items-center justify-between">
                <button onClick={() => readMoreHandler(articleData, index)}>Read more</button>
                <span>5 points</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Article;
