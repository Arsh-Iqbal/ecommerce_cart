'use client'

import Link from 'next/link'
import { Search, ShoppingCart } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { cart } = useCart()
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-gradient-to-r from-[rgb(7,73,180)] to-[#0a67d2] shadow sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPE9VD7hC5m5iUcMPpHnJWJj37QdoVWgzLsg&s"
              alt="Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
        </div>

        {/* Search bar */}
        <div className="flex-1 px-4 max-w-md">
          <div className="relative">
            <Search className="absolute inset-y-0 left-3 mt-2 flex items-center pointer-events-none text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Cart and avatar */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex items-center gap-1 bg-[#00204d] hover:bg-[#001933] text-white px-4 py-2 rounded-md transition"
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="hidden sm:inline-block text-sm font-medium">Cart</span>
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white px-1 rounded-full">
                {totalCount}
              </span>
            )}
          </Link>

          {/* Avatar */}
          <img
            src="https://img.freepik.com/premium-vector/male-face-avatar-icon-set-flat-design-social-media-profiles_1281173-3806.jpg?semt=ais_hybrid&w=740"
            alt="User Avatar"
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  )
}