import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useSelector } from "react-redux";

const EveryDayQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();
  const { C_ID, level, courseTitle} = location.state || {};
  const email_id = userInfo.userID;

  useEffect(() => {
    const everyDayQuestionHandler = async () => {
      const today = new Date().toISOString().split("T")[0];
      const lastSubmitDate = localStorage.getItem("lastSubmitDate");

      // Check if the question for today is already submitted
      if (lastSubmitDate === today) {
        setIsSubmitted(true);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost:1000/assessment/questions",
          {
            level,
            c_id: C_ID,
            limit: 1,
          }
        );
        if (response.status === 200 && response.data.length > 0) {
          setQuestions(response.data);
          setLoading(false);
          setIsSubmitted(false);
        } else {
          setLoading(false);
          setError("No questions available for today.");
        }
      } catch (error) {
        setLoading(false);
        setError("Error fetching questions. Please try again later.");
        console.error("Error fetching questions:", error);
      }
    };

    everyDayQuestionHandler();
  }, [C_ID, level]);

  const handleChange = (questionId, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    const answerArray = Object.entries(answers).map(
      ([questionId, selectedOption]) => ({
        questionId: parseInt(questionId, 10),
        selectedOption,
      })
    );

    try {
      const response = await axios.post(
        "http://localhost:1000/assessment/submit",
        {
          c_id: C_ID,
          answers: answerArray,
        }
      );
      if (response.status === 200)
      {
        setResult("Your answers have been submitted!");
        setIsSubmitted(true);
        const today = new Date().toISOString().split("T")[0];
        localStorage.setItem("lastSubmitDate", today);
        if(response.data.correct !== 0 ){
          const res = await axios.post("http://localhost:1000/update_points_and_level", {
            email: email_id,
            course_title: courseTitle,
            new_points: 5,
          });
          if ( res.status === 200)
          {
            toast.success("Correct answer")
            toast.success("5 Points added");
            window.history.back();
          }
        }
        else{
          toast.success("Incorrect answer")
        }
      }
    }catch (error) {
      console.error("Error during submission:", error);
      toast.error("Error during submission");
      setResult(
        "An error occurred while submitting your answers. Please try again."
      );
    }
  };

  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-lg">Loading questions...</div>
      </div>
    );
  }

  // Display a message if the question has already been submitted for today
  if (isSubmitted) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-2xl w-full text-center">
          <h1 className="text-3xl text-white font-bold">
            You have already submitted today's question!
          </h1>
          <p className="text-white mt-4">
            Come back tomorrow for a new question.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen py-12 sm:py-16 flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl text-white font-extrabold text-center mb-8">
          Assessment
        </h1>
        <h2 className="text-2xl text-white mb-4">
          Question {currentQuestionIndex + 1} of {questions.length}
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-600 text-white font-semibold rounded-lg">
            {error}
          </div>
        )}

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
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Next
            </button>
          )}
        </div>

        {result && (
          <div className="mt-8 p-6 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md">
            {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default EveryDayQuestion;
