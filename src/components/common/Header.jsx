import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ButtonComp from './Button';
import { useCart } from '../../context/CartContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { getCartCount } = useCart();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error('Sign-out failed:', error);
    }
  };

  // Get first name from display name or email
  const getFirstName = () => {
    if (!user) return '';
    if (user.displayName) {
      return user.displayName.split(' ')[0];
    }
    return user.email.split('@')[0];
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span 
                className="text-3xl tracking-normal leading-tight" 
                style={{ 
                  fontFamily: "'Jeju Myeongjo', serif",
                  fontWeight: "300",
                  letterSpacing: "0.01em"
                }}
              >
                Wearly
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:-translate-y-0.5 transform"
            >
              Home
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:-translate-y-0.5 transform"
            >
              Explore
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:-translate-y-0.5 transform"
            >
              Upload
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-gray-900 transition-colors duration-200 hover:-translate-y-0.5 transform">
              Profile
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="p-2 text-gray-500 hover:text-gray-700 transition-all duration-200 hover:-translate-y-0.5 transform relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">{user.displayName}</span>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-black hover:text-red-600 transition-all duration-200"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleLoginClick}
                className="text-gray-700 hover:text-gray-900 font-medium"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
