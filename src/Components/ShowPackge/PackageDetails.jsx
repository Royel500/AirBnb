import React, { useState, useEffect } from 'react';
import { FaStar, FaHeart, FaMapMarkerAlt, FaMoon, FaUsers, FaSpinner } from 'react-icons/fa';
import { useParams } from 'react-router';
import useAxiosecure from '../../hooks/useAxiosecure';

const PackageDetail = () => {
  const { id: packageId } = useParams(); // get id from route
  const [pkg, setPackage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const axiosSecure = useAxiosecure();

  useEffect(() => {
    if (packageId) fetchPackage();
  }, [packageId]);

  const fetchPackage = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get(`/packages/${packageId}`); // match backend route

      if (response.data.success) {
        setPackage(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch package details');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while fetching package details');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    try {
      const response = await axiosSecure.patch(`/packages/${packageId}`, {
        isFavorite: !pkg.isFavorite
      });

      if (response.data.success) {
        setPackage({ ...pkg, isFavorite: !pkg.isFavorite });
      }
    } catch (err) {
      console.error('Error updating favorite status:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-red-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-10 bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="relative ">
            <img
              src={pkg?.image}
              alt={pkg?.title}
              className="w-screen lg:h-150"
            />
            <button
              onClick={toggleFavorite}
              className="absolute top-6 right-6 text-white hover:text-red-500 bg-black bg-opacity-50 rounded-full p-3"
            >
              <FaHeart className={pkg?.isFavorite ? "text-red-500" : "text-white"} />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{pkg?.title}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <FaMapMarkerAlt className="mr-2" />
                  <span>{pkg?.location}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <FaStar className="text-red-500 mr-1" />
                    <span>{pkg?.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMoon className="mr-1" />
                    <span>{pkg?.propertyType}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="text-2xl font-bold mb-2">
                  ${pkg?.price} <span className="text-sm font-normal text-gray-600">/ {pkg?.duration} nights</span>
                </div>

              </div>
            </div>

            {pkg.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700">{pkg?.description}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FaUsers className="text-green-500 mr-2" />
                  <span>Up to {pkg.guests || 2} guests</span>
                </div>
                <div className="flex items-center">
                  <FaMoon className="text-green-500 mr-2" />
                  <span>{pkg.duration} nights minimum</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
