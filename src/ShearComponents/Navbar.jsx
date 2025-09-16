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
  FaQuestionCircle
} from 'react-icons/fa';

import { Link } from 'react-router'; 
import { useLanguage } from '../hooks/useLanguage';
import LanguageSelector from '../Components/Languange/LanguageSelector';
import useAxiosecure from '../hooks/useAxiosecure';


const AirbnbNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
const [searchTerm, setSearchTerm] = useState("");
const [showSearch, setShowSearch] = useState(false);

const [searchResults, setSearchResults] = useState([]);
const [searchLoading, setSearchLoading] = useState(false);
const [searchError, setSearchError] = useState('');

   const { t, language } = useLanguage();
const axiosSecure = useAxiosecure();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);




const handleSearch = async () => {
  if (!searchTerm.trim()) return;

  try {
    setSearchLoading(true);
    setSearchError('');
    const res = await axiosSecure.get(`/packages?search=${encodeURIComponent(searchTerm)}`);
    
    if (res.data.success) {
      console.log("Search results:", res.data.data);
      setSearchResults(res.data.data); // store results in state
    } else {
      setSearchResults([]);
      setSearchError(res.data.message || 'No results found');
    }
  } catch (err) {
    setSearchResults([]);
    setSearchError(err.response?.data?.message || 'Search failed. Please try again.');
    console.error("Search failed:", err);
  } finally {
    setSearchLoading(false);
  }
};


  return (
    <>
      {/* Top Navigation Bar */}
      <header
        className={`fixed top-0 dark:bg-black w-full z-900 transition-all
           duration-300 ${
          isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
        }`}
      >
<div className="hidden mx-20
 lg:flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center">
              <FaAirbnb className="text-rose-500 text-3xl mr-2" />
              <span className="text-rose-500 font-bold text-2xl hidden md:block">
                airbnb
              </span>
            </div>
          </Link>

{/* Search Bar - visible when scrolled */}
{isScrolled && (
   <div className="py-2 hidden lg:flex ">
     <div className="flex items-center border border-gray-300 
     rounded-full py-1 px-4 shadow-sm hover:shadow-md transition-shadow max-w-md mx-auto">
       <div className="flex-grow flex items-center justify-between"> 
         <button className="font-medium text-[15px] px-4">Anywhere</button> 
         <span className="h-4 bg-gray-300 w-px"></span> 
         <button className="text-[15px] font-medium px-4">Any Time</button>
         <span className="h-4 bg-gray-300 w-px"></span>
         <button className="text-[15px] font-medium  px-4">
           Add guests
         </button>


{/* -------search option----- */}


    <button
      onClick={() => setShowSearch(!showSearch)}
      className="bg-rose-500 rounded-full p-2"
    >
      <FaSearch 
      className="text-white " />
    </button>



       </div>
     </div>
   </div>
)}


          {/* Desktop / Tablet Menu */}
{!isScrolled && (
  <div className="hidden lg:flex flex-1 justify-center items-center space-x-5">

<Link to="/" className="flex gap-1 items-center text-[16px] font-semibold">
   <FaHome className="text-2xl text-rose-500 mb-1" />
{t.navbarHome}
</Link>


         
      

    <Link to="/" className="flex gap-2 items-center text-[16px] font-semibold relative">
      <div className="relative">
        <FaGlobeAmericas className="text-xl text-rose-500 mb-1" />
        {/* 🔴 NEW Badge */}
        <span className="absolute -top-4 -right-7 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 
          rounded-tr-md rounded-tl-md rounded-br-md">
          NEW
        </span>
      </div>
      {t.navbarExperiences}
    </Link>

    <Link to="/" className="flex gap-2 items-center text-[16px] font-semibold">
      <div className="relative">
        <FaConciergeBell className="text-xl text-rose-500 mb-1" />
        <span className="absolute -top-4 -right-7 bg-gray-500 text-white text-[10px] font-bold px-2 py-0.5 
          rounded-tr-md rounded-tl-md rounded-br-md">
          NEW
        </span>
      </div>
      {t.navbarServices}
    </Link>
{/* 
    <Link to="/addPakage" className="flex gap-2 items-center text-[16px] font-semibold">
      <FaPlusCircle className="text-xl text-rose-500 mb-1" /> Add Package
    </Link> */}
  </div>
)}


          {/* Right Side Menu */}
          <div className="flex right-0 space-x-1 justify-end">
            <button className="hidden md:block   text-sm font-medium rounded-full
              py-2 ">

              Become a Host
            </button>
            <button className="p-2 rounded-full ">

<LanguageSelector/>
           
   </button>

<div
  className="flex items-center border border-gray-300 rounded-full 
  px-3 space-x-1 hover:shadow-md"

  onClick={() => setMenuOpen(!menuOpen)}
>
  <FaBars className="text-gray-500" />
  <FaUserCircle className="text-gray-500 text-xl" />
</div>

          </div>
        </div>


{/* Desktop toggle menu */}
{menuOpen && (
  <div className="hidden lg:block absolute top-full text-left right-0 w-56
   bg-white dark:bg-black dark:text-white shadow-lg rounded-lg z-50 p-4">  

<Link 
  to="/" 
  className="flex items-center gap-2 font-bold py-2 border-b border-gray-300"
>
  <FaQuestionCircle className="text-gray-600" />
  {t.navbarHelpCenter}
</Link>  
 <Link to="/addPakage" className="block font-bold   py-2">{t.navbarAddPackage} </Link>

  <Link to="#" className="block  py-2 border-b border-gray-300 "> 
  <span className='font-bold'> {t.navbarBecomeHost}</span>
    <br />
    <span className='text-[15px]'>
      It's easy to hosting and earnextra income
    </span>
     </Link>
    <Link to="#" className="block font-bold   py-2 ">Find a co-host</Link>
    <Link to="/#" className="block font-bold   py-2 border-b border-gray-300 ">Gift cards</Link>
    <Link to="/" className="block font-bold   py-2">{t.navbarSignIn}</Link>
  </div>
)}



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
<div className="lg:hidden bg-white px-4 flex justify-around shadow-md py-2 fixed bottom-0 left-0 w-full z-50">


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



      </header>

      {/* Extra Search Bar - NOT scrolled */}
<div
  className={`transition-all hidden 
    lg:flex justify-center 
    duration-200 mt-24 px-10 ${
    isScrolled ? 'opacity-0 max-h-0 overflow-hidden' : 'opacity-100 max-h-96'
  }`}
>
<div className="flex items-center border border-gray-300 rounded-full px-10 shadow-xl hover:shadow-md py-2 space-y-2 lg:space-y-0 lg:space-x-10 mx-auto">

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

{/* -------search option----- */}
<div className={`lg:flex justify-center  ${showSearch ? "block" : "hidden"}`}>
  <div className="flex items-center border border-gray-300 
  rounded-full px-4 shadow-lg py-2 space-x-2 w-[200px]">
    <button
      onClick={() => setShowSearch(!showSearch)}
      className="bg-rose-500 rounded-full p-2"
    >
      <FaSearch className="text-white text-xs" />
    </button>

    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-grow outline-none text-sm"
    />
    <button
      onClick={handleSearch}
      className="bg-gray-500 text-white px-3 -ml-13 py-1 rounded-md text-sm"
    >
      Go
    </button>
  </div>
</div>



  </div>
</div>



    </>
  );
};

export default AirbnbNav;
