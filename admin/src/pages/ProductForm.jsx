import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../utils/api';
import { showToast } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(!!id);
  const [submitting, setSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Jewellery',
    stock: '',
    featured: false,
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const data = await productsAPI.getById(id);
      setFormData(data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      showToast('Failed to load product', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = new FormData();

      // Add form fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Add image file if selected
      if (imageFile) {
        data.append('image', imageFile);
      }

      if (id) {
        await productsAPI.update(id, data);
        showToast('Product updated successfully');
      } else {
        await productsAPI.create(data);
        showToast('Product created successfully');
      }

      navigate('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      showToast('Failed to save product', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-serif text-3xl text-sage-900 mb-8">
        {id ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow-md p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-sage-900 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
              placeholder="e.g., Handmade Beaded Necklace"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-sage-900 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
              placeholder="Describe your product..."
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Price (₨) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                step="0.01"
                min="0"
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-sage-900 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
            >
              <option>Jewellery</option>
              <option>Crochet Items</option>
              <option>Hair Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-sage-900 mb-2">
              Upload Product Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required={!id}
              
              className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
            />
            {preview && (
              <div className="mt-4">
                <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm font-semibold text-sage-900">
                Featured Product
              </span>
            </label>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-sage-500 text-white py-2 rounded-lg hover:bg-sage-600 transition font-semibold disabled:opacity-50"
            >
              {submitting ? 'Saving...' : id ? 'Update Product' : 'Create Product'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/products')}
              className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
