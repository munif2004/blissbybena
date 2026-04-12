import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { showToast } from '../utils/helpers';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let data;

      if (isRegister) {
        if (!formData.name) {
          showToast('Please enter your name', 'error');
          setLoading(false);
          return;
        }
        data = await authAPI.register(formData.email, formData.password, formData.name);
      } else {
        data = await authAPI.login(formData.email, formData.password);
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data.data));

      showToast(data.message || 'Success!');
      onLogin(data.data);
      navigate('/admin');
    } catch (error) {
      showToast(error.response?.data?.message || 'An error occurred', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="font-serif text-3xl text-sage-900 text-center mb-2">
            BlissByBena
          </h1>
          <p className="text-center text-sage-600 mb-8">
            Admin Dashboard
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-sm font-semibold text-sage-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                  placeholder="Your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                placeholder="admin@blissbybena.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-sage-900 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sage-500 text-white py-2 rounded-lg hover:bg-sage-600 transition font-semibold disabled:opacity-50"
            >
              {loading ? 'Loading...' : isRegister ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sage-600">
              {isRegister ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setFormData({ email: '', password: '', name: '' });
              }}
              className="text-sage-500 hover:text-sage-700 font-semibold mt-2"
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
