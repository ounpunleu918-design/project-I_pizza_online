import React, {useState} from 'react'
import axios from 'axios';

const EditProduct = ({id, Id_Product, Name_Product, onEdit, Image_Product}) => {
    const [gia, setGia] = useState(0);
    const [soLuong, setSoLuong] = useState(0);
    const [kichThuoc, setKichThuoc] = useState(0);
    const [error, setError] = useState(null);

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
    const handleSave = async (e) => {
          e.preventDefault();
      
          if (!gia || !soLuong || !kichThuoc) {
            setError('Hãy nhập đầy đủ thông tin!');
            return;
          }
      
          const newgia = parseInt(gia);
          const soluong = parseInt(soLuong);
      
          if (gia < 0 || soluong < 0 || kichThuoc < 0) {
            setError('Giá trị không thể số âm!');
            return;
          }
          try {
          const formData = new FormData();
          formData.append('masanpham', Id_Product);
          formData.append('tensanpham', Name_Product);
          formData.append('gia', newgia);
          formData.append('soluong', soluong);
          formData.append('kichthuoc', kichThuoc);
    
          const response = await axios.post('http://localhost:5000/edit_product', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          });
    
          if (response.status === 200) {
          alert("Sản phẩm đã sửa thành công!");
          onEdit();
          window.location.reload();
          } else {
          setError(response.data?.error || 'Server error');
          }
        } catch (error) {
        errorText = `Unexpected error: ${error.message}`;
        setError(errorText)
        }
    };
  return (
    <div>
    <dialog id={id} className="modal">
    <div className="modal-box">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-[#004666] text-left">Sửa sản phẩm</h3>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Mã sản phẩm</span>
        <br/>
        <input type = "number" 
        value = {Id_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Tên sản phẩm</span>
        <br/>
        <input type = "text" 
        value = {Name_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
    <span className='text-black text-base'>Ảnh sản phẩm</span>
    <br/>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img
      style={{ height: '100px' }}
      src={Image_Product}
      alt="Ảnh sản phẩm"
    />
    </div>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Giá (đ)</span>
        <br/>
        <input type="number" 
        value = {gia}
        onChange = {handleGia}
        placeholder="Nhập giá sản phẩm..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Kích thước (inches)/(liters)</span>
        <br/>
        <input type="number" 
        value = {kichThuoc}
        onChange = {handleKichThuoc}
        placeholder="Nhập kích thước sản phẩm..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
    <span className='text-black text-base'>Số lượng</span>
    <br />
    <input
    type="number" 
    value = {soLuong}
    onChange = {handleSoLuong}
    placeholder="Nhập số lượng sản phẩm..."
    className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'
    />
    </div>
    {error && (
        <p style={{ color: 'red', marginTop: "10px", "fontSize": "15px", textAlign: "center"}}>{error}</p>
    )}
    <div className='text-black text-base flex justify-around mt-4'>
      <button className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer' onClick = {handleSave}>Lưu</button>
    </div>
    </div>
    </dialog>
    </div>
  )
}

export default EditProduct
