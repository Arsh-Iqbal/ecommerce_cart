
import { CartProvider } from '@/context/CartContext'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'E-Commerce App',
  description: 'Built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
           
          <main>{children}</main>
            <Toaster position="top-center" />
        </CartProvider>
       
      </body>
    </html>
  )
}