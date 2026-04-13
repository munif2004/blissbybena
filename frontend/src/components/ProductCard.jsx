import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cartStorage, showToast } from '../utils/helpers';

export default function ProductCard({ product }) {
  // ✅ Use environment variable (clean way)
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleAddToCart = () => {
    cartStorage.add(product);
    showToast(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-bliss-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      
      {/* Image */}
      <Link to={`/product/${product._id}`}>
        <div className="relative h-64 bg-sage-100 overflow-hidden">
          <img
            src={`${BASE_URL}/${product.image}`}   // ✅ FIXED
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-sage-500 uppercase tracking-wider mb-2">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`}>
          <h3 className="font-serif text-lg text-sage-900 mb-2 hover:text-sage-700 transition">
            {product.name}
          </h3>
        </Link>

        <p className="text-sage-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="font-serif text-xl text-sage-700">
            ₨{Number(product.price).toLocaleString()}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-sage-500 text-white p-2 rounded-lg hover:bg-sage-600 transition"
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}