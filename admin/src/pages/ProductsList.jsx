import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Edit, Plus } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { productsAPI } from '../utils/api';
import { showToast, formatPrice } from '../utils/helpers';

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    productsAPI.getAll()
      .then((data) => {
        setProducts(data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        showToast('Failed to fetch products', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productsAPI.delete(id);
        setProducts(products.filter((p) => p._id !== id));
        showToast('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product:', error);
        showToast('Failed to delete product', 'error');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-serif text-3xl text-sage-900">Products</h1>
        <Link
          to="/admin/products/add"
          className="flex items-center gap-2 bg-sage-500 text-white px-4 py-2 rounded-lg hover:bg-sage-600 transition"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-sage-600 mb-4">No products yet</p>
          <Link
            to="/admin/products/add"
            className="text-sage-500 hover:text-sage-700 font-semibold"
          >
            Create your first product
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sage-50 border-b border-sage-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">
                  Stock
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-sage-200 hover:bg-sage-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span className="text-sage-900 font-semibold">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sage-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 text-sage-900 font-semibold">
                    ₨{Number(product.price).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sage-600">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      to={`/admin/products/${product._id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
