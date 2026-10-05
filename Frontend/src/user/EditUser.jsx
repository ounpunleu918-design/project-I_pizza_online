import React, { useState } from 'react'
import axios from 'axios'

const EditUser = ({id, Id_Customer, Name_Customer, onEdit}) => {

  const [hovaten, setHoVaTen] = useState('')
  const [email, setEmail] = useState('')
  const [sodienthoai, setSoDienThoai] = useState('')
  const [matkhau, setMatKhau] = useState('')
  const [diachi, setDienChi] = useState('') 
  const [error, setError] = useState(null)


  const handleSave = async (event) => {
  event.preventDefault();

  if (!hovaten || !sodienthoai || !email || !matkhau || !diachi) {
        setError('Hãy nhập đầy đủ thông tin!');
        return;
  }

  if (!sodienthoai || !matkhau) {
    setError('Hãy nhập đầy đủ thông tin!');
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Email không hợp lệ!');
        return;
  }

  const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
  if (!phoneRegex.test(sodienthoai)) {
    setError('Số điện thoại không hợp lệ!');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('makhachhang', Id_Customer);
    formData.append('tenkhachhang', hovaten);
    formData.append('sodienthoai', sodienthoai);
    formData.append('matkhau', matkhau);
    formData.append('email', email);
    formData.append('diachi', diachi);

    const response = await axios.post('http://localhost:5000/edit_user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      });

      if (response.status === 200) {
      alert("Sửa thông tin cá nhân thành công!");
      onEdit();
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
                errorText = 'Số điện thoại đã tồn tại!';
            }
        } else {
        errorText = `Unexpected error: ${error.message}`;
        }
      alert(errorText)
    }
  };


  return (
    <div>
    <dialog id={id} className="modal">
    <div className="modal-box">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-[#004666] text-left">Sửa thông tin cá nhân</h3>
    <div className='mt-4 space-y-2 text-left'>
      <span className='text-black text-base'>Khách hàng</span>
      <br/>
      <input type = "text" 
        value={`Mã khách hàng : ${Id_Customer} / Họ và tên : ${Name_Customer}`}
        disabled
        className='text-black mt-3 w-100 px-3 py-1 font-bold rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Họ và tên</span>
        <br/>
        <input type = "text" 
        value = {hovaten}
        onChange = {e => setHoVaTen(e.target.value)} 
        placeholder="Nhập họ và tên mới của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Số điện thoại</span>
        <br/>
        <input type = "text" 
        value = {sodienthoai}
        onChange = {e => setSoDienThoai(e.target.value)} 
        placeholder="Nhập số điện thoại mới của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Email</span>
        <br/>
        <input type="email" 
        value = {email}
        onChange = {e => setEmail(e.target.value)} 
        placeholder="Nhập email mới của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Mật khẩu</span>
        <br/>
        <input type = "text" 
        value = {matkhau}
        onChange = {e => setMatKhau(e.target.value)} 
        placeholder="Nhập mật khẩu mới của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
    <span className='text-black text-base'>Địa chỉ</span>
    <br />
    <input
        type="text" 
        value = {diachi}
        onChange = {e => setDienChi(e.target.value)} 
        placeholder="Nhập địa chỉ mới của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'
    />
    </div>
    {error && (
              <p style={{ color: 'red', marginTop: "10px"}}>{error}</p>
    )}
    <div className='text-black text-base flex justify-around mt-4'>
      <button className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer' onClick = {handleSave}>Lưu</button>
    </div>
    </div>
    </dialog>
    </div>
  )
}

export default EditUser
