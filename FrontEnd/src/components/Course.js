import PropTypes from "prop-types"; // Import PropTypes
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ".././index.css";

const Course = ({ courseData, Enroll }) => {
  const { c_id, title, description, imageUrl, professorName, duration } = courseData;
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const navigate = useNavigate();


  const btnLabel = Enroll.some((course) => course.course_title === title)
    ? "Continue"
    : "Assess your level";



  const enrolledCourse = Enroll.find((course) => course.course_title === title);

  const enrollHandler = () => {
    if (loginStatus === true) {
      if (enrolledCourse) {
        const Level = enrolledCourse.level; // Get the level of the matched course
        navigate("/dashboard", {
          state: {
            C_ID: c_id,
            level: Level,
            courseTitle: title,
            State: "Continue",
            from: "/courses",
          },
        });
      } else {
        navigate("/Assessment", { state: { courseTitle: title, C_ID: c_id } });
      }
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl h-full bg-white bg-opacity-20 backdrop-blur-md border border-gray-700 mt-8 sm:mt-10 lg:mt-12">
      {/* Course Name */}
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gradient text-white text-transparent bg-clip-text text-center mb-4 sm:mb-6 lg:mb-8 drop-shadow-xl">
        {title}
      </h1>

      {/* Content Layout */}
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="w-full sm:w-1/3 mb-4 sm:mb-0 sm:pr-4 lg:pr-6">
          <img
            src={imageUrl}
            alt={title} // Ensure alt text is meaningful
            className="w-full h-36 sm:h-40 md:h-48 lg:h-56 object-cover rounded-lg border-4 shadow-lg"
          />
          {/* Duration and Instructor */}
          <div className="flex flex-col text-gray-100 text-xs sm:text-sm mt-4 space-y-1">
            <span className="font-semibold">Duration: {duration}</span>
            <span className="font-semibold">Instructor: {professorName}</span>
          </div>
        </div>

        {/* Description Section */}
        <div className="w-full sm:w-2/3 h-max mt-4 sm:mt-0">
          <p className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed pr-0 sm:pr-4 lg:pr-6 text-white text-justify ">
            <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">
              Description:
            </span>{" "}
            {description}
          </p>
        </div>


      </div>

      {/* Assessment Button */}
      <div className="flex justify-center sm:justify-end mt-4 sm:mt-6 lg:mt-8">
        <button
          className="py-2 px-4 sm:py-2.5 sm:px-6 md:py-3 md:px-8 lg:py-3 lg:px-8 rounded-lg bg-blue-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
          onClick={enrollHandler}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
};

// Prop Types validation
Course.propTypes = {
  courseData: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    professorName: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
  }).isRequired,
};

export default Course;
