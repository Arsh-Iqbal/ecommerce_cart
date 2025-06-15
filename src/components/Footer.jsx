import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-6 mt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">© 2025 All rights reserved. Arsh</p>
      
        <div className="flex gap-4 mt-2 md:mt-0">
            <p className='text-sm'>Contact US</p>
          <Facebook className="hover:text-blue-300 cursor-pointer" />
          <Twitter className="hover:text-blue-300 cursor-pointer" />
          <Instagram className="hover:text-blue-300 cursor-pointer" />
        </div>
      </div>
    </footer>
  )
}
