import React from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

// Example usage: <ProductGrid products={products} onAddToCart={fn} />
export default function ProductGrid({ products = [], onAddToRent }) {
  console.log('ProductGrid products:', products); // Debug log

  if (!products || products.length === 0) {
    return (
      <div className="w-full py-8 px-2 md:px-0">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">No products available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-2 md:px-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 rounded-xl border border-white/30 bg-white/80 backdrop-blur-md p-6">

        {products.map((product) => {
          console.log('Rendering product:', product); // Debug log
          return (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              description={product.description}
              rentPrice={product.rentPrice}
              onAddToRent={() => onAddToRent(product)}
            />
          );
        })}
      </div>
    </div>
  );
}
