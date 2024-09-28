// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import VideoPlayerPage from "./components/VideoPlayePager"; // Import the VideoPlayerPage
import About from "./Pages/About";
import Assessment from "./Pages/Assessment";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import DashBoard from "./Pages/DashBoard";
import Home from "./Pages/Home";
import Exam from "./Pages/MCQ";
import Test from "./Pages/Test";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
     <Header/>
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/Assessment" element={<Assessment/>} />
          <Route path="/mcq" element={<Exam/>}/>
          <Route path="test" element={<Test/>}/>
          <Route path="/Assessment/:courseName" element={<Assessment/>} />
          {/* New route for the video player page */}
          <Route path="/video" element={<VideoPlayerPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
