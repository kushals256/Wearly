import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import ButtonComp from '../components/common/Button';

const MyCart = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const [rentalDates, setRentalDates] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    // Initialize rental dates for each item
    const initialDates = {};
    cartItems.forEach(item => {
      if (!rentalDates[item.id]) {
        initialDates[item.id] = {
          startDate: new Date().toISOString().slice(0, 16),
          endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16)
        };
      }
    });
    setRentalDates(prev => ({ ...prev, ...initialDates }));
  }, [cartItems]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Check if end date is before start date
    if (end < start) {
      setError("Return date cannot be before pick-up date");
      return 0;
    }
    
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateItemTotal = (item) => {
    const dates = rentalDates[item.id];
    if (!dates) return item.price;
    const days = calculateDuration(dates.startDate, dates.endDate);
    return item.price * days;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };

  const handleDateChange = (itemId, field, value) => {
    setError(null); // Clear any previous errors
    const newDates = {
      ...rentalDates[itemId],
      [field]: value
    };

    // Validate dates
    if (field === 'endDate' && new Date(value) < new Date(rentalDates[itemId].startDate)) {
      setError("Return date cannot be before pick-up date");
      return;
    }

    setRentalDates(prev => ({
      ...prev,
      [itemId]: newDates
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Cart</h1>
      
      {/* Error Modal */}
      {error && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-red-600">Error</h3>
              <button
                onClick={() => setError(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-700 mb-4">{error}</p>
            <button
              onClick={() => setError(null)}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.map((item) => {
              const dates = rentalDates[item.id];
              const days = dates ? calculateDuration(dates.startDate, dates.endDate) : 1;
              return (
                <div key={item.id} className="flex flex-col gap-4 border-b py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-gray-600">{item.owner?.name}</p>
                      <div className="mt-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatPrice(item.price)}</p>
                      <p className="text-sm text-gray-500">per day</p>
                    </div>
                  </div>
                  
                  {/* Date Selection */}
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pick-up Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={dates?.startDate || ''}
                        onChange={(e) => handleDateChange(item.id, 'startDate', e.target.value)}
                        min={new Date().toISOString().slice(0, 16)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Return Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={dates?.endDate || ''}
                        onChange={(e) => handleDateChange(item.id, 'endDate', e.target.value)}
                        min={dates?.startDate || new Date().toISOString().slice(0, 16)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  {/* Duration and Total */}
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-gray-600">
                      Duration: {days} {days === 1 ? 'day' : 'days'}
                    </p>
                    <p className="font-semibold">
                      Total: {formatPrice(calculateItemTotal(item))}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(calculateCartTotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(calculateCartTotal())}</span>
                  </div>
                </div>
              </div>
              <ButtonComp
                text="Proceed to Payment"
                textColor="text-white"
                bgColor="bg-black hover:bg-gray-800"
                className="w-full"
                onClick={() => {/* TODO: Implement payment flow */}}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart; 