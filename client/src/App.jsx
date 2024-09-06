import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Adjust the path as necessary
import Home from './pages/Home';
import Courses from './pages/Courses';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import MentorDashboard from './pages/MentorDashboard';
import AdminPanel from './pages/AdminPanel';
import RegisterMentor from './pages/RegisterMentor';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register-mentor" element={<RegisterMentor />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/mentor/dashboard" element={<MentorDashboard />} />
      </Routes>
      </div>
    </>
  );
}

export default App;
