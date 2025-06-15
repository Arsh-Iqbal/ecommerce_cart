'use client'

import { Carousel } from 'react-responsive-carousel'
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
  
const images = Array.isArray(product.image) ? product.image : [product.image]

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      {/* Left: Image Carousel */}
      <div className="flex-1">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={4000}
          className="rounded shadow"
        >
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={product.title}
                className="h-64 sm:h-80 md:h-[400px] object-cover w-full rounded"
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Right: Details */}
      <div className="flex-1 space-y-3 text-sm sm:text-base">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{product.title}</h1>
        <p className="text-lg sm:text-xl text-gray-800 font-semibold">${product.price}</p>
        <p className="text-gray-700 text-sm sm:text-base">{product.description || 'Product description here.'}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>

        {/* Quantity Selector */}
        <div className="flex items-center text-gray-600 gap-2">
          <label className="font-medium">Quantity:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border px-3 py-1 w-20 rounded appearance-auto"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm sm:text-base"
            onClick={handleAddToCart}
          >
            {inCart ? 'Add More to Cart' : 'Add to Cart'}
          </button>

          {inCart && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded text-sm sm:text-base"
              onClick={() => router.push('/cart')}
            >
              Go to Cart
            </button>
          )}
        </div>

        {/* Reviews Section */}
        <div className="pt-4 border-t">
          <h3 className="font-semibold text-base sm:text-lg mb-1 text-gray-700">Reviews</h3>
          <p className="text-yellow-500 text-base">★ ★ ★ ★ ☆</p>
          <p className="text-gray-700 text-sm sm:text-base">Great product! Highly recommended.</p>
        </div>
      </div>
    </div>
  )
}
