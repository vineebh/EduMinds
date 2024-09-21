import React from "react";
import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Header from "./components/Header";
import { AuthProvider } from "./contexts/authContext";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Courses from "./Pages/Courses";
import Home from "./Pages/Home";
import Test from "./Pages/Test";
import Exam from "./Pages/MCQ";

function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses"  element={<Courses/>}/>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/test" element={<Test/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/mcq" element={<Exam/>}/>
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
