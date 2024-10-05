import React from 'react';
import Markdown from 'react-markdown';
import { useLocation } from 'react-router';

const ArticleView = () => {
  const location = useLocation();
  const { articleData } = location.state;

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-6">

      <article className=" max-w-5xl m-auto bg-gray-800 text-white rounded-lg shadow-2xl overflow-hidden">

        {/* Header Section */}
        <header className="p-8 bg-gray-700 border-b border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
          <h1 className="text-5xl font-bold text-yellow-400 mb-2 mt-3">
            {articleData.title || 'Untitled Article'}
          </h1>
        </header>

        {/* Content Section */}
        <section className="p-8 space-y-6">
          {/* Introduction */}
          {articleData.content.introduction ? (
            <div className="text-lg text-gray-300 leading-relaxed">
              <h1 className="text-3xl font-semibold text-yellow-300 mb-4">
                Introduction
              </h1>
              <p>{articleData.content.introduction}</p>
            </div>
          ) : (
            <div className="text-gray-400 italic">
              No introduction available.
            </div>
          )}

          {/* Main Content rendered with Markdown */}
          {articleData.content.main_content ? (
            <div className="prose prose-invert text-gray-300 leading-relaxed">
              <Markdown>{articleData.content.main_content}</Markdown>
            </div>
          ) : (
            <div className="text-gray-400 italic">
              No main content available.
            </div>
          )}
        </section>

        {/* Conclusion Section */}
        <section className="p-8 bg-gray-700 border-t border-gray-600">
          {articleData.content.conclusion ? (
            <>
              <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
                Conclusion
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {articleData.content.conclusion}
              </p>
            </>
          ) : (
            <div className="text-gray-400 italic">
              No conclusion available.
            </div>
          )}
        </section>
      </article>
    </div>
  );
};

export default ArticleView;
