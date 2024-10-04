import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Home from './Pages/Home'
import VideoPlayerPage from "./components/VideoPlayePager";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import DashBoard from "./Pages/DashBoard";
import Assessment from "./Pages/Assessment";
import Exam from "./Pages/MCQ"
import ArticleView from "./components/ArticleView";





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
          <Route path="/mcq" element={<Exam/>} />
          {/* New route for the video player page */}
          <Route path="/video" element={<VideoPlayerPage />} />
          <Route path="/articleView" element={<ArticleView/>}/> 
        </Routes>
      </main>
    </div>
  );
}

export default App;
