import axios from "axios";
import { useLocation } from "react-router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

const Test = () => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const location = useLocation();
  const { C_ID, topic, courseTitle } = location.state;
  const questions = useSelector((state) => state.test.questions);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const email_id = userInfo.userID;

  const handleChange = (questionId, selectedOption) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    const currentQuestionId = questions[currentQuestionIndex].id;

    if (!answers[currentQuestionId]) {
      toast.error(
        "Please select an answer before proceeding to the next question."
      );
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
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
        `${API_URL}/assessment/submit`,
        {
          c_id: C_ID,
          answers: answerArray,
        }
      );
      if (response.status === 200)
      {
        toast.success(
          `You answered ${response.data.correct} out of ${questions.length} questions correctly!`
        );
        const resp = await axios.post(`${API_URL}/mark_questions`, {
          email_id: email_id,
          course_title: courseTitle,
          topic_name: topic,
        });
        if (resp.status === 201) {
          const res = await axios.post(`${API_URL}/update_points_and_level`, {
            email: email_id,
            course_title: courseTitle,
            new_points: (5*response.data.correct),
          });
          if ( res.status === 200)
          {
            toast.success((5*response.data.correct)," Points added");
            window.history.back();
          }
        }
      }  
    } catch (error) {
      toast.error("Error during submission");
    }
  };

  const isFirstQuestion = currentQuestionIndex > 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="bg-gray-900 min-h-screen py-12 sm:py-16 flex items-center justify-center">
      <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-4xl text-white font-extrabold text-center mb-8">
          Quiz
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
          {isFirstQuestion && (
            <button
              onClick={handlePrev}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Previous
            </button>
          )}

          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-300"
            >
              Submit
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

export default Test;
