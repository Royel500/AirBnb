import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart, FaMapMarkerAlt, FaMoon, FaSpinner } from 'react-icons/fa';
import useAxiosecure from '../../hooks/useAxiosecure';
import { Link } from 'react-router';

const PackageListings = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosecure();
  const [count, setCount] = useState(30); // initial value 30

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get('/packages');
      
      if (response.data.success) {
        setPackages(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch packages');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching packages');
    } finally {
      setLoading(false);
    }
  };
  const handleClick = () => {
    setCount(prev => prev + 1); // increase by 1 on every click
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
            <p>{error}</p>
            <button 
              onClick={fetchPackages}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Stay in London</h1>
        <p className="text-gray-600 mb-8">Discover amazing places to stay in London</p>

        {packages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No packages found.</p>
          </div>
        ) : (
          <>
            {/* Guest Favorites Section */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Guest favorites</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 ">
                {packages
                  .filter(pkg => pkg.guestFavorite)
                  .map((pkg) => (
                    <PackageCard 
                      key={pkg._id} 
                      pkg={pkg} 
                     
                    />
                  ))
                }
              </div>
            </div>

            {/* All Listings Section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Places to stay in London</h2>

     <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6">
                {packages.map((pkg) => (
                  <PackageCard 
                    key={pkg._id} 
                    pkg={pkg} 
                   
                  />
                ))}
              </div>
            </div>

            {/* Next Month Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6">Available next month in Toronto</h2>
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-gray-500">More properties coming soon for next month!</p>
                <button className="mt-4 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-200">
                  Show more
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg }) => {
  return (
    <div className=" rounded-xl overflow-hidden transition-shadow">
      {/* Image */}
      <div className="relative">

<Link to={`/packages/${pkg._id}`}>
  <img 
    src={pkg?.image} 
    alt={pkg?.title} 
    className="w-40 h-40  rounded-2xl "
    onError={(e) => { 
      e.target.src = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?...'; 
    }}
  />
</Link>

       
        <button 
          className="absolute top-3 right-0.5
           text-white z-999 hover:text-red-500 transition-colors"
        >
          <FaHeart className={pkg.isFavorite ?
             "text-green-500":"text-red-500"  } /> 
             <span>0000000</span> 
        </button>

        {pkg.guestFavorite && (
          <div className="absolute top-3 left-3 
          bg-white px-2 py-1 rounded text-xs font-semibold">
            Guest favorite
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold ">{pkg.title}</h3>

        </div>
        
        <div className=" border-gray-100">
          <div className="flex items-center">
            
              <span className="">${pkg.price}</span> 

              <span className="text-gray-500"> / {pkg.duration} nights</span>
                        
                        <div className="flex items-center">
            <FaStar className="text-red-500 " />
            <span>{pkg.rating}</span>
          </div>
           
     
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageListings;