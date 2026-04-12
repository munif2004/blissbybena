import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { ordersAPI } from '../utils/api';
import { showToast, formatPrice } from '../utils/helpers';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true);
    ordersAPI.getAll()
      .then((data) => {
        setOrders(data.data || []);
      })
      .catch((err) => {
        console.error('Error fetching orders:', err);
        showToast('Failed to fetch orders', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await ordersAPI.updateStatus(id, newStatus);
      setOrders(
        orders.map((o) =>
          o._id === id ? { ...o, status: newStatus } : o
        )
      );
      showToast('Order status updated');
    } catch (error) {
      console.error('Error updating order:', error);
      showToast('Failed to update order', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await ordersAPI.delete(id);
        setOrders(orders.filter((o) => o._id !== id));
        showToast('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting order:', error);
        showToast('Failed to delete order', 'error');
      }
    }
  };

  // ✅ PDF DOWNLOAD FUNCTION
  const downloadPDF = async () => {
    const input = document.getElementById("invoice");

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`${selectedOrder.orderNumber}.pdf`);
  };

  if (loading) return <LoadingSpinner />;

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div>
      <h1 className="font-serif text-3xl text-sage-900 mb-8">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-sage-600">No orders yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-sage-50 border-b border-sage-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Order #</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Total</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-sage-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-sage-200 hover:bg-sage-50">
                  <td className="px-6 py-4 font-semibold text-sage-900">{order.orderNumber}</td>
                  <td className="px-6 py-4">
                    <div className="text-sage-900 font-semibold">{order.customerName}</div>
                    <div className="text-sm text-sage-600">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-sage-900">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-semibold"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          
          {/* ✅ ADD ID HERE */}
          <div id="invoice" className="bg-white rounded-lg max-w-md w-full max-h-96 overflow-y-auto">
            
            <div className="sticky top-0 bg-sage-50 border-b p-6 flex justify-between">
              <h2>{selectedOrder.orderNumber}</h2>
              <button onClick={() => setSelectedOrder(null)}>✕</button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p>Customer</p>
                <p>{selectedOrder.customerName}</p>
                <p>{selectedOrder.customerEmail}</p>
                <p>{selectedOrder.customerPhone}</p>
              </div>

              <div>
                <p>Items</p>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.productName} x{item.quantity}</span>
                    <span>{formatPrice(item.total)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(selectedOrder.totalPrice)}</span>
              </div>

              <div>
                <p>Address</p>
                <p>{selectedOrder.shippingAddress}</p>
              </div>

              {/* ✅ DOWNLOAD BUTTON */}
              <button
                onClick={downloadPDF}
                className="w-full bg-green-600 text-white py-2 rounded mt-4"
              >
                Download Invoice PDF
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}