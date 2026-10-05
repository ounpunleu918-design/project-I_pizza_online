import React, { useState, useEffect } from 'react';
import axios from 'axios';

const statusColors = {
  'Đã giao': 'bg-green-500',
  'Đang giao': 'bg-yellow-500',
  'Đang chuẩn bị': 'bg-orange-500',
  'Xác nhận': 'bg-blue-500'
};

const UserOrderTable = () => {
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

      let url = `http://localhost:5000/get_buy_product?user_id=${userId}`;
      if (date) url += `&date=${date}`;

      const response = await axios.get(url);
      setOrders(response.data);

      if (date) {
        setTempDate(date);
        setSelectedDate(date);
      } else {
        setTempDate('');
        setSelectedDate('');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Lỗi khi tải đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleChooseDate = () => {
    if (!tempDate) {
      alert('Vui lòng chọn ngày trước khi nhấn "Chọn"!');
      return;
    }
    if (tempDate !== selectedDate) {
      setSelectedDate(tempDate);
      fetchOrders(tempDate);
    } else {
      fetchOrders(tempDate);
    }
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
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full text-left table-auto min-w-[640px]">
            <thead className="bg-gray-100 sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="p-4 border-b">Mã đơn hàng</th>
                <th className="p-4 border-b">Tên sản phẩm</th>
                <th className="p-4 border-b">Ảnh sản phẩm</th>
                <th className="p-4 border-b">Số lượng</th>
                <th className="p-4 border-b">Đơn giá (đ)</th>
                <th className="p-4 border-b">Tổng giá (đ)</th>
                <th className="p-4 border-b">Ngày đặt hàng</th>
                <th className="p-4 border-b">Phải thanh toán (đ)</th>
                <th className="p-4 border-b">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4 border-b">{order.madathang}</td>
                    <td className="p-4 border-b">{order.tensanpham}</td>
                    <td className="p-4 border-b">
                      {order.anhsanpham ? (
                        <img
                          style={{ width: '50px', height: '50px' }}
                          src={order.anhsanpham}
                          alt={order.anhsanpham}
                        />
                      ) : (
                        <span>Không có ảnh</span>
                      )}
                    </td>
                    <td className="p-4 border-b">{order.soluong}</td>
                    <td className="p-4 border-b">{order.dongia.toLocaleString()}</td>
                    <td className="p-4 border-b">{order.tonggia.toLocaleString()}</td>
                    <td className="p-4 border-b">{order.ngaydathang}</td>
                    <td className="p-4 border-b">{order.tonggia.toLocaleString()}</td>
                  <td className="p-4 border-b whitespace-normal">
                  <span
                  className={`inline-block px-2 py-1 text-xs font-medium text-white rounded-md ${
                    statusColors[order.trangthai] || 'bg-gray-400'
                  }`}
                    style={{ whiteSpace: 'normal' }}
                  >
                    {order.trangthai}
                      </span>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center font-bold py-4">
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

export default UserOrderTable;
