'use client'

import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart()
  const [inCart, setInCart] = useState(false)
  const router = useRouter()

  if (!product || !product.id) return null

  useEffect(() => {
    const exists = cart.some((item) => item.id === product.id)
    setInCart(exists)
  }, [cart, product.id])

  const handleAdd = () => {
    addToCart(product)
    toast.success(`${product.title} added to cart`)
  }

  return (
    <div className="bg-white shadow rounded p-4 flex flex-col hover:shadow-lg transition">
      <Link href={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded cursor-pointer"
        />
      </Link>

      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-blue-600 font-bold text-sm">${product.price}</p>

      <div className="mt-auto pt-2">
        {inCart ? (
          <button
            onClick={() => router.push('/cart')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded mt-2"
          >
            Go to Cart
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded mt-2"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}
