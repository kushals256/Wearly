import React, { useState } from "react"
import ProductDetailsModal from "./ProductDetailsModal"

export default function ProductCard({
  image,
  title,
  description,
  rentPrice,
  onAddToRent,
  owner,
  brand,
  category,
  size,
  inCart = false
}) {
  const [isRentLoading, setIsRentLoading] = useState(false);
  const [showRentSuccess, setShowRentSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInCart, setIsInCart] = useState(inCart);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleRent = async (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking rent button
    if (isInCart) return;
    
    setIsRentLoading(true);
    try {
      await onAddToRent();
      setShowRentSuccess(true);
      setIsInCart(true);
      setTimeout(() => setShowRentSuccess(false), 2000);
    } catch (error) {
      console.error('Error adding to rental:', error);
    } finally {
      setIsRentLoading(false);
    }
  };

  if (!image || !title || !rentPrice) {
    console.error('Missing required props:', { image, title, rentPrice });
    return null;
  }

  const product = {
    image,
    title,
    description,
    rentPrice,
    owner,
    brand,
    category,
    size,
    inCart: isInCart
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            console.error('Image failed to load:', image);
            e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
          }}
        />
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 flex-1 mb-4">{description}</p>
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="text-sm text-gray-500">Rent for</p>
              <span className="text-xl font-bold text-blue-600">{formatPrice(rentPrice)}</span>
              <span className="text-sm text-gray-500 ml-1">per day</span>
            </div>
            <button
              onClick={handleRent}
              disabled={isRentLoading || showRentSuccess || isInCart}
              className={`px-4 py-2 rounded-full transition-colors flex items-center gap-2 ${
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
                  Adding...
                </>
              ) : showRentSuccess ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added!
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
                  Rent Now
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <ProductDetailsModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCartUpdate={(inCart) => setIsInCart(inCart)}
      />
    </>
  )
}