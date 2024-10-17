import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard'; 
import bg from '../assests/img/bg.jpg';


const Home = () => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // Fetch course data from backend
  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        
        return res.json();
      })
      .then((data) => setCourses(data))
      .catch((error) => {
        setError("Failed to fetch courses. Please try again later.");
      });
  }, []);

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (

    <div className="bg-gradient-to-r pt-2 from-slate-700 to-slate-900 min-h-screen text-white">
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-r from-slate-700 to-slate-900 py-16  "> {/* Changed background to darker gray */}

        <img
          src={bg}
          //https://img.freepik.com/free-photo/scene-with-business-person-working-futuristic-office-job_23-2151003708.jpg?t=st=1723794847~exp=1723798447~hmac=ff6fb5eb3ccf3edb81bc7ff9adcf65c4ca4a8a6f955b6cedc3328a140565e048&w=996
          alt="Education"
          className="absolute inset-0  object-fill  w-full h-full opacity-50 mt-5"
        />

        <div className="relative mt-10 z-10 text-center px-6 sm:px-12 py-16 bg-gray-900 bg-opacity-80 rounded-lg shadow-lg mx-auto max-w-4xl"> {/* Changed background to darker gray */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-fuchsia-500 to-cyan-500  bg-clip-text text-transparent"> {/* Changed heading color to blue */}


            Welcome to EduMinds
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300">
            The beautiful thing about learning is that no one can take it away from you.
          </p>
          <p className="text-sm sm:text-base md:text-lg mb-8 text-gray-400">
            At EduTech, we provide a wide range of courses designed to help you succeed in your educational journey. Whether you’re looking to learn new skills, improve your knowledge, or advance your career, we’ve got something for everyone.
          </p>
          <Link to="/courses">

            <button className="py-3 px-3 text-sm rounded bg-blue-500 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105">


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
             <Link key={course.id} to={`/courses`}>
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              imageUrl={course.imageUrl}
              link={'/courses'} //link to course
            />
            </Link>
          ))}
        </div>


      </div>
    </div>
  );
};

export default Home;
