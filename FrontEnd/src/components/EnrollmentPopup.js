import React, { useEffect, useState } from "react";
import Confetti from "react-confetti"; // Party popper animation
import { FaMedal } from "react-icons/fa"; // Achievement icon

const EnrollmentPopup = ({ courseName, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false); // Auto close after 5 seconds
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  useEffect(() => {
    const confettiTimer = setTimeout(() => setShowConfetti(false), 4500); // Stop confetti after 4.5 seconds
    return () => clearTimeout(confettiTimer);
  }, []);

  return (
    <>
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`bg-white rounded-lg p-8 shadow-2xl max-w-sm w-full text-center transform transition-transform duration-500 ${
            isVisible ? "scale-100" : "scale-50"
          }`}
        >
          <div className="flex justify-center items-center mb-6">
            <FaMedal className="text-yellow-400 text-5xl mr-2 animate-pulse" />
            <h3 className="text-3xl font-extrabold text-gray-800">Congratulations!</h3>
          </div>
          <p className="text-gray-700 text-lg font-semibold mb-4">
            You have successfully enrolled in <strong>{courseName}</strong>!
          </p>

          <button
            className="mt-6 bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg transform hover:scale-105"
            onClick={() => setIsVisible(false)}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default EnrollmentPopup;
