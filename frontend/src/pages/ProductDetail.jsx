import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../utils/api';
import { cartStorage, showToast, formatPrice } from '../utils/helpers';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = () => {
    setLoading(true);
    productsAPI.getById(id)
      .then((data) => {
        setProduct(data.data);

        // Fetch related products
        return productsAPI.getAll(data.data.category);
      })
      .then((data) => {
        setRelated(
          data.data?.filter((p) => p._id !== id).slice(0, 3) || []
        );
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        cartStorage.add(product, 1);
      }
      showToast(`${quantity} item(s) added to cart!`);
      setQuantity(1);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-sage-600 mb-4">Product not found</p>
          <Link to="/shop" className="text-sage-500 hover:text-sage-700">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bliss-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/shop"
          className="flex items-center gap-2 text-sage-600 hover:text-sage-900 mb-8"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="bg-sage-100 rounded-lg overflow-hidden aspect-square mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="bg-sage-100 rounded-lg overflow-hidden cursor-pointer">
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <p className="text-sage-500 uppercase tracking-wider mb-2">
              {product.category}
            </p>

            <h1 className="font-serif text-4xl text-sage-900 mb-4">
              {product.name}
            </h1>

            <div className="mb-6 pb-6 border-b border-sage-200">
              <p className="font-serif text-3xl text-sage-700">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="mb-8">
              <p className="text-sage-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-sage-200 rounded-lg hover:bg-sage-100 transition"
                >
                  −
                </button>
                <span className="text-xl font-semibold text-sage-900 w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-sage-200 rounded-lg hover:bg-sage-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-sage-500 text-white py-3 rounded-lg hover:bg-sage-600 transition font-semibold flex items-center justify-center gap-2 mb-4"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/?text=Hi! I'm interested in: ${product.name} - ${formatPrice(product.price)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full border-2 border-sage-500 text-sage-700 py-3 rounded-lg hover:bg-sage-50 transition font-semibold text-center block"
            >
              Order via WhatsApp
            </a>

            {/* Stock Status */}
            <div className="mt-8 p-4 bg-sage-50 rounded-lg">
              <p className="text-sm text-sage-600">
                {product.stock > 0 ? (
                  <span className="text-sage-700 font-semibold">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-serif text-3xl text-sage-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
