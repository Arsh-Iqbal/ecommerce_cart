"use client";

import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import productsData from "../data/products.json";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState({ category: "All", price: 1000 });
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    let filtered = productsData;

    // Category filter
    if (filters.category !== "All") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter((p) => p.price <= filters.price);

    setFilteredProducts(filtered);
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1 max-w-7xl mx-auto w-full p-4 gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        {/* Product Grid */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </section>
      </main>
    </div>
  );
}
