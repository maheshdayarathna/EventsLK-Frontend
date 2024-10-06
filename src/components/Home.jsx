import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from "../assests/Events.jpg"

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    
    navigate('/addevent');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage:`url(${bg })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-6xl font-extrabold text-white mb-8">Welcome to EventsLK!</h1>
      <button
        onClick={handleGetStarted}
        className="btn-get-started bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md"
      >
        Get Started
      </button>
    </div>
  );
};

export default Home;
