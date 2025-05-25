import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductDetailsModal({ product, isOpen, onClose, onCartUpdate }) {
  const { addToRental } = useCart();
  const [isRentLoading, setIsRentLoading] = useState(false);
  const [showRentSuccess, setShowRentSuccess] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isInCart, setIsInCart] = useState(product.inCart || false);

  // Update isInCart when product.inCart changes
  useEffect(() => {
    setIsInCart(product.inCart || false);
  }, [product.inCart]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleRent = async () => {
    if (isInCart) return;
    
    setIsRentLoading(true);
    try {
      await addToRental(product);
      setShowRentSuccess(true);
      setIsInCart(true);
      onCartUpdate?.(true);
      setTimeout(() => setShowRentSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to rental:', error);
    } finally {
      setIsRentLoading(false);
    }
  };

  if (!isOpen) return null;

  // Sample additional images - replace with actual product images
  const additionalImages = [
    product.image,
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-w-1 aspect-h-1 w-full">
                <img
                  src={additionalImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                {additionalImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                <p className="text-sm text-gray-500 mt-1">Listed by {product.owner?.name}</p>
              </div>

              <div className="border-t border-b py-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(product.rentPrice)}
                  </span>
                  <span className="text-gray-500">per day</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {product.description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Rental Terms</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Minimum rental period: 1 day</li>
                  <li>Security deposit may be required</li>
                  <li>Free delivery within city limits</li>
                  <li>24/7 customer support</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Product Specifications</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Condition: Like New</li>
                  <li>Brand: {product.brand || 'Generic'}</li>
                  <li>Category: {product.category || 'Fashion'}</li>
                  <li>Size: {product.size || 'Standard'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={handleRent}
            disabled={isRentLoading || showRentSuccess || isInCart}
            className={`w-full px-6 py-3 rounded-full transition-colors flex items-center justify-center gap-2 ${
              isInCart 
                ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-default' 
                : isRentLoading 
                  ? 'bg-gray-100 text-gray-400 border border-gray-300 cursor-not-allowed' 
                  : showRentSuccess 
                    ? 'bg-green-50 text-green-600 border border-green-200' 
                    : 'bg-white text-black border border-black hover:bg-gray-50'
            }`}
          >
            {isRentLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Adding to Cart...
              </>
            ) : showRentSuccess ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart!
              </>
            ) : isInCart ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                In Cart
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
} 