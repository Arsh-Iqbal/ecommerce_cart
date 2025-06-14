'use client'

import products from '../../../data/products.json'
import { useCart } from '../../../context/CartContext'
import { useParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const product = products.find((p) => p.id === Number(id))
  const { cart, addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [inCart, setInCart] = useState(false)

  useEffect(() => {
    if (product) {
      const exists = cart.some((item) => item.id === product.id)
      setInCart(exists)
    }
  }, [cart, product])

  if (!product) return <p className="p-4 text-red-500">Product not found.</p>

  const handleAddToCart = () => {
    addToCart(product, quantity)
    toast.success(`${quantity} ${product.title} added to cart`)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
      {/* Left: Image */}
      <div className="flex-1">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[400px] object-cover rounded shadow"
        />
      </div>

      {/* Right: Details */}
      <div className="flex-1 space-y-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-blue-600 text-xl font-semibold">${product.price}</p>
        <p className="text-gray-700">{product.description || 'Product description here.'}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>

        {/* Quantity Selector (Always visible) */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Quantity:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border px-3 py-1 w-20 rounded"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            onClick={handleAddToCart}
          >
            {inCart ? 'Add More to Cart' : 'Add to Cart'}
          </button>

          {inCart && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              onClick={() => router.push('/cart')}
            >
              Go to Cart
            </button>
          )}
        </div>

        {/* Reviews Section */}
        <div className="pt-6 border-t">
          <h3 className="font-semibold text-lg mb-2">Reviews</h3>
          <p className="text-yellow-500 text-lg">★ ★ ★ ★ ☆</p>
          <p className="text-gray-700">Great product! Highly recommended.</p>
        </div>
      </div>
    </div>
  )
}
