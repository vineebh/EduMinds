import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Chatbot from "../components/Chatbot";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../store/testSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";

const ArticleView = () => {
  const API_URL = "https://edu-minds-ebon.vercel.app";
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { articleData, topic_name, courseTitle, level, C_ID } = location.state;
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const userInfo = useSelector((state) => state.auth.userInfo);
  const email_id = userInfo.userID;
  const [completedTest, setCompletedTest] = useState([]);

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_URL}/assessment/chapterQ`,
        {
          topic: topic_name,
          c_id: C_ID,
          limit: 5,
        }
      );
      dispatch(setQuestions(response.data)); // Update the state with questions
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to fetch questions";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Test completion handler
  const testHandler = () => {
    if (completedTest.includes(topic_name)) {
      toast.success("Test is Already Submitted");
      return;
    }
    fetchQuestions(); // Fetch questions if the test hasn't been completed
    navigate("/test", {
      state: { C_ID, level, topic: topic_name, courseTitle },
    });
  };

  // Fetch the test completion status
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/completed_questions`,
          {
            email_id: email_id,
            course_title: courseTitle,
          }
        );
        if (res.status === 200) {
          setCompletedTest(res?.data.data.topic_name || []);
          setLoading(false)
        }
      } catch (error) {
        toast.error("Failed to load test data.");
      }
    };

    fetchTestData();
  }, [email_id, courseTitle]);

  const toggleChatbot = () => {
    setIsChatbotOpen((prev) => !prev);
  };

  // Show loader while data is loading
  if (loading) {
    return <Loader size="20" color="from-yellow-300 to-blue-600" />;
  }

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-6">
      <article className="max-w-5xl m-auto bg-gray-800 text-white rounded-lg shadow-2xl overflow-hidden">
        {/* Header Section */}
        <header className="p-8 bg-gray-700 border-b flex items-center justify-between border-gray-600 shadow-md hover:shadow-lg transition-shadow duration-300">
          <h1 className="text-5xl font-bold text-yellow-400 mb-2 mt-3">
            {articleData.title || "Untitled Article"}
          </h1>
          <button
            onClick={toggleChatbot}
            className="mt-4 px-4 py-2 lg:ml-8 sm:ml-6 ml-4 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-gray-700 hover:text-white transition duration-200"
          >
            Ask EduBot
          </button>
        </header>

        {/* Content Section */}
        <section className="p-8 space-y-6">
          {/* Introduction */}
          {articleData.content.introduction ? (
            <div className="text-lg text-gray-300 leading-relaxed">
              <h1 className="text-3xl font-semibold text-yellow-300 mb-4">
                Introduction
              </h1>
              <p>{articleData.content.introduction}</p>
            </div>
          ) : (
            <div className="text-gray-400 italic">No introduction available.</div>
          )}

          {/* Main Content rendered with Markdown */}
          {articleData.content.main_content ? (
            <div className="prose prose-invert text-gray-300 leading-relaxed text-justify">
              <ReactMarkdown>{articleData.content.main_content}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-gray-400 italic">No main content available.</div>
          )}
        </section>

        {/* Conclusion Section */}
        <section className="p-8 bg-gray-700 border-t border-gray-600">
          {articleData.content.conclusion ? (
            <>
              <h2 className="text-3xl font-semibold text-yellow-300 mb-4">
                Conclusion
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                {articleData.content.conclusion}
              </p>
            </>
          ) : (
            <div className="text-gray-400 italic">No conclusion available.</div>
          )}

          {/* Back & Test Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-gray-700 hover:text-white transition duration-200"
            >
              Back
            </button>

            <button
              onClick={testHandler}
              className="mt-4 px-6 py-2 bg-yellow-400 text-black rounded-lg shadow-md hover:bg-gray-700 hover:text-white transition duration-200"
            >
              {completedTest.includes(topic_name)
                ? "Test Completed"
                : "Complete Test"}
            </button>
          </div>
        </section>
      </article>

      {/* Chatbot */}
      {isChatbotOpen && (
        <div className="fixed bottom-0 right-0 m-4 z-50">
          <Chatbot setIsChatbotVisible={setIsChatbotOpen} />
        </div>
      )}
    </div>
  );
};

export default ArticleView;
