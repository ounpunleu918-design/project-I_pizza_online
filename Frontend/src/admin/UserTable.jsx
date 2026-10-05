import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteUser from './DeleteUser';

const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData]  = useState([])
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
        const fetchUsersData = async () => {
          setIsLoading(true);
          try {
            const response = await axios.get('http://localhost:5000/user_info');
            setUsersData(response.data);
          } catch (error) {
            setError(error.message);
          } finally {
            setIsLoading(false);
          }
        };
        fetchUsersData();
      }, []);
      const editUpdate = async () => {
      await fetchProductData();
    }
    const filteredData = usersData.filter((user) => {
      return (user?.makhachhang && user.makhachhang.toString().includes(searchTerm)) ||
             (user?.tenkhachhang && user.tenkhachhang.includes(searchTerm)) ||
             (user?.sodienthoai && user.sodienthoai.toString().includes(searchTerm)) ||
             (user?.email && user.email.includes(searchTerm)) 
    });
  return (
    <div className="w-full">
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        className="flex flex-wrap justify-center items-center"
      >
        <input
          type="text"
          className="w-full sm:w-120 border-2 border-gray-300 rounded text-center mb-4 sm:mb-0"
          placeholder="Tìm kiếm theo tên, mã khách hàng/email/số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="mt-5 overflow-x-auto">
        {isLoading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <>
        <div className="relative flex flex-col w-full h-full text-black bg-white shadow-md rounded-xl">
          <div className="max-h-100 overflow-y-auto w-full">
            <table className="w-full text-left table-auto min-w-[640px]">
              <thead className="sticky top-0 z-50 bg-gray-100">
                <tr>
                  <th className="p-4 border-b border-blue-gray-100">Mã khách hàng</th>
                  <th className="p-4 border-b border-blue-gray-100">Tên khách hàng</th>
                  <th className="p-4 border-b border-blue-gray-100">Số điện thoại</th>
                  <th className="p-4 border-b border-blue-gray-100">Email</th>
                  <th className="p-4 border-b border-blue-gray-100">Địa chỉ</th>
                  <th className="p-4 border-b border-blue-gray-100">Ngày đăng ký</th>
                  <th className="p-4 border-b border-blue-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50 text-black">
                      <td className="p-4 border-b border-blue-gray-50">{row.makhachhang}</td>
                      <td className="p-4 border-b border-blue-gray-50">{row.tenkhachhang}</td>
                      <td className="p-4 border-b border-blue-gray-50">{row.sodienthoai}</td>
                      <td className="p-4 border-b border-blue-gray-50">{row.email}</td>
                      <td className="p-4 border-b border-blue-gray-50">{row.diachi}</td>
                      <td className="p-4 border-b border-blue-gray-50">{row.ngaydangky}</td>
                      <td className="p-4 border-b border-blue-gray-50">
                    <div>
                    <a className="text-sm font-bold text-red-500 hover:underline cursor-pointer" 
                    onClick={()=> {
                      setSelectedId(row.makhachhang)
                      const modal = document.getElementById(`my_modal_${row.makhachhang}`);
                    if (modal) {
                        modal.showModal();
                    } else {
                        console.error(`Modal with id my_modal_${row.makhachhang} not found`);
                    }
                    }}>
                    Xóa 
                  </a>
                  <DeleteUser id = {`my_modal_${row.makhachhang}`} Id_Customer = {row.makhachhang} 
                  Name_Customer = {row.tenkhachhang} onEdit = {editUpdate}/>
                  </div>
                </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center font-bold py-4" style={{color: "red"}}>
                      Không tìm thấy kết quả phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </>
      )}
      </div>
    </div>
  );
};

export default UserTable;
