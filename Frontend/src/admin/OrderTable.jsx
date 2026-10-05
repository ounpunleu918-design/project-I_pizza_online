import React, { useState, useEffect } from 'react';
import axios from 'axios';

const statusColors = {
  'Đã giao': 'bg-green-500',
  'Đang giao': 'bg-yellow-500',
  'Đang chuẩn bị': 'bg-orange-500',
  'Xác nhận': 'bg-blue-500'
};

const statusOptions = [
  { code: 'da giao', label: 'Đã giao' },
  { code: 'dang giao', label: 'Đang giao' },
  { code: 'dang chuan bi', label: 'Đang chuẩn bị' },
  { code: 'xac nhan', label: 'Xác nhận' },
];

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [tempDate, setTempDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders('');
  }, []);

  const fetchOrders = async (date) => {
    setLoading(true);
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        alert('Bạn chưa đăng nhập!');
        setLoading(false);
        return;
      }

      let url = `http://localhost:5000/get_all_orders`;
      if (date) url += `?date=${date}`;

      const response = await axios.get(url);

      const ordersProcessed = response.data.map(order => ({
        ...order,
        status: order.status || 'Xác nhận'
      }));

      setOrders(ordersProcessed);

      if (date) {
        setTempDate(date);
        setSelectedDate(date);
      } else {
        setTempDate('');
        setSelectedDate('');
      }
    } catch (error) {
      alert('Lỗi khi tải đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatusCode) => {
    try {
      await axios.post('http://localhost:5000/update_order_status', {
        order_id: orderId,
        new_status: newStatusCode
      });

      const newLabel = statusOptions.find((s) => s.code === newStatusCode)?.label;

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.madathang === orderId
            ? { ...order, status: newLabel || order.status }
            : order
        )
      );
      alert('Cập nhật trạng thái thành công');
    } catch (error) {
      alert('Lỗi khi cập nhật trạng thái');
    }
  };

  const handleChooseDate = () => {
    if (!tempDate) {
      alert('Vui lòng chọn ngày trước khi nhấn "Chọn"!');
      return;
    }
    fetchOrders(tempDate);
  };

  const handleReset = () => {
    setTempDate('');
    setSelectedDate('');
    fetchOrders('');
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="date"
          className="border-2 border-gray-300 rounded px-2"
          value={tempDate}
          onChange={(e) => setTempDate(e.target.value)}
        />
        <button
          onClick={handleChooseDate}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
        >
          Chọn
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
        >
          Tải lại
        </button>
      </div>

      {loading ? (
      <div className="text-center py-10 text-gray-500">Đang tải đơn hàng...</div>
      ) : (
      <div className="max-h-100 overflow-y-auto w-full">
      <table className="w-full text-left table-auto min-w-[640px]">
      <thead className="sticky top-0 z-50 bg-gray-100">
      <tr>
        <th className="p-4 border-b">Mã đơn hàng</th>
        <th className="p-4 border-b">Tên khách hàng</th>
        <th className="p-4 border-b">Số điện thoại</th>
        <th className="p-4 border-b">Tên sản phẩm</th>
        <th className="p-4 border-b">Ảnh sản phẩm</th>
        <th className="p-4 border-b">Số lượng mua</th>
        <th className="p-4 border-b">Đơn giá (đ)</th>
        <th className="p-4 border-b">Tổng giá (đđ)</th>
        <th className="p-4 border-b">Ngày đặt hàng</th>
        <th className="p-4 border-b">Trạng thái</th>
      </tr>
    </thead>
    <tbody>
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="p-4 border-b">{order.madathang}</td>
            <td className="p-4 border-b">{order.tenkhachhang}</td>
            <td className="p-4 border-b">{order.sodienthoai}</td>
            <td className="p-4 border-b">{order.tensanpham}</td>
            <td className="p-4 border-b">
              {order.anhsanpham ? (
                <img
                  style={{ width: '50px', height: '50px' }}
                  src={order.anhsanpham}
                  alt="Ảnh sản phẩm"
                />
              ) : (
                <span>Không có ảnh</span>
              )}
            </td>
            <td className="p-4 border-b">{order.soluong}</td>
            <td className="p-4 border-b">{order.dongia.toLocaleString()}</td>
            <td className="p-4 border-b">{order.tonggia.toLocaleString()}</td>
            <td className="p-4 border-b">{order.ngaydathang}</td>
            <td className="p-4 border-b">
              <select
                className={`px-2 py-1 rounded text-white font-medium ${
                  statusColors[order.status] || 'bg-gray-400'
                }`}
                value={
                  statusOptions.find((s) => s.label === order.status)?.code || ''
                }
                onChange={(e) =>
                  handleStatusChange(order.madathang, e.target.value)
                }
              >
                {statusOptions.map((status) => (
                  <option key={status.code} value={status.code} className="text-black">
                    {status.label}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="10" className="text-center font-bold py-4">
            Không tìm thấy đơn hàng cho ngày đã chọn.
          </td>
        </tr>
      )}
    </tbody>
     </table>
      </div>
      )}
    </div>
  );
};

export default OrderTable;
