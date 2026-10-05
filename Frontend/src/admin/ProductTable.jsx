import React, { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import axios from 'axios';
import EditProduct from './EditProduct';
import DeleteProduct from './DeleteProduct';

const ProductTable = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData]  = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const fetchProductData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/product_info');
      setProductData(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const editUpdate = async () => {
    await fetchProductData();
  }
  const filteredProducts = productData.filter((product) => {
    return (product?.masanpham && product.masanpham.toString().includes(searchTerm)) ||
           (product?.tensanpham && product.tensanpham.includes(searchTerm)) ||
           (product?.loaisanpham && product.loaisanpham.includes(searchTerm))
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
          placeholder="Mã sản phẩm/Tên sản phẩm/Loại sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-5 mr-0 sm:mr-20 cursor-pointer w-full sm:w-auto">
          <a className="text-blue-600 font-bold hover:text-blue-800 hover:underline" onClick={() => document.getElementById("my_modal_3").showModal()}>Thêm</a>
        </div>
        <AddProduct/>
      </div>
    <div className="mt-5 overflow-x-auto">
     {isLoading ? (
          <p>Đang tải...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
    ) : (
    <>
    <div className="relative flex flex-col w-full h-full text-black bg-white shadow-md rounded-xl">
      <div className="max-h-100 overflow-y-auto w-full" style={{height: "100%"}}>
        <table className="w-full text-left table-auto min-w-[640px]">
          <thead className="sticky top-0 z-50 bg-gray-100">
            <tr>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900">Mã sản phẩm</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900">Tên sản phẩm</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900">Hình ảnh</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900">Kích thước (inches)/(liters)</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900">Giá (đ)</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900">Số lượng</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900">Loại</p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900"></p>
              </th>
              <th className="p-4 border-b border-blue-gray-100">
                <p className="text-sm font-bold text-blue-gray-900"></p>
              </th>
            </tr>
          </thead>
          <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((row) => (
              <tr key={row.masanpham} className="hover:bg-gray-50 text-black">
                <td className="p-4 border-b border-blue-gray-50" style={{textAlign: "center"}}>
                  <p className="text-sm">{row.masanpham}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50" style={{textAlign: "center"}}>
                  <p className="text-sm">{row.tensanpham}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50" style={{textAlign: "center"}}>
                  <img style={{width: "50px", height: "50px"}} src={row.anhsanpham} alt={row.tensanpham} />
                </td>
                <td className="p-4 border-b border-blue-gray-50" style={{textAlign: "center"}}>
                  <p className="text-sm">{row.kichthuoc}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50" style={{textAlign: "center"}}>
                  <p className="text-sm">{row.gia}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50" style={{textAlign: "center"}}>
                  <p className="text-sm">{row.soluong}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50" style={{textAlign: "center"}}>
                  <p className="text-sm">{row.loaisanpham}</p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <div className="flex flex-col gap-2">
                    <a className="text-sm font-bold text-green-500 hover:underline cursor-pointer" 
                    onClick={()=> {
                      setSelectedId(row.masanpham)
                      const modal = document.getElementById(`my_modal_${row.masanpham}`);
                    if (modal) {
                        modal.showModal();
                    } else {
                        console.error(`Modal with id my_modal_${row.masanpham} not found`);
                    }
                    }}>
                    Sửa
                    </a>
                    <a className="text-sm font-bold text-red-500 hover:underline cursor-pointer" onClick={() => document.getElementById(`delete_modal_${row.masanpham}`).showModal()}>
                      Xóa
                    </a>
                    <EditProduct id = {`my_modal_${row.masanpham}`} Id_Product = {row.masanpham} 
                    Name_Product = {row.tensanpham} onEdit = {editUpdate} Image_Product = {row.anhsanpham}/>
                    <DeleteProduct id={`delete_modal_${row.masanpham}`} Id_Product={row.masanpham} Name_Product={row.tensanpham} onDelete={editUpdate}/>
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

export default ProductTable;
