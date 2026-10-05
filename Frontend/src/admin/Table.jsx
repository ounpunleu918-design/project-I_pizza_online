import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const statusColors = {
  'Đã giao': 'bg-green-500',
  'Đang giao': 'bg-yellow-500',
  'Đang chuẩn bị': 'bg-orange-500',
  'Xác nhận': 'bg-blue-500'
};

const Table = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/get_all_orders_new')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setOrders(data);
          setLoading(false);
        } else {
          throw new Error('Dữ liệu không hợp lệ');
        }
      })
      .catch((err) => {
        setError('Không thể tải dữ liệu đơn hàng');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

return (
   <div>
    <div className="text-xl font-bold">
      <h2>Đơn hàng gần đây</h2>
    </div>
    <div className="mt-5 w-full">
      {loading ? (
        <div className="text-center py-10 text-gray-500">Đang tải đơn hàng...</div>
      ) : (
        <div className="max-h-100 overflow-y-auto w-full" style={{height: "100%"}}>
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
                  <td colSpan="10" className="text-center font-bold py-4">
                    Không tìm thấy đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
  );
};

export default Table;
