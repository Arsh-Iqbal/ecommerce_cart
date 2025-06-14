
import './globals.css'
import Header from '@/components/Header'

export const metadata = {
  title: 'E-Commerce App',
  description: 'Built with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      
          <Header/>
         
          <main>{children}</main>
       
      </body>
    </html>
  )
}