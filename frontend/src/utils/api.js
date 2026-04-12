import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Products API
export const productsAPI = {
  getAll: (category = null) => {
    const params = category ? `?category=${category}` : '';
    return api.get(`/products${params}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error fetching products:', err);
        throw err;
      });
  },

  getFeatured: () =>
    api.get('/products/featured')
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error fetching featured products:', err);
        throw err;
      }),

  getById: (id) =>
    api.get(`/products/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error fetching product:', err);
        throw err;
      }),

  search: (query) =>
    api.get(`/products/search?query=${query}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error searching products:', err);
        throw err;
      }),

  create: (data) =>
    api.post('/products', data)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error creating product:', err);
        throw err;
      }),

  update: (id, data) =>
    api.put(`/products/${id}`, data)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error updating product:', err);
        throw err;
      }),

  delete: (id) =>
    api.delete(`/products/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error deleting product:', err);
        throw err;
      }),
};

// Orders API
export const ordersAPI = {
  create: (data) =>
    api.post('/orders', data)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error creating order:', err);
        throw err;
      }),

  getAll: () =>
    api.get('/orders')
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error fetching orders:', err);
        throw err;
      }),

  getById: (id) =>
    api.get(`/orders/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error fetching order:', err);
        throw err;
      }),

  updateStatus: (id, status) =>
    api.put(`/orders/${id}`, { status })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error updating order:', err);
        throw err;
      }),

  delete: (id) =>
    api.delete(`/orders/${id}`)
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error deleting order:', err);
        throw err;
      }),
};

// Auth API
export const authAPI = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error registering:', err);
        throw err;
      }),

  login: (email, password) =>
    api.post('/auth/login', { email, password })
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error logging in:', err);
        throw err;
      }),

  getCurrentAdmin: () =>
    api.get('/auth/me')
      .then((res) => res.data)
      .catch((err) => {
        console.error('Error fetching current admin:', err);
        throw err;
      }),
};

export default api;
