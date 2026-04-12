import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Leaf, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { productsAPI } from '../utils/api';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 HERO IMAGES
  const images = [
    "/hero/hero 1.jpg",
    "/hero/hero 2.jpg",
    "/hero/hero 3.jpg",
    "/hero/hero 4.jpg",
    "/hero/hero 5.jpg",
    "/hero/hero 6.jpg",
    "/hero/hero 7.jpg",
    "/hero/hero 8.jpg",
    "/hero/hero 9.jpg",
  ];

  const [current, setCurrent] = useState(0);

  // 🔥 AUTO SLIDER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 FETCH PRODUCTS
  useEffect(() => {
    playFetch();
  }, []);

  const playFetch = () => {
    setLoading(true);
    productsAPI.getFeatured()
      .then((data) => {
        setFeatured(data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching featured products:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen">

      {/* 🔥 HERO SECTION WITH SLIDER */}
      <section className="h-screen relative overflow-hidden">

        {/* Background Images */}
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-2xl mx-auto px-4 flex flex-col items-center justify-center h-full">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
            BlissByBena
          </h1>

          <p className="text-xl md:text-2xl text-white mb-8 font-light">
            Handmade with Love
          </p>

          <p className="text-lg text-gray-200 mb-8">
            Exquisite handmade jewellery, crochet items, and hair accessories
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-sage-500 text-white px-8 py-3 rounded-lg hover:bg-sage-600 transition font-semibold"
            >
              Shop Now
            </Link>

            <a
              href="https://wa.me/your-number"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-black transition font-semibold"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-bliss-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-4xl text-sage-900 text-center mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/shop?category=Crochet Items">
              <div className="bg-sage-50 p-8 text-center rounded-lg">
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-sage-500" />
                <h3 className="text-xl font-serif">Crochet Items</h3>
              </div>
            </Link>

            <Link to="/shop?category=Jewellery">
              <div className="bg-bliss-pink p-8 text-center rounded-lg">
                <Heart className="w-12 h-12 mx-auto mb-4 text-sage-500" />
                <h3 className="text-xl font-serif">Jewellery</h3>
              </div>
            </Link>

            <Link to="/shop?category=Hair Accessories">
              <div className="bg-bliss-beige p-8 text-center rounded-lg">
                <Leaf className="w-12 h-12 mx-auto mb-4 text-sage-500" />
                <h3 className="text-xl font-serif">Hair Accessories</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-16 bg-bliss-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl text-center mb-12 font-serif">
            Featured Collection
          </h2>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-3 gap-8">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}