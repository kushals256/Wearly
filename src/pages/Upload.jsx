import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Upload = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    rentPrice: '',
    size: '',
    description: '',
    images: []
  });
  const [previewUrls, setPreviewUrls] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));

      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrls(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: 'url(https://img.freepik.com/premium-vector/abstract-background-black-lines-white-background-simple-design_888684-223.jpg?w=2000)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Glassmorphic Container */}
        <div className="rounded-2xl p-8 shadow-xl border border-white/30 bg-white/70 backdrop-blur-lg">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-black">
              List Your Outfit for Rent
            </h2>
            <button
              onClick={() => navigate('/')}
              className="p-2 text-gray-400 hover:text-black transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form Start */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-black mb-2">
                Product Images
              </label>
              {previewUrls.length > 0 && (
                <div className="mb-4 grid grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="h-32 w-full object-cover rounded-lg shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className={`mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-lg hover:border-black transition-colors duration-200 ${
                previewUrls.length > 0 
                  ? 'px-4 py-3 max-w-xs mx-auto' 
                  : 'px-6 pt-5 pb-6'
              }`}>
                <div className="space-y-1 text-center">
                  <svg
                    className={`mx-auto text-gray-400 ${
                      previewUrls.length > 0 ? 'h-8 w-8' : 'h-12 w-12'
                    }`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-black justify-center">
                    <label
                      htmlFor="image-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-black hover:text-gray-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-black"
                    >
                      <span>{previewUrls.length > 0 ? 'Add more images' : 'Upload files'}</span>
                      <input
                        id="image-upload"
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={handleImageChange}
                        required={previewUrls.length === 0}
                      />
                    </label>
                    {previewUrls.length === 0 && <p className="pl-1">or drag and drop</p>}
                  </div>
                  {previewUrls.length === 0 && (
                    <>
                      <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB each</p>
                      <p className="text-xs text-black">Upload up to 5 images</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 space-y-8">
              <h3 className="text-xl font-semibold text-black border-b pb-4">Product Details</h3>
              
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-black mb-2">
                  Product Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4 transition-all duration-200 hover:border-gray-400"
                  placeholder="e.g., Vintage Denim Jacket"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <label htmlFor="size" className="block text-sm font-medium text-black mb-2">
                    Size
                  </label>
                  <select
                    name="size"
                    id="size"
                    value={formData.size}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4 transition-all duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium text-black mb-2">
                    Original Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-black">₹</span>
                    <input
                      type="number"
                      name="price"
                      id="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 pl-8 pr-4 transition-all duration-200 hover:border-gray-400"
                      placeholder="999"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="rentPrice" className="block text-sm font-medium text-black mb-2">
                    Rent Price per Day (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-black">₹</span>
                    <input
                      type="number"
                      name="rentPrice"
                      id="rentPrice"
                      value={formData.rentPrice}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 pl-8 pr-4 transition-all duration-200 hover:border-gray-400"
                      placeholder="99"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-black mb-2">
                  Product Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black focus:ring-black text-base py-3 px-4 transition-all duration-200 hover:border-gray-400 resize-none"
                  placeholder="Describe your product's condition, style, and any notable features..."
                  required
                />
                <p className="mt-2 text-sm text-gray-600">
                  Provide detailed information about your product to help potential renters make a decision.
                </p>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 transform hover:-translate-y-0.5"
              >
                List for Rent
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;
