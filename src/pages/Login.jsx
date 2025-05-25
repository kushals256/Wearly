import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';  // <-- Import useNavigate

const Login = () => {
  const [tab, setTab] = useState("signin");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [showSignupFields, setShowSignupFields] = useState(false);
  const [animateSignupFields, setAnimateSignupFields] = useState(false);

  const navigate = useNavigate(); // <-- Initialize navigate

  useEffect(() => {
    if (tab === "signup") {
      setShowSignupFields(true);
      setTimeout(() => setAnimateSignupFields(true), 10);
    } else {
      setAnimateSignupFields(false);
      const timeout = setTimeout(() => setShowSignupFields(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [tab]);

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (tab === 'signup') {
        await fetch('https://wearly-nine.vercel.app', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            firstName,
            lastName,
            collegeName,
            collegeEmail
          }),
        });
        alert("Registered Successfully");
      } else {
        alert("Signed In Successfully");
      }

      // Instead of window.location.href, use navigate:
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          navigate('/explore');  // <-- Navigate internally to /explore route
        }
      });

    } catch (err) {
      console.error(err);
      alert("Authentication Failed");
    }
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-white text-black select-none flex items-center justify-center">
      
      {/* Background image div */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-vector/abstract-background-black-lines-white-background-simple-design_888684-223.jpg?w=2000')",
        }}
      ></div>

      {/* Main login form container */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl border border-black shadow-2xl bg-white/70 backdrop-blur-sm transition-all duration-300 ease-in-out">
        
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setTab("signin")}
            className={`w-1/2 py-2 font-bold rounded-full transition-all duration-200
              ${tab === 'signin'
                ? 'bg-black text-white scale-105 shadow-md'
                : 'bg-gray-100 text-black hover:scale-105'}`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`w-1/2 py-2 font-bold rounded-full transition-all duration-200
              ${tab === 'signup'
                ? 'bg-black text-white scale-105 shadow-md'
                : 'bg-gray-100 text-black hover:scale-105'}`}
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-4 animate-fadeIn">
          <button
            onClick={handleGoogleAuth}
            className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {tab === "signup" ? "Register with Google" : "Login with Google"}
          </button>

          <div
            style={{
              maxHeight: animateSignupFields ? '500px' : '0px',
              opacity: animateSignupFields ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height 0.3s ease, opacity 0.3s ease',
            }}
          >
            {showSignupFields && (
              <div className="space-y-4 mt-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white placeholder:text-gray-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white placeholder:text-gray-600"
                />
                <input
                  type="text"
                  placeholder="College Name"
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white placeholder:text-gray-600"
                />
                <input
                  type="email"
                  placeholder="College Email"
                  value={collegeEmail}
                  onChange={(e) => setCollegeEmail(e.target.value)}
                  className="w-full p-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white placeholder:text-gray-600"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
