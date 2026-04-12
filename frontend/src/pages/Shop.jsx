import { useEffect, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { productsAPI } from '../utils/api';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = () => {
    setLoading(true);
    productsAPI.getAll(filter)
      .then((data) => {
        setProducts(data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      setLoading(true);
      productsAPI.search(search)
        .then((data) => {
          setProducts(data.data || []);
          setFilter('');
        })
        .catch((err) => {
          console.error('Error searching:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const categories = ['Crochet Items', 'Jewellery', 'Hair Accessories'];
  const displayProducts = products.length > 0 ? products : [];

  return (
    <div className="min-h-screen bg-bliss-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-4xl text-sage-900 mb-6">Shop Our Collection</h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-sage-400" />
            </div>
          </form>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="bg-bliss-white rounded-lg p-6 sticky top-24">
              <h2 className="font-semibold text-sage-900 mb-4 flex items-center gap-2">
                <ChevronDown className="w-4 h-4" />
                Filter by Category
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => setFilter('')}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                    filter === ''
                      ? 'bg-sage-500 text-white'
                      : 'text-sage-700 hover:bg-sage-100'
                  }`}
                >
                  All Products
                </button>

                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setFilter(category)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      filter === category
                        ? 'bg-sage-500 text-white'
                        : 'text-sage-700 hover:bg-sage-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <LoadingSpinner />
            ) : displayProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sage-600 text-lg">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
