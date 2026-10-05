import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Signup from './Singup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const [sodienthoai, setSoDienThoai] = useState('');
  const [matkhau, setMatKhau] = useState('');
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleSave = async (event) => {
  event.preventDefault();
  console.log('handleSave called');

  if (!sodienthoai || !matkhau) {
    setError('Hãy nhập đầy đủ thông tin!');
    return;
  }

  const phoneRegex = /^(0|\+84)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/;
  if (!phoneRegex.test(sodienthoai)) {
    setError('Số điện thoại không hợp lệ!');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('sodienthoai', sodienthoai);
    formData.append('matkhau', matkhau);

    const response = await axios.post('http://localhost:5000/login', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true 
    });

    if (response.status === 200) {
      const data = response.data;
      alert(data.message);

      if (data.role === 'admin') {
        localStorage.setItem('role', 'admin');
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          navigate('/page_admin');
        }, 500);
      } else if (data.role === 'user') {
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('tenkhachhang', data.tenkhachhang);
        localStorage.setItem('role', 'user');
        localStorage.setItem("isLoggedIn", "true");
        setTimeout(() => {
          navigate('/page_user');
        }, 500);
      }
    } else {
      setError(response.data?.message || 'Server error');
    }

    } catch (error) {
    let errorText = 'Lỗi kết nối đến máy chủ';

    if (error.response) {
      if (error.response.status === 401) {
        errorText = 'Số điện thoại hoặc mật khẩu không đúng!';
      } else if (error.response.status === 404) {
        errorText = 'Bạn chưa đăng ký tài khoản!';
      } else {
        errorText = error.response.data?.message || 'Lỗi máy chủ';
      }
    } else {
      errorText = `Unexpected error: ${error.message}`;
    }

    alert(errorText);
  }
  };
  return (
    <div>
    <dialog id="loginDialog" className="modal">
    <div className="modal-box">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-[#004666] text-left">Đăng nhập</h3>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Số điện thoại</span>
        <br/>
        <input type="text" 
        value = {sodienthoai}
        onChange = {e => setSoDienThoai(e.target.value)} 
        placeholder="Nhập số điện thoại của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Mật khẩu</span>
        <br/>
        <input type="password" 
        value = {matkhau}
        onChange = {e => setMatKhau(e.target.value)} 
        placeholder="Nhập mật khẩu của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    {error && (
        <p style={{ color: 'red', marginTop: "10px", "fontSize": "15px", textAlign: "center"}}>{error}</p>
    )}
    <div className='text-black text-base flex justify-around mt-4'>
      <button className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer' onClick = {handleSave}>Đăng nhập</button>
      <div>
      <p className='mt-1'>Chưa đăng ký? <span className='underline cursor-pointer text-blue-500' onClick={() => document.getElementById("sinupDialog").showModal()}>
      Đăng ký ngay</span></p>
      <Signup/>
      </div>
    </div>
    </div>
    </dialog>
    </div>
  )
}

export default Signin
