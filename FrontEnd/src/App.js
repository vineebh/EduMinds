import React from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Home from "./Pages/Home";
import VideoPlayerPage from "./components/VideoPlayePager";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import DashBoard from "./Pages/DashBoard";
import Assessment from "./Pages/Assessment";
import Exam from "./Pages/MCQ";
import ArticleView from "./components/ArticleView";
import { useSelector } from "react-redux";
import Exam from "./Pages/MCQ";
import ArticleView from "./components/ArticleView";


function App() {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  return (
    <div className="flex flex-col min-h-screen bg-[#1B2433]">
      <Header />

    

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/*" element={<Home/>}/>

          {!loginStatus && <Route path="/auth" element={<Auth />} />}

          {loginStatus && <Route path="/mcq" element={<Exam />} />}
          {loginStatus && <Route path="/dashboard" element={<DashBoard />} />}

          {loginStatus && <Route path="/Assessment" element={<Assessment />} />}
          {loginStatus && <Route path="/video" element={<VideoPlayerPage />} />}
          {loginStatus && (
            <Route path="/articleView" element={<ArticleView />} />
          )}

          {/* New route for the video player page */}

          <Route path="/*" element={<Home/>}/>
          {!loginStatus && <Route path="/auth" element={<Auth />} />}
          {loginStatus && <Route path="/mcq" element={<Exam />} />}
          {loginStatus && <Route path="/dashboard" element={<DashBoard />} />}
          {loginStatus && <Route path="/Assessment" element={<Assessment />} />}
          {loginStatus && <Route path="/video" element={<VideoPlayerPage />} />}
          {loginStatus && <Route path="/articleView" element={<ArticleView />} />}


        </Routes>
      </main>
    </div>
  );
}

export default App;
