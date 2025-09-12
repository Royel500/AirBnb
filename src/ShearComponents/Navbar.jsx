import React, { useState, useEffect } from 'react';
import { FaAirbnb, FaHome, FaGlobeAmericas, FaConciergeBell, FaPlusCircle, FaSearch, FaBars, FaUserCircle, FaGlobe } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ react-router-dom

const AirbnbNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all
         duration-300 bg-white shadow-md ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo */}
          <Link to="/">
            <div className="lg:flex hidden items-center">
              <FaAirbnb className="text-rose-500 text-3xl mr-2" />
              <span className="text-rose-500 font-bold text-2xl hidden md:block">airbnb</span>
            </div>
          </Link>

          {/* Middle nav items */}
          <div className="flex-1 hidden lg:flex items-center justify-center space-x-12">
            <Link to="/" className="flex flex-col items-center text-xs font-medium">
              <FaHome className="text-2xl text-rose-500 mb-1" /> Home
            </Link>
            <Link to="/" className="flex flex-col items-center text-xs font-medium">
              <FaGlobeAmericas className="text-2xl text-rose-500 mb-1" /> Experiences
            </Link>
            <Link to="/" className="flex flex-col items-center text-xs font-medium">
              <FaConciergeBell className="text-2xl text-rose-500 mb-1" /> Service
            </Link>
            <Link to="/addPakage" className="flex flex-col items-center text-xs font-medium">
              <FaPlusCircle className="text-2xl text-rose-500 mb-1" /> Add Package
            </Link>
          </div>

          {/* Right side menu - hidden on mobile */}
          <div className="hidden md:flex items-center space-x-4">
           <div className="flex items-center space-x-4"> 
            <button className="hidden md:block text-sm font-medium rounded-full hover:bg-gray-100 py-2 px-4">
               Become a Host </button> <button className="p-2 rounded-full hover:bg-gray-100">
                 <FaGlobe className="text-gray-600 text-lg" /> </button>
                  <div className="flex items-center border border-gray-300 rounded-full p-2 
                  space-x-2 hover:shadow-md"> <FaBars className="text-gray-500" /> 
                  <FaUserCircle className="text-gray-500 text-xl" /> </div> </div> 
          </div>

        </div>

        {/* Mobile top search */}
        <div className="lg:hidden mt-3 px-4">
          <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search destinations"
              className="flex-grow text-sm outline-none"
            />
          </div>
        </div>
      </header>

      {/* Mobile main nav items below search */}
      <div className="lg:hidden pt-6 px-4 flex justify-around bg-white shadow-md py-2 fixed top-[70px] left-0 w-full z-40">
        <Link to="/" className="flex flex-col items-center text-xs font-medium">
          <FaHome className="text-xl text-rose-500 mb-1" /> Home
        </Link>
        <Link to="/" className="flex flex-col items-center text-xs font-medium">
          <FaGlobeAmericas className="text-xl text-rose-500 mb-1" /> Experiences
        </Link>
        <Link to="/" className="flex flex-col items-center text-xs font-medium">
          <FaConciergeBell className="text-xl text-rose-500 mb-1" /> Service
        </Link>
        <Link to="/addPakage" className="flex flex-col items-center text-xs font-medium">
          <FaPlusCircle className="text-xl text-rose-500 mb-1" /> Add Package
        </Link>
      </div>
    </>
  );
};

export default AirbnbNav;
