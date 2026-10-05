import React, { useState } from 'react';
import axios from 'axios';

const DeleteProduct = ({ id, Id_Product, Name_Product, onDelete }) => {
  const [error, setError] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm(`Bạn có muốn xóa sản phẩm ${Name_Product} (mã ${Id_Product}) không?`);
    if (!confirmDelete) return;

    try {
      const formData = new FormData();
      formData.append('masanpham', Id_Product);
      formData.append('force', 'true');

      const response = await axios.post('http://localhost:5000/delete_product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert('Sản phẩm đã xóa thành công!');
        onDelete();
        window.location.reload();
      } else {
        setError(response.data?.message || 'Server error');
      }
    } catch (error) {
      let errorText = '';
      if (error.response) {
        errorText = error.response.data?.message || 'Lỗi máy chủ';
      } else {
        errorText = `Unexpected error: ${error.message}`;
      }
      setError(errorText);
    }
  };

  return (
    <div>
      <dialog id={id} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-[#004666] text-left">Xóa sản phẩm</h3>
          <div className='mt-4 space-y-2 text-left'>
            <span className='text-black text-base'>Mã sản phẩm</span>
            <br/>
            <input type="number" value={Id_Product} disabled className='w-80 px-3 font-bold outline-none' style={{textAlign: 'center'}}/>
          </div>
          <div className='mt-4 space-y-2 text-left'>
            <span className='text-black text-base'>Tên sản phẩm</span>
            <br/>
            <input type="text" value={Name_Product} disabled className='w-80 px-3 font-bold outline-none' style={{textAlign: 'center'}}/>
          </div>
          {error && (
            <p style={{ color: 'red', marginTop: '10px', fontSize: '15px', textAlign: 'center' }}>{error}</p>
          )}
          <div className='text-black text-base flex justify-around mt-10'>
            <button className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer' onClick={handleSave}>Xóa</button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteProduct;
