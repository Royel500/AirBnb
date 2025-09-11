import React, { useState, useEffect } from 'react';
import { FaAirbnb, FaGlobe, FaBars, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router';

const AirbnbNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

 

  return (
    <>
      {/* Top Navigation Bar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
              <Link to={'/'}>
            <div className="flex items-center">
              <FaAirbnb className="text-rose-500 text-3xl mr-2" />
              <span className="text-rose-500 font-bold text-xl hidden md:block">airbnb</span>
            </div>       </Link>

            {/* Middle Navigation Items - Visible when not scrolled */}
            {!isScrolled && (
              <div className="hidden lg:flex items-center justify-center space-x-8 flex-1 mx-8">
                           <Link to={'/'}>
                    <button className="text-xs font-medium px-4">Home</button>
                   </Link>
                           <Link to={'/'}>
                    <button className="text-xs font-medium px-4">Stays</button>
                   </Link>
                           <Link to={'/'}>
                    <button className="text-xs font-medium px-4">Experiences</button>
                   </Link>
                           <Link to={'/'}>
                    <button className="text-xs font-medium px-4">Online Experiences</button>
                   </Link>

              
                           <Link to={'/addPakage'}>
                    <button className="text-xs font-medium px-4">Add Pakage</button>
                   </Link>

              
              </div>
            )}

            {/* Search Bar - Visible when scrolled */}
            {isScrolled && (
              <div className="flex-1 mx-4 md:mx-12">
                <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-grow flex items-center justify-between">
                    <button className="text-xs font-medium px-4">Anywhere</button>
                    <span className="h-4 bg-gray-300 w-px"></span>
                    <button className="text-xs font-medium px-4">Any week</button>

       
                    <span className="h-4 bg-gray-300 w-px"></span>

                    <button className="text-xs text-gray-500 px-4">Add guests</button>
                    <button className="bg-rose-500 rounded-full p-2">
                      {/* <FaSearch className="text-white text-xs" /> */}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Right Side Menu */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:block text-sm font-medium rounded-full hover:bg-gray-100 py-2 px-4">
                Become a Host
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <FaGlobe className="text-gray-600 text-lg" />
              </button>
              <div className="flex items-center border border-gray-300 rounded-full p-2 space-x-2 hover:shadow-md">
                <FaBars className="text-gray-500" />
                <FaUserCircle className="text-gray-500 text-xl" />
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Only visible when scrolled on mobile */}
          {isScrolled && (
            <div className="lg:hidden mt-3">
              <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow">
                {/* <FaSearch className="text-gray-500 mr-2" /> */}
                <div className="flex-grow">
                  <span className="text-xs text-gray-500">Where to?</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

    </>
  );
};

export default AirbnbNav;