// src/pages/Home.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    title: "Tired of wearing the same outfit to every event?",
    subtitle: "Fests, birthdays, parties... but your closet don’t keep up?",
  },
  {
    title: "Borrow. Rent. Swap. Flex.",
    subtitle:
      "Wearly lets you rent or swap outfits and accessories with students in your own college — safely and affordably",
  },
  {
    title: "Ready to Loop in?",
    subtitle: "Join the college fashion circle. Your next outfit’s already waiting.",
  },
];

const Home = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (index === slides.length - 1) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [index, navigate]);

  const handleNext = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-white relative">
      {/* Background image for slides only */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/abstract-background-black-lines-white-background-simple-design_888684-223.jpg?w=2000')",
        }}
      ></div>

      {/* Slide Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 text-center bg-white/70 backdrop-blur-sm transition-all duration-1000 ease-in-out">
        <h1
          className="text-4xl md:text-5xl font-bold mb-4 text-black"
          style={{ fontFamily: "'Jeju Myeongjo', serif" }}
        >
          {slides[index].title}
        </h1>
        <p
          className="text-md md:text-xl max-w-2xl text-gray-700"
          style={{ fontFamily: "'Jeju Myeongjo', serif" }}
        >
          {slides[index].subtitle}
        </p>

        {index < slides.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 border border-black text-black hover:bg-black hover:text-white transition duration-300 px-4 py-2 rounded-full"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
