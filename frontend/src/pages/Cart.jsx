import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus } from 'lucide-react';
import { cartStorage, showToast, formatPrice } from '../utils/helpers';
import { ordersAPI } from '../utils/api';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    shippingAddress: '',
  });

  useEffect(() => {
    setCart(cartStorage.get());
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      cartStorage.update(productId, newQuantity);
      setCart(cartStorage.get());
    }
  };

  const removeItem = (productId) => {
    cartStorage.remove(productId);
    setCart(cartStorage.get());
    showToast('Item removed from cart');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    setLoading(true);

    const orderData = {
      ...formData,
      items: cart.map((item) => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      totalPrice: getTotalPrice(),
    };

    ordersAPI.create(orderData)
      .then((data) => {
        showToast('Order placed successfully!');
        cartStorage.clear();
        setCart([]);
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          shippingAddress: '',
        });

        // Redirect to WhatsApp with order details
        const summ = `Order #${data.data.orderNumber}:\n${cart
          .map((item) => `${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toFixed(2)}`)
          .join('\n')}\n\nTotal: ₹${getTotalPrice().toFixed(2)}`;

        window.open(
          `https://wa.me/?text=${encodeURIComponent(summ)}`,
          '_blank'
        );
      })
      .catch((err) => {
        console.error('Error creating order:', err);
        showToast('Error placing order. Please try again.', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-bliss-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-sage-900 mb-4">Your Cart is Empty</h1>
          <p className="text-sage-600 mb-8">Start shopping to add items to your cart</p>
          <Link
            to="/shop"
            className="inline-block bg-sage-500 text-white px-8 py-3 rounded-lg hover:bg-sage-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bliss-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl text-sage-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-bliss-white rounded-lg shadow-md overflow-hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-6 border-b border-sage-200 last:border-b-0"
                >
                  {/* Image */}
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg hover:opacity-80 transition"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-grow">
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-semibold text-sage-900 hover:text-sage-700 mb-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sage-700 font-serif">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  {/* Quantity & Remove */}
                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 border border-sage-200 rounded hover:bg-sage-100 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 border border-sage-200 rounded hover:bg-sage-100 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            {/* Order Summary */}
            <div className="bg-bliss-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="font-serif text-xl text-sage-900 mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4 pb-4 border-b border-sage-200">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-sage-700">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-semibold text-sage-900">Total:</span>
                <span className="font-serif text-2xl text-sage-700">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="bg-bliss-white rounded-lg shadow-md p-6">
              <h2 className="font-serif text-xl text-sage-900 mb-4">Shipping Details</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-sage-900 mb-2">
                    Shipping Address
                  </label>
                  <textarea
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-sage-200 rounded-lg focus:outline-none focus:border-sage-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sage-500 text-white py-3 rounded-lg hover:bg-sage-600 transition font-semibold disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Complete Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
