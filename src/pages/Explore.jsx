import React, { useState } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import { useCart } from '../context/CartContext';
import { products } from '../components/products/ProductDetails';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToRental } = useCart();

  const categories = ['all', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: `url('https://img.freepik.com/premium-vector/abstract-background-black-lines-white-background-simple-design_888684-223.jpg?w=2000')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 rounded-xl border border-white/30 bg-white/80 backdrop-blur-md p-6">
          <h1 className="text-3xl font-bold mb-4 text-black">Explore Products</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          onAddToRent={(product) => addToRental(product)}
        />
      </div>
    </div>
  );
}
