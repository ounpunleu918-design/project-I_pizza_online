import React, { useState } from 'react'
import axios from 'axios'

const AddProduct = () => {
  const [maSanPham, setMaSanPham] = useState(0);
  const [tenSanPham, setTenSanPham] = useState('');
  const [gia, setGia] = useState(0);
  const [soLuong, setSoLuong] = useState(0);
  const [kichThuoc, setKichThuoc] = useState(0);
  const [anhSanPham, setAnhSanPham] = useState(null);
  const [error, setError] = useState(null);
  const [loaiSanPham, setLoaiSanPham] = useState(null);

  const handleMaSanPham = (event) => {
     const masanpham = parseInt(event.target.value) || 0;
     setMaSanPham(masanpham);
  }
  const handleTenSanPham = (event) => {
     setTenSanPham(event.target.value);
  }
  const handleGia = (event) => {
     const gia = parseInt(event.target.value) || 0;
     setGia(gia);
  }
  const handleSoLuong = (event) => {
     const soluong = parseInt(event.target.value) || 0;
     setSoLuong(soluong);
  }
  const handleKichThuoc = (event) => {
    setKichThuoc(event.target.value);
  }
  const handleAnhSanPham = (event) => {
    setAnhSanPham(event.target.files[0]);
  }
  const handleLoaiSanPham = (event) => {
    setLoaiSanPham(event.target.value);
  }
  const handleSave = async (e) => {
      e.preventDefault();
  
      if (!loaiSanPham || !maSanPham || !tenSanPham || !gia || !soLuong || !kichThuoc || !anhSanPham) {
        setError('Hãy nhập đầy đủ thông tin!');
        return;
      }
  
      const masanpham = parseInt(maSanPham);
      const newgia = parseInt(gia);
      const soluong = parseInt(soLuong);
  
      if (masanpham < 0 || gia < 0 || soluong < 0 || kichThuoc < 0) {
        setError('Giá trị không thể số âm!');
        return;
      }
      try {
      const formData = new FormData();
      formData.append('masanpham', masanpham);
      formData.append('tensanpham', tenSanPham);
      formData.append('gia', newgia);
      formData.append('soluong', soluong);
      formData.append('kichthuoc', kichThuoc);
      formData.append('anhsanpham', anhSanPham);
      formData.append('loaisanpham', loaiSanPham);

      const response = await axios.post('http://localhost:5000/add_product', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      });

      if (response.status === 200) {
      alert("Sản phẩm đã thêm thành công!");
      window.location.reload();
      } else {
      setError(response.data?.error || 'Server error');
      }
    } catch (error) {
      let errorText = ''
          if(error.response)
        {
            if (error.response.status == 401)
            {
                errorText = 'Mã sản phẩm đã tồn tại!';
            }
        } else {
        errorText = `Unexpected error: ${error.message}`;
        }
      setError(errorText)
    }
  };
  return (
    <div>
    <dialog id="my_modal_3" className="modal">
    <div className="modal-box">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-[#004666] text-left">Thêm sản phẩm mới</h3>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Mã sản phẩm</span>
        <br/>
        <input type="number" 
        value = {maSanPham}
        onChange = {handleMaSanPham}
        placeholder="Nhập mã sản phẩm..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Tên sản phẩm</span>
        <br/>
        <input type="text" 
        value = {tenSanPham}
        onChange = {handleTenSanPham}
        placeholder="Nhập tên sản phẩm..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Giá (đ)</span>
        <br/>
        <input type="number" 
        onChange = {handleGia}
        value = {gia}
        placeholder="Nhập giá sản phẩm..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Kích thước (inches)/(liters)</span>
        <br/>
        <input type="number" 
        placeholder="Nhập kích thước sản phẩm..."
        value = {kichThuoc}
        onChange = {handleKichThuoc}
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
    <span className='text-black text-base'>Số lượng</span>
    <br />
    <input
    type="number" 
    placeholder="Nhập số lượng sản phẩm..."
    value = {soLuong}
    onChange = {handleSoLuong}
    className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'
    />
    </div>
    <div className='mt-4 space-y-2 text-left'>
    <span className='text-black text-base'>Ảnh sản phẩm</span>
    <br />
    <input
    type="file"
    accept="image/*"
    onChange = {handleAnhSanPham}
    className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm cursor-pointer'
    />
    </div>
    <div className="mt-4 space-y-2 text-left">
    <span className="text-black text-base">Loại sản phẩm</span>
    <br />
    <select
    value = {loaiSanPham}
    onChange = {handleLoaiSanPham}
    className="text-black mt-2 w-80 px-3 py-1 border rounded-md outline-none text-sm"
    >
    <option value="">-- Chọn loại --</option>
    <option value="food">Thức ăn</option>
    <option value="drink">Đồ uống</option>
    </select>
    </div>
    {error && (
              <p style={{ color: 'red', marginTop: "10px"}}>{error}</p>
    )}
    <div className='text-black text-base flex justify-around mt-4'>
      <button onClick = {handleSave} className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer'>Thêm</button>
    </div>
    </div>
    </dialog>
    </div>
  )
}

export default AddProduct
