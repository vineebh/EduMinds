import React from "react";
import Course from "../components/Course";

const Courses = () => {
  const courses = [
    {
      id: 1,
      courseName: "Python",
      description:
        "Python is a versatile, high-level programming language known for its simplicity, readability, and broad applicability across various fields like web development, data science, and AI.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8E6Xlh2VtOsV4vrygfHVm6xKybmctIDBYnA&s",
      professorName: "Dr. John Smith",
      duration: "40 Hours",
    },
    {
      id: 2,
      courseName: "Excel",
      description:
        "Excel is a spreadsheet software by Microsoft used for data organization, analysis, and visualization, featuring functions, formulas, and pivot tables for efficient data management.",
      image:
        "https://omtsdigest.com/wp-content/uploads/2016/02/excel-1598646848.jpeg",
      professorName: "Dr. Alice Johnson",
      duration: "30 Hours",
    },
    {
      id: 3,
      courseName: "Data Science",
      description:
        "Data science is a multidisciplinary field that uses statistical methods, algorithms, and machine learning to extract insights and knowledge from structured and unstructured data for decision-making and predictive analysis.",
      image:
        "https://www.fsm.ac.in/blog/wp-content/uploads/2022/07/FUqHEVVUsAAbZB0.jpg",
      professorName: "Prof. Mark Davis",
      duration: "40 Hours",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-700 to-slate-900 p-6">
      <div className="relative space-y-6 py-4">
        {courses.map((data) => (
          <div
            key={data.id}
            className="relative w-full max-w-full mx-auto px-8 rounded-lg"
          >
            <Course courseData={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
