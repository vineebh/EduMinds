import axios from "axios";
import { useLocation } from 'react-router';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Test = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const { C_ID , topic } = location.state;
    
    useEffect(() => {
        let isMounted = true;  // Add a flag to check if the component is still mounted
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await axios.post("http://localhost:1000/assessment/chapterQ", {
                    topic: topic,
                    c_id: C_ID,
                    limit: 3
                });
                if (isMounted) {
                    setQuestions(response.data);  // Update state only if the component is still mounted
                }
            } catch (error) {
                if (isMounted) {
                    // Improved error message handling
                    const errorMsg = error.response?.data?.error || 'Failed to fetch questions';
                    toast.error(errorMsg);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchQuestions();
        return () => {
            isMounted = false;  // Cleanup flag on unmount
        };
    }, [C_ID, topic]);
    

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
            toast.error("Please select an answer before proceeding to the next question.");
            return;
        }
    
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleSubmit = async () => {
        const answerArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
            questionId: parseInt(questionId, 10),
            selectedOption,
        }));

        try {
            const response = await axios.post('http://localhost:1000/assessment/submit', {
                c_id: C_ID,
                answers: answerArray,
            });
            toast.success(`You answered ${response.data.correct} out of ${questions.length} questions correctly!`);
            window.history.back();
        } catch (error) {
            console.error('Error during submission:', error);
            toast.error('Error during submission');
            setResult('An error occurred while submitting your answers. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-white text-center">Loading questions...</div>;
    }

    const isFirstQuestion = currentQuestionIndex > 0;
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <div className='bg-gray-900 min-h-screen py-12 sm:py-16 flex items-center justify-center'>
            <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-4xl w-full">
                <h1 className="text-4xl text-white font-extrabold text-center mb-8">Assessment</h1>

                {questions.length > 0 && (
                    <div className="mb-10">
                        <p className="text-2xl text-white font-semibold leading-relaxed mb-4">{questions[currentQuestionIndex].questions}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {['option_1', 'option_2', 'option_3', 'option_4'].map((optionKey, index) => (
                                <label
                                    key={index}
                                    className="flex items-center p-4 bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-600 transition-all duration-200"
                                >
                                    <input
                                        type="radio"
                                        name={`question-${questions[currentQuestionIndex].id}`}
                                        value={questions[currentQuestionIndex][optionKey]}
                                        className="hidden peer"
                                        checked={answers[questions[currentQuestionIndex].id] === questions[currentQuestionIndex][optionKey]}
                                        onChange={() => handleChange(questions[currentQuestionIndex].id, questions[currentQuestionIndex][optionKey])}
                                    />
                                    <span className={`flex items-center justify-center h-6 w-6 rounded-full border-2 border-gray-500 transition-all duration-300 ease-in-out mr-4 peer-checked:bg-blue-500 peer-checked:border-transparent`}>
                                        {answers[questions[currentQuestionIndex].id] === questions[currentQuestionIndex][optionKey] && (
                                            <span className="rounded-full h-3 w-3 bg-white"></span>
                                        )}
                                    </span>
                                    <span className="text-xl text-white">{questions[currentQuestionIndex][optionKey]}</span>
                                </label>
                            ))}
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

                {result && (
                    <div className="mt-8 p-6 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md">
                        {result}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Test;