'use client'

import Header from '@/components/Header'
import { useCart } from '../../context/CartContext'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { cart, setCart } = useCart()
  const [total, setTotal] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(subtotal)
  }, [cart])

  const updateQuantity = (id, quantity) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    )
  }

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  if (!isClient) {
    return null // or a loading spinner
  }

  if (cart.length === 0) {
    return (
      <>
      <Header/>
      <div className="text-center py-20 px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          Your cart is empty 🛒
        </h2>
      </div>
      </>
    )
  }

  return (
    <>
      <Header/>
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-row sm:items-center gap-4 bg-white p-4 rounded shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 md:w-24 md:h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-sm md:text-base font-semibold text-gray-700 mb-1 md:mb-2 line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">${item.price} each</p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2 gap-2">
                  <label className="text-sm text-gray-700">Qty:</label>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                    className="border px-2 py-1 w-16 rounded text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Remove */}
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white p-6 rounded shadow h-fit text-gray-500">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            onClick={() => {
              toast.success("Your products will be shipped soon!")
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
    </>
  )

}
