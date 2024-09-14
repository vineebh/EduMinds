import React from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard'; 

const Home = () => {
  const courses = [
    {
      id: 1,
      title: "Course Title 1",
      description: "A brief description of what the course is about and what students will learn.",
      imageUrl: "https://via.placeholder.com/400x300?text=Course+1",
      link: "/courses/1",
    },
    {
      id: 2,
      title: "Course Title 2",
      description: "A brief description of what the course is about and what students will learn.",
      imageUrl: "https://via.placeholder.com/400x300?text=Course+2",
      link: "/courses/2",
    },
    {
      id: 3,
      title: "Course Title 3",
      description: "A brief description of what the course is about and what students will learn.",
      imageUrl: "https://via.placeholder.com/400x300?text=Course+3",
      link: "/courses/3",
    },
    // Add more courses as needed
  ];

  return (
    <div className="bg-gradient-to-r from-slate-700 to-slate-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-slate-700 to-slate-900 py-16">
        <img
          src="https://img.freepik.com/free-photo/scene-with-business-person-working-futuristic-office-job_23-2151003708.jpg?t=st=1723794847~exp=1723798447~hmac=ff6fb5eb3ccf3edb81bc7ff9adcf65c4ca4a8a6f955b6cedc3328a140565e048&w=996"
          alt="Education"
          className="absolute inset-0 object-cover w-full h-full opacity-50"
        />
        <div className="relative z-10 text-center px-6 sm:px-12 py-16 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
            Welcome to EduTech
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300">
            The beautiful thing about learning is that no one can take it away from you.
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-400">
            At EduTech, we provide a wide range of courses designed to help you succeed in your educational journey. Whether you’re looking to learn new skills, improve your knowledge, or advance your career, we’ve got something for everyone.
          </p>
          <Link to="/courses">
            <button className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
              Explore Courses
            </button>
          </Link>
        </div>
      </div>
    
      {/* Courses Section */}
      <div className="py-12 px-4 sm:px-6 md:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500 mb-12 text-center">
          Our Courses
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              link={course.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
