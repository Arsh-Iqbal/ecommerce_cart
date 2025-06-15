'use client'

import ProductCard from '../components/ProductCard'
import Filters from '../components/Filters'
import productsData from '../data/products.json'
import { useEffect, useState } from 'react'
import { Menu  } from 'lucide-react'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [filters, setFilters] = useState({ category: 'All', price: 1000 })
  const [filteredProducts, setFilteredProducts] = useState(productsData)
  const [showFilters, setShowFilters] = useState(false) // toggle for mobile filter menu

  useEffect(() => {
    let filtered = productsData

    if (filters.category !== 'All') {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    filtered = filtered.filter((p) => p.price <= filters.price)

    setFilteredProducts(filtered)
  }, [filters])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with Menu  for mobile */}
    <header className="flex items-center justify-between p-4 bg-white shadow top-0 z-20 md:hidden text-black">
  {/* Only visible on mobile */}
  <h1 className="text-xl font-bold">My Products</h1>
  {/* Menu  icon from lucide-react */}
  <button
    className="focus:outline-none"
    onClick={() => setShowFilters((prev) => !prev)}
  >
    <Menu  className="w-6 h-6" />
  </button>
</header>

      {/* Show filter menu on mobile when toggled */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-64 bg-blue-500 shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          showFilters ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close button inside menu */}
        <div className="flex justify-end p-2 bg-blue-500">
          <button onClick={() => setShowFilters(false)} className="focus:outline-none">
            ✕
          </button>
        </div>
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Main content */}
      <main className="flex flex-1 max-w-7xl mx-auto w-full p-4 gap-4 md:gap-6 flex-col md:flex-row">
        {/* Sidebar filters for larger screens */}
        <aside className="w-full md:w-64 hidden md:block">
          <Filters filters={filters} setFilters={setFilters} />
        </aside>

        {/* Product grid */}
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}