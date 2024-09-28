import React, { useEffect, useState } from 'react';

const Exam = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLastQuestion, setIsLastQuestion] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:1000/assessment/questions/1'); // Adjust the URL to your backend
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setQuestions(data);
                console.log('Fetched questions:', data);
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    const handleChange = (questionId, selectedOption) => {
        setAnswers({ ...answers, [questionId]: selectedOption });
        console.log('Current answers:', { ...answers, [questionId]: selectedOption }); // Log updated answers
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setIsLastQuestion(true); // Set to true for submission
        }
    };

    const handleSubmit = async () => {
        const answerArray = Object.entries(answers).map(([questionId, selectedOption]) => ({
            questionId,
            selectedOption,
        }));

        console.log('Submitting answers:', answerArray); // Log answers being submitted

        try {
            const response = await fetch('http://localhost:1000/assessment/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: answerArray }),
            });

            if (!response.ok) throw new Error('Submission failed');

            const resultData = await response.json();
            setResult(`You answered ${resultData.correct} out of ${questions.length} questions correctly!`);
        } catch (error) {
            console.error('Error during submission:', error);
            setResult('An error occurred while submitting your answers. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-white text-center">Loading questions...</div>; // Loading state
    }

    return (
        <div className='bg-gray-900 min-h-screen py-12 sm:py-16 mt-16 px-40'>
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl text-white font-bold text-center mb-6">Assessment</h1>

                {questions.length > 0 && (
                    <div className="mb-6">
                        <p className="text-2xl text-white font-medium">{questions[currentQuestionIndex].questions}</p>
                        <div className="grid grid-cols-2 gap-4">
                            {['option_1', 'option_2', 'option_3', 'option_4'].map((optionKey, index) => (
                                <label key={index} className="inline-flex items-center mt-2">
                                    <input
                                        type="radio"
                                        name={`question-${questions[currentQuestionIndex].id}`}
                                        value={questions[currentQuestionIndex][optionKey]} // Get option value directly
                                        className="form-radio text-blue-600"
                                        checked={answers[questions[currentQuestionIndex].id] === questions[currentQuestionIndex][optionKey]}
                                        onChange={() => handleChange(questions[currentQuestionIndex].id, questions[currentQuestionIndex][optionKey])}
                                    />
                                    <span className="text-xl text-white font-medium ml-2">{questions[currentQuestionIndex][optionKey]}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrev}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>

                    <button
                        onClick={isLastQuestion ? handleSubmit : handleNext}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {isLastQuestion ? 'Submit' : 'Next'}
                    </button>
                </div>

                {result && (
                    <div className="mt-6 p-4 bg-green-100 text-green-700 text-xl rounded">
                        {result}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Exam;
