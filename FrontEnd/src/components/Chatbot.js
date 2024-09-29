import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
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

  // Send message to Gemini
  const sendMessage = async () => {
    if (userInput.trim() === "") return;

    setIsLoading(true);
    try {
      // Call Gemini API to get a response
      const result = await model.generateContent(userInput);
      const response = await result.response;
      console.log(response);
      // Add Gemini's response to the chat history
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error("Error sending message", error);
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
    <div className="max-w-lg mx-auto my-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-6">Edu Bot</h1>

      <div className="chat-container h-80 overflow-y-auto rounded-lg bg-gray-50 p-4 shadow-inner">
        {chatHistory.map((message, index) => (
          <div
            key={index}
            className={`flex items-start mb-4 p-3 rounded-lg shadow-sm ${
              message.type === "user"
                ? "bg-gradient-to-r from-blue-100 to-blue-200 text-gray-900"
                : "bg-gradient-to-r from-gray-100 to-gray-200 text-blue-900"
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

      <div className="flex mt-6">
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
      </div>
      <button
        className="mt-4 px-4 py-2 w-full rounded-lg bg-gray-500 text-white shadow-md hover:bg-gray-600 focus:outline-none transition duration-200"
        onClick={clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default Chatbot;
