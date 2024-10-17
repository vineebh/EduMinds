import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const Chatbot = ({ setIsChatbotVisible }) => {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Gemini API
  const genAI = new GoogleGenerativeAI(
    "AIzaSyDg4CuwQGT7ILLwUXz3k8NxWTz6aKcj0lk"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Handle user input
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  // Send message to Gemini with chat history
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);

    // Prepare the chat context (combine user and bot messages)
    const contextMessages = chatHistory
      .map((msg) =>
        msg.type === "user" ? `You: ${msg.message}` : `Bot: ${msg.message}`
      )
      .join("\n");

    const prompt = `${contextMessages}\nYou: ${userInput}`;

    try {
      // Call Gemini API to get a response
      const result = await model.generateContent(prompt);
      const response = await result.response;

      // Add both user input and Gemini's response to the chat history
      setChatHistory((prevChat) => [
        ...prevChat,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
    } finally {
      setUserInput("");
      setIsLoading(false);
    }
  };

  // Clear chat history
  const clearChat = () => {
    setChatHistory([]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="  w-3/4  mx-auto p-4 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-center text-blue-700">Edu Bot</h1>
          <button
            onClick={() => { setIsChatbotVisible(false) }}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
          >
            Close
          </button>
        </div>

        <div className="chat-container h-80 overflow-y-auto rounded-lg bg-gray-100 p-4 shadow-inner">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 p-3 rounded-lg transition-shadow duration-200 ${
                message.type === "user"
                  ? "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-900 shadow-sm"
                  : "bg-gradient-to-r from-gray-200 to-gray-300 text-blue-900 shadow-sm"
              }`}
            >
              {message.type === "user" && (
                <span className="mr-2 font-bold text-gray-700">You:</span>
              )}
              <div className="flex-grow">
                <ReactMarkdown>{message.message}</ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        {/* Input and buttons section */}
        <div className="flex mt-6">
          <form onSubmit={sendMessage} className="w-full flex">
            <input
              type="text"
              className="flex-grow px-4 py-2 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition duration-200"
              placeholder="Type your message..."
              value={userInput}
              onChange={handleUserInput}
            />
            <button
              className={`ml-2 px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
              onClick={sendMessage}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>

        <button
          className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-600 text-white shadow-md hover:bg-gray-700 focus:outline-none transition duration-200"
          onClick={clearChat}
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default Chatbot;