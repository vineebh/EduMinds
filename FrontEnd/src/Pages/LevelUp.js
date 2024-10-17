import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const LevelUp = () => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const { C_ID, level, courseTitle } = location.state || {};
  const userInfo = useSelector((state) => state.auth.userInfo);
  const email_id = userInfo.userID;

  // Fetch questions from API on component mount
  useEffect(() => {
    
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(`${API_URL}/assessment/questions`, { level, c_id: C_ID, limit: 40 });
        if (response.status === 200 && response.data.length > 0) {
          setQuestions(response.data);
          setLoading(false);
          setIsSubmitted(false);
        } else {
          setLoading(false);
          setError("No questions available.");
        }
      } catch (error) {
        setLoading(false);
        if (error.response) {
          // Server responded with a status other than 200
          setError("Failed to load questions. Server error.");
        } else if (error.request) {
          // Request made but no response received
          setError("Network error. Please check your connection.");
        } else {
          setError("An unexpected error occurred.");
        }
      }
    };    

    fetchQuestions();
  }, [level, C_ID]);

  const handleChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = async () => {
    
    if (Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions before submitting.");
      return;
    }

    const answerArray = Object.entries(answers).map(
      ([questionId, selectedOption]) => ({
        questionId: parseInt(questionId, 10),
        selectedOption,
      })
    );

    try {
      const response = await axios.post(
        `${API_URL}/assessment/submit`,
        {
          c_id: C_ID,
          answers: answerArray,
        }
      );

      if (response.status === 200) {
        toast.success(
          `You answered ${response.data.correct} out of ${questions.length} questions correctly!`
        );
        if (response.data.correct !== 0) {
          const res = await axios.post(`${API_URL}/update_points_and_level`, {
            email: email_id,
            course_title: courseTitle,
            new_points: 5 * response.data.correct,
          });
          if (res.status === 200) {
            toast.success(`${5 * response.data.correct} Points added`);
            window.history.replaceState(null, "", "/dashboard"); // Redirect to a specific route
            window.history.back()
          }
        }
        setIsSubmitted(true);
      }
    } catch (error) {
      toast.error("Error during submission, try again");
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }


  return (
    <div className="bg-gray-900 min-h-screen py-12 sm:py-16 flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl text-white font-extrabold text-center mb-8">
          Level Up !
          </h1>
        <span className="text-white text-lg font-bold bg-blue-600 py-1 px-3 rounded-lg shadow-md">
          {currentQuestionIndex + 1}/{questions.length}
        </span>

        {questions.length > 0 && (
          <div className="mb-10">
            <p className="text-2xl text-white font-semibold leading-relaxed mb-4">
              {questions[currentQuestionIndex].questions}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {["option_1", "option_2", "option_3", "option_4"].map(
                (optionKey, index) => (
                  <label
                    key={index}
                    className="flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-200"
                  >
                    <input
                      type="radio"
                      name={`question-${questions[currentQuestionIndex].id}`}
                      value={questions[currentQuestionIndex][optionKey]}
                      className="hidden peer"
                      checked={
                        answers[questions[currentQuestionIndex].id] ===
                        questions[currentQuestionIndex][optionKey]
                      }
                      onChange={() =>
                        handleChange(
                          questions[currentQuestionIndex].id,
                          questions[currentQuestionIndex][optionKey]
                        )
                      }
                    />
                    <span
                      className={`flex items-center justify-center h-6 w-6 rounded-full border-2 border-gray-500 transition-all duration-300 ease-in-out mr-4 peer-checked:bg-blue-500 peer-checked:border-transparent`}
                    >
                      {answers[questions[currentQuestionIndex].id] ===
                        questions[currentQuestionIndex][optionKey] && (
                          <span className="rounded-full h-3 w-3 bg-white"></span>
                        )}
                    </span>
                    <span className="text-xl text-white">
                      {questions[currentQuestionIndex][optionKey]}
                    </span>
                  </label>
                )
              )}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-10">
          <button
            onClick={handlePrev}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
              disabled={loading || isSubmitted}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelUp;
