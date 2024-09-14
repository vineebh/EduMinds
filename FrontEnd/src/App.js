import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Header from "./components/Header";
import Home from "./Pages/Home";
import Auth from "./components/Auth/Auth";
import { AuthProvider } from "./contexts/authContext"; 
import Test from "./Pages/Test";
import Courses from "./Pages/Courses";

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
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
