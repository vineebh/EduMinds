import React from 'react';

const articlesData = [
  {
    title: 'Understanding App Store Optimization (ASO)',
    description: 'Learn about ASO and its importance in increasing your app’s visibility and downloads.',
  },
  {
    title: 'The Future of Mobile Development',
    description: 'Explore trends shaping the future of mobile app development and user engagement.',
  },
  {
    title: 'Best Practices for User Experience (UX)',
    description: 'Discover key principles of UX design that can enhance user satisfaction and retention.',
  },
  {
    title: 'The Importance of App Marketing',
    description: 'Understand the strategies that can help you effectively market your app to reach a wider audience.',
  },
];

const Article = ({courses}) => {

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Articles</h1>
      <div className="space-y-6">
        {articlesData.map((course, index) => (
          <div key={index} className="border border-gray-600 rounded-lg p-4">
            <h2 className="text-2xl font-semibold">{course.title}</h2>
            <p className="text-gray-400">{course.description}</p>
            <a href="#" className="text-yellow-400 hover:underline">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Article;
