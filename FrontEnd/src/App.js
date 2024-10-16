import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import VideoPlayerPage from "./Pages/VideoPlayePager";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import DashBoard from "./Pages/DashBoard";
import Assessment from "./Pages/Assessment";
import MCQ from "./Pages/MCQ";
import ArticleView from "./Pages/ArticleView";
import Test from "./Pages/Test";
import EveryDayQuestion from "./Pages/EveryDayQuestion";
import LevelUp from "./Pages/LevelUp";


function App() {
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<Home/>}/>

          {!loginStatus && <Route path="/auth" element={<Auth />} />}

          {loginStatus && <Route path="/Assessment" element={<Assessment />} />}
          {loginStatus && <Route path="/mcq" element={<MCQ />} />}
          {loginStatus && <Route path="/dashboard" element={<DashBoard />} />}
          {loginStatus && <Route path="/video" element={<VideoPlayerPage />} />}
          {loginStatus && <Route path="/article" element={<ArticleView />} />}
          {loginStatus && <Route path="/test" element={<Test />} />}
          {loginStatus && <Route path="/everydayquestion" element={<EveryDayQuestion />} />}
          {loginStatus && <Route path='/levelUp'element={<LevelUp/>}/>}


        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
