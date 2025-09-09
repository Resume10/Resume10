import React, { useState } from "react";
import { Link } from "react-router-dom";

// NOTE: This component now uses Link from react-router-dom.
// Make sure your project has it installed and set up.

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Checks for user data in localStorage to determine login status.
  const userData = JSON.parse(localStorage.getItem('userData') || 'null');
  const isLoggedIn = !!userData;

  const navLink = isLoggedIn ? '/dashboard' : '/signup';
  const navButtonText = isLoggedIn ? 'Dashboard' : 'Get Started';

  return (
    <header className="text-gray-600 body-font bg-gradient-to-r from-indigo-50 to-purple-50 shadow-sm w-full">
      <div className="container px-5 py-4 mx-auto flex flex-wrap items-center justify-between">
        {/* Logo and Brand Name */}
        <Link to="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <svg className="w-10 h-10 text-white p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-md" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            RESUMATE
          </span>
        </Link>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            )}
          </svg>
        </button>

        {/* Navigation Links */}
        <nav className={`md:ml-auto md:flex md:items-center md:flex-row flex-col w-full md:w-auto ${isMenuOpen ? 'flex' : 'hidden'}`}>
          <div className="w-full md:w-auto mt-4 md:mt-0">
             <Link to={navLink}>
                <button className="w-full md:w-auto inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-0 py-2 px-4 focus:outline-none hover:from-indigo-700 hover:to-purple-700 rounded-lg text-base shadow-md transition-all duration-300 cursor-pointer">
                    {navButtonText}
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
             </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

