import React, { useState } from 'react';
import { Heart, MessageCircle, Eye } from 'lucide-react';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('my-listings');

  const rentalItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&auto=format",
      likes: 245,
      views: 1200,
      type: "Jacket",
      price: 249,
      rentPrice: 249
    },
    {
      id: 2,
      title: "Designer Summer Dress",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&auto=format",
      likes: 189,
      views: 890,
      type: "Dress",
      price: 399,
      rentPrice: 399
    },
    {
      id: 3,
      title: "Leather Crossbody Bag",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&auto=format",
      likes: 312,
      views: 1540,
      type: "Bag",
      price: 599,
      rentPrice: 599
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section with Profile */}
      <div className="relative">
        {/* Background gradient */}
        <div
  className="h-48 bg-cover bg-center"
  style={{ backgroundImage: "url('https://img.freepik.com/premium-vector/abstract-background-black-lines-white-background-simple-design_888684-223.jpg?w=2000')" }}
></div>

        
        {/* Profile Section */}
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-20 md:-mt-16">
            {/* Profile Image */}
            <div className="relative mb-6 md:mb-0 md:mr-8">
              <img
                src="https://avatars.githubusercontent.com/u/180328251?v=4"
                alt="Profile"
                className="w-50 h-50 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="mb-4">
                <div className="flex items-center gap-3 mb-2">
                  

                </div>
              </div>
              
              <div className="flex gap-4 mb-6">
                <h1 className="text-3xl md:text-5xl" style={{ fontFamily: "'Jeju Myeongjo', serif" }}>Kushal S</h1>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">1,247</div>
                <div className="text-gray-500 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">89</div>
                <div className="text-gray-500 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold">4.8</div>
                <div className="text-gray-500 text-sm">Trust Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-6 mt-8">
        <div className="border-b border-gray-200">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('my-listings')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'my-listings'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Listings
            </button>
            <button
              onClick={() => setActiveTab('my-rentals')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'my-rentals'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Rentals
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'wishlist'
                  ? 'border-black text-black'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Wishlist
            </button>
          </nav>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === 'my-listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600">₹{item.rentPrice}</div>
                      <div className="text-xs text-gray-500">per day</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'my-rentals' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600">₹{item.rentPrice}</div>
                      <div className="text-xs text-gray-500">per day</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentalItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                      {item.type}
                    </span>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-gray-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600">₹{item.rentPrice}</div>
                      <div className="text-xs text-gray-500">per day</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
