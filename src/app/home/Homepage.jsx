'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../components/ProductCard";
import Filters from "../../components/Filters";
import productsData from "../../data/products.json";
import { Menu } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function HomePage() {
  const searchParams = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";
  const searchTextFromUrl = searchParams.get("search")?.toLowerCase() || "";

  const [filters, setFilters] = useState({
    category: categoryFromUrl,
    price: 1000,
  });

  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let filtered = productsData;

    // Category filter
    if (filters.category !== "All") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Price filter
    filtered = filtered.filter((p) => p.price <= filters.price);

    // Search filter
    if (searchTextFromUrl) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTextFromUrl)
      );
    }

    setFilteredProducts(filtered);
  }, [filters, searchTextFromUrl]);

  return (
    
    <div className="min-h-screen flex flex-col">
      <Header/>
      {/* Header for mobile */}
      <header className="flex items-center justify-between p-4 bg-white shadow top-0 md:hidden text-black">
        <h1 className="text-xl font-bold">My Products</h1>
        <button
          className="focus:outline-none"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar filter on mobile */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-blue-500 shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          showFilters ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-2 bg-blue-500">
          <button
            onClick={() => setShowFilters(false)}
            className="focus:outline-none"
          >
            ✕
          </button>
        </div>
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Main content */}
      <main className="flex flex-1 max-w-7xl mx-auto w-full p-4 gap-4 md:gap-6 flex-col md:flex-row">
        <aside className="w-full md:w-64 hidden md:block">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="flex items-center justify-center min-w-3xl">
              <p className="text-black text-lg">No products found.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
