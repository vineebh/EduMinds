import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Assessment = () => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const [selectedOption, setSelectedOption] = useState("");
  const [skills, setSkills] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { courseTitle, C_ID } = location.state || {};

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/skills/${C_ID}`);
        setSkills(response.data); // Store the dynamically fetched skills
      } catch (error) {
        setError("Failed to fetch skills. Please try again later.");
      }
    };

    if (C_ID) {
      fetchSkills();
    }
  }, [C_ID]);


  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const submitHandler = () => {
    if (selectedOption) {
      const level = selectedOption;
      if (selectedOption === "Beginner") { 
        navigate("/dashboard", { state: { C_ID, level, courseTitle, State: "New", from: '/assessment' } });
      } else {
        navigate("/mcq", { state: { C_ID, level, courseTitle } });
      }
    }
  };

  return (
    <div className="bg-[#1B2433] max-h-lvh flex justify-center items-center py-12 mt-14">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="bg-gray-800 p-10 rounded-lg shadow-2xl flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-white text-center mb-8 tracking-wide">
            Rate Your {courseTitle} Skills
          </h2>

          <div className="w-full lg:w-2/2 p-4 hidden md:flex justify-around mb-10">
            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <button
                key={level}
                className={`py-3 px-8 rounded-lg font-semibold text-white transition-all duration-300 transform ${
                  selectedOption === level
                    ? "bg-blue-600 scale-105 shadow-lg"
                    : "bg-gray-600 hover:bg-blue-500"
                }`}
                onClick={() => handleOptionChange(level)}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="text-left mb-8 w-full">
            <p className="text-lg font-medium text-white mb-6">Skills by Level:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 cursor-pointer">
              {Object.entries(skills).map(([level, skillList]) => (
                <div
                  onClick={() => handleOptionChange(level)}
                  key={level}
                  className={`p-6 rounded-lg shadow-md ${
                    selectedOption === level ? "bg-blue-700 " : "bg-gray-700"
                  }`}
                >
                  <h3
                    className={`text-lg font-semibold mb-3 ${
                      selectedOption === level ? "text-white" : "text-blue-500"
                    }`}
                  >
                    {level}
                  </h3>
                  <ul className="list-decimal list-inside text-white gap-5">
                    {skillList.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <button
            className="py-3 px-3 text-sm rounded bg-blue-600 text-white font-semibold shadow-md hover:shadow-xl transition-shadow duration-300 hover:scale-105"
            onClick={submitHandler}
            disabled={!selectedOption}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
