import { ShoppingCart, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

  return (
    <nav className="bg-bliss-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          
          <Link to="/" className="flex items-center gap-2">
  <img
    src="/logo.jpg"
    alt="BlissByBena Logo"
    className="w-10 h-10 rounded-full object-cover"
  />
  <span className="font-serif text-2xl text-sage-800 hidden sm:block">
    BlissByBena
  </span>
</Link>
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link to="/" className="text-sage-700 hover:text-sage-900 transition">Home</Link>
            <Link to="/shop" className="text-sage-700 hover:text-sage-900 transition">Shop</Link>
            <Link to="/about" className="text-sage-700 hover:text-sage-900 transition">About</Link>
            <Link to="/contact" className="text-sage-700 hover:text-sage-900 transition">Contact</Link>
          </div>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-sage-700 hover:text-sage-900 transition" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-sage-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-sage-200">
            <Link to="/" className="block py-2 text-sage-700 hover:text-sage-900">Home</Link>
            <Link to="/shop" className="block py-2 text-sage-700 hover:text-sage-900">Shop</Link>
            <Link to="/about" className="block py-2 text-sage-700 hover:text-sage-900">About</Link>
            <Link to="/contact" className="block py-2 text-sage-700 hover:text-sage-900">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
