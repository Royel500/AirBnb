import React, { useState, useEffect } from 'react';
import {
  FaAirbnb,
  FaGlobe,
  FaBars,
  FaUserCircle,
  FaSearch,
  FaHome,
  FaGlobeAmericas,
  FaConciergeBell,
  FaPlusCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom'; // ✅ react-router-dom

const AirbnbNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Navigation Bar */}
      <header
        className={`fixed top-2 left-0 w-full z-50 transition-all
           duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
        }`}
      >
        <div className="container hidden mx-5 lg:flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <FaAirbnb className="text-rose-500 text-3xl mr-2" />
              <span className="text-rose-500 font-bold text-2xl hidden md:block">
                airbnb
              </span>
            </div>
          </Link>



          {/* Desktop / Tablet Menu */}
          {!isScrolled && (
     <div className=" hidden lg:flex space-x-5">

            <Link to="/" className="flex  gap-1 items-center text-[15px] font-medium">

              <FaHome className="text-2xl text-rose-500 mb-1" /> 

              Homes

            </Link>

<Link to="/" className="flex gap-2 items-center text-[15px] font-medium relative">
  <div className="relative">
    <FaGlobeAmericas className="text-2xl text-rose-500 mb-1" />
    {/* 🔴 NEW Badge */}
<span className="absolute -top-4 -right-7 bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 
  rounded-tr-md rounded-tl-md rounded-br-md">
  NEW
</span>

  </div>
  Experiences
</Link>


            <Link to="/" className="flex  gap-2 items-center text-[15px] font-medium">
            <div className="relative">
              <FaConciergeBell className="text-2xl text-rose-500 mb-1" />
<span className="absolute -top-4 -right-7 bg-gray-500 text-white text-[10px] font-bold px-1.5 py-0.5 
  rounded-tr-md rounded-tl-md rounded-br-md">
  NEW
</span>

  </div>
               Services
            </Link>
            <Link to="/addPakage" className="flex gap-2 items-center text-[15px] font-medium">
              <FaPlusCircle className="text-2xl text-rose-500 mb-1" /> Add Package
            </Link>
          </div>

          )}

          {/* Right Side Menu */}
          <div className="flex items-end space-x-4">
            <button className="hidden md:block text-sm font-medium rounded-full
             hover:bg-gray-100 py-2 ">

              Become a Host
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FaGlobe className="text-gray-600 text-lg" />
            </button>
            <div
              className="flex items-center border border-gray-300
               rounded-full p-2 space-x-2 hover:shadow-md md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars className="text-gray-500" />
              <FaUserCircle className="text-gray-500 text-xl" />
            </div>
            <div className="hidden md:flex items-center border
             border-gray-300 rounded-full p-2 space-x-2 hover:shadow-md">
              <FaBars className="text-gray-500" />
              <FaUserCircle className="text-gray-500 text-xl" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {/* {menuOpen && (
          <div className="lg:hidden inline-block bg-white shadow-md py-4">
            <Link to="/" className="block px-6 py-2 border-b">
              Home
            </Link>
            <Link to="/" className="block px-6 py-2 border-b">
              Experiences
            </Link>
            <Link to="/" className="block px-6 py-2 border-b">
              Service
            </Link>
            <Link to="/addPakage" className="block px-6 py-2">
              Add Package
            </Link>
          </div>
        )} */}


        {/* Mobile top search */}
        <div className="lg:hidden  sm:flex mt-2 px-4">
          <div className="flex items-center border border-gray-300 rounded-full py-2 px-4 shadow-sm">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search destinations"
              className="flex-grow text-sm outline-none"
            />
          </div>
     

         {/* Mobile main nav items below search */}
      <div className="lg:hidden   bg-white  px-4 
      flex justify-around
     
      shadow-md py-2 fixed  left-0 w-full z-">

        <Link to="/" className="flex flex-col items-center 
        text-xs font-medium">
          <FaHome className="text-xl text-rose-500 mb-1" /> Home
        </Link>
        <Link to="/" className="flex flex-col items-center text-xs font-medium">
          <FaGlobeAmericas className="text-xl text-rose-500 mb-1" /> Experiences
        </Link>
        <Link to="/" className="flex flex-col items-center text-xs font-medium">
          <FaConciergeBell className="text-xl text-rose-500 mb-1" /> Services
        </Link>
        <Link to="/addPakage" className="flex flex-col items-center text-xs font-medium">
          <FaPlusCircle className="text-xl text-rose-500 mb-1" /> Add Package
        </Link>
      </div>    </div>

        {/* Search Bar - visible when scrolled */}
{isScrolled && (
   <div className="py-3 hidden lg:flex ">
   <div className="flex items-center border border-gray-300 
   rounded-full py-1 px-4 shadow-sm hover:shadow-md transition-shadow max-w-md mx-auto">
    <div className="flex-grow flex items-center justify-between"> 
      <button className="font-medium text-lg px-4">Anywhere</button> 
      <span className="h-4 bg-gray-300 w-px"></span> 
      <button className="text-lg font-medium px-4">Any Time</button>
       <span className="h-4 bg-gray-300 w-px"></span>
        <button className="text-[15px] font-medium text-gray-500 px-4">
           Add guests </button> <button className="bg-rose-500 rounded-full p-2"> 
            <FaSearch className="text-white text-xs" /> {/* ✅ fixed */}
 </button>
  </div>
   </div>
    </div> )}

      </header>

      {/* Extra Search Bar - NOT scrolled */}
<div
  className={`transition-all hidden lg:flex justify-center 
    duration-200 mt-24 px-10 ${
    isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-96'
  }`}
>
  <div
    className="flex items-center border
     border-gray-300 rounded-full px-10 shadow-xl 
     hover:shadow-md transition-shadow py-2 space-y-2
      lg:space-y-0 lg:space-x-10"
  >
    <button className=" font-medium text-sm leading-tight">
      Where <br /> <span className="font-normal text-gray-500 whitespace-nowrap">Search destinations</span>
    </button>
    <span className="h-4 bg-gray-300 w-px hidden lg:block"></span>

    <button className="font-medium text-sm leading-tight">
      Check in <br />
      <span className="font-normal text-gray-500 whitespace-nowrap">Add Dates</span>
    </button>

    <span className="h-4 bg-gray-300 w-px hidden lg:block"></span>

    <button className="flex-1 text-left font-medium text-sm whitespace-nowrap leading-tight">
      Check Out <br /> <span className="font-normal text-gray-500 whitespace-nowrap">Add dates</span>
    </button>
    <span className="h-4 bg-gray-300 w-px hidden lg:block"></span>

    <button className="flex-1 text-left font-medium text-sm leading-tight">
      Who <br /> <span className="font-normal text-gray-500 whitespace-nowrap">Add guests</span>
    </button>

    <button className="bg-rose-500 rounded-full p-2">
      <FaSearch className="text-white text-xs" />
    </button>
  </div>
</div>



    </>
  );
};

export default AirbnbNav;
