import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaHeart, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxiosecure from "../../hooks/useAxiosecure";
import { useLanguage } from "../../hooks/useLanguage";

const PackageListings = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosecure();
  const scrollRefs = useRef({});
  const { t } = useLanguage();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axiosSecure.get("/packages");

      if (response.data.success) {
        setPackages(response.data.data);
      } else {
        setError(response.data.message || "Failed to fetch packages");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while fetching packages"
      );
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = (place) => {
    scrollRefs.current[place]?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = (place) => {
    scrollRefs.current[place]?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} retry={fetchPackages} />;

  // Group packages by placeType
  const groupedPackages = packages.reduce((groups, pkg) => {
    const place = pkg.placeType || "Available all Place";
    if (!groups[place]) groups[place] = [];
    groups[place].push(pkg);
    return groups;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 mt-10 py-8">
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">{t.packageStayIn}</h1>
        <p className="text-gray-600 mb-8">{t.packageDiscover}</p>

        {/* Render sections per placeType */}
        {Object.keys(groupedPackages).map((place) => {
          const items = groupedPackages[place];
          if (!items || items.length === 0) return null; // skip empty sections

          return (
            <div key={place} className="mb-10 relative">
              <h2 className="text-xl font-semibold mb-4"> Stay in {place}</h2>

              {/* Scrollable row */}
              <div
                className="flex overflow-x-hidden space-x-4 scroll-smooth"
                ref={(el) => (scrollRefs.current[place] = el)}
              >
                {items.map((pkg) => (
                  <div key={pkg._id} className="flex-shrink-0 w-60">
                    <PackageCard pkg={pkg} t={t} />
                  </div>
                ))}
              </div>

              {/* Arrows */}
              <button
                onClick={() => scrollLeft(place)}
                className="absolute top-1 right-6 transform -translate-y-1/2
                 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
              >
                &lt;
              </button>
              <button
                onClick={() => scrollRight(place)}
                className="absolute top-1 right-0 transform -translate-y-1/2
                 bg-white rounded-full shadow p-2 hover:bg-gray-100 z-10"
              >
                &gt;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Reusable Package Card
const PackageCard = ({ pkg, t }) => (
  <div className="rounded-xl overflow-hidden transition-shadow bg-white">
    <div className="relative">
      <Link to={`/packages/${pkg._id}`}>
        <img
          src={pkg?.image}
          alt={pkg?.title}
          className="w-60 h-40 rounded-2xl object-cover"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?...";
          }}
        />
      </Link>

      <button className="absolute top-3 right-0.5 text-white hover:text-red-500 transition-colors">
        <FaHeart className={pkg.isFavorite ? "text-green-500" : "text-red-500"} />
        <span>{t.packageFavorite}</span>
      </button>

      {pkg.guestFavorite && (
        <div className="absolute top-3 left-3 bg-white px-2 
        py-1 rounded text-xs font-semibold">
          {t.packageGuestFavorites}
        </div>
      )}
    </div>

    <div className="p-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold">{pkg.title}</h3>
      </div>

      <div className="flex items-center gap-2">
        <span>${pkg.price}</span>
        <span className="text-gray-500">/ {pkg.duration} nights</span>
        <div className="flex items-center ml-auto">
          <FaStar className="text-red-500" />
          <span>{pkg.rating}</span>
        </div>
      </div>
    </div>
  </div>
);

// Loading component
const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <FaSpinner className="animate-spin text-4xl text-red-500 mx-auto mb-4" />
      <p className="text-gray-600">Loading packages...</p>
    </div>
  </div>
);

// Error component
const Error = ({ message, retry }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md">
        <p>{message}</p>
        <button
          onClick={retry}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
);

export default PackageListings;
