import { useEffect, useState } from 'react';
import { Package, ShoppingBag, Users } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { productsAPI, ordersAPI } from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productsAPI.getAll(),
        ordersAPI.getAll(),
      ]);

      const products = productsRes.data || [];
      const orders = ordersRes.data || [];

      const total = orders.reduce((sum, order) => sum + order.totalPrice, 0);

      setStats({
        products: products.length,
        orders: orders.length,
        total,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  const statCards = [
    {
      label: 'Total Products',
      value: stats.products,
      icon: Package,
      color: 'sage',
    },
    {
      label: 'Total Orders',
      value: stats.orders,
      icon: ShoppingBag,
      color: 'blue',
    },
    {
      label: 'Total Revenue',
      value: `₨${stats.total.toLocaleString()}`,
      icon: Users,
      color: 'green',
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl text-sage-900 mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sage-600 text-sm mb-2">{card.label}</p>
                  <p className="font-serif text-3xl text-sage-900">
                    {card.value}
                  </p>
                </div>
                <Icon className="w-12 h-12 text-sage-200" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="font-serif text-2xl text-sage-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/products/add"
            className="bg-sage-500 text-white p-6 rounded-lg hover:bg-sage-600 transition text-center font-semibold"
          >
            Add New Product
          </a>
          <a
            href="/admin/orders"
            className="bg-blue-500 text-white p-6 rounded-lg hover:bg-blue-600 transition text-center font-semibold"
          >
            View Orders
          </a>
        </div>
      </div>
    </div>
  );
}
