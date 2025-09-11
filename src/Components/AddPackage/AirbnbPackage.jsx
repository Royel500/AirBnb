import React, { useState } from 'react';
import { FaCamera, FaUpload, FaSpinner } from 'react-icons/fa';
import axios from 'axios'; // ✅ For uploading to imgbb
import useAxiosecure from '../../hooks/useAxiosecure';

const AddPackageForm = () => {
  const axiosSecure = useAxiosecure();
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    duration: '2',
    rating: '4.8',
    propertyType: 'Entire place',
    description: '',
    image: '',
    isFavorite: false,
    guestFavorite: false
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // ✅ Upload image to imgbb
  const uploadImageToImageBB = async (imageFile) => {
    setImgLoading(true);
    const imgData = new FormData();
    imgData.append('image', imageFile);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_PHOTO_KEY}`,
        imgData
      );

      if (res.data.success) {
        return res.data.data.url;
      } else {
        throw new Error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Failed to upload image. Please try again.');
      return null;
    } finally {
      setImgLoading(false);
    }
  };

  // Handle image selection
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    const imageUrl = await uploadImageToImageBB(file);
    if (imageUrl) {
      setFormData({
        ...formData,
        image: imageUrl
      });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!formData.title || !formData.location || !formData.price || !formData.image) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axiosSecure.post('/addpackage', formData);

      if (response.data.success) {
        setSuccess(true);
        setFormData({
          title: '',
          location: '',
          price: '',
          duration: '2',
          rating: '4.8',
          propertyType: 'Entire place',
          description: '',
          image: '',
          isFavorite: false,
          guestFavorite: false
        });
      } else {
        setError(response.data.message || 'Failed to add package');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred while adding the package');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-center mb-2">Add New Package</h1>
        <p className="text-gray-600 text-center mb-8">
          Fill out the form below to create a new Airbnb-style listing
        </p>

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
            Package added successfully!
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Cozy apartment in central London"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="London, UK"
                  required
                />
              </div>

              {/* Price & Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per night ($) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="150"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (nights) *</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="2"
                    min="1"
                    required
                  />
                </div>
              </div>

              {/* Rating & Property Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating *</label>
                  <input
                    type="number"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    max="5"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="4.8"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="Entire place">Entire place</option>
                    <option value="Private room">Private room</option>
                    <option value="Shared room">Shared room</option>
                    <option value="Hotel room">Hotel room</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Describe your property..."
                ></textarea>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="guestFavorite"
                    name="guestFavorite"
                    checked={formData.guestFavorite}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="guestFavorite" className="ml-2 block text-sm text-gray-700">
                    Mark as Guest Favorite
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFavorite"
                    name="isFavorite"
                    checked={formData.isFavorite}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isFavorite" className="ml-2 block text-sm text-gray-700">
                    Mark as Favorite
                  </label>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Image *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                    {formData.image ? (
                      <div className="relative w-full h-full">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <FaUpload className="text-white text-2xl" />
                          <span className="text-white ml-2">Change Image</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {imgLoading ? (
                          <FaSpinner className="w-8 h-8 text-gray-400 mb-2 animate-spin" />
                        ) : (
                          <FaCamera className="w-8 h-8 text-gray-400 mb-2" />
                        )}
                        <p className="text-sm text-gray-500">
                          {imgLoading ? 'Uploading image...' : 'Click to upload an image'}
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                      accept="image/*"
                      disabled={imgLoading}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1">Image will be uploaded to ImageBB</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading || imgLoading}
                className="w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:bg-red-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Adding Package...
                  </>
                ) : (
                  'Add Package'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackageForm;
