import React, {useState} from 'react'
import axios from 'axios';

const Signup = () => {
  const [hovaten, setHoVaTen] = useState('');
  const [sodienthoai, setSoDienThoai] = useState('');
  const [email, setEmail] = useState('');
  const [matkhau, setMatKhau] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [error, setError] = useState(null);

  const handleHoVaTen = (event) => {
    setHoVaTen(event.target.value);
  }
  const handleSoDienThoai = (event) => {
    setSoDienThoai(event.target.value);
  }
  const handleEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleMatKhau = (event) => {
    setMatKhau(event.target.value);
  }
  const handleDiaChi = (event) => {
    setDiaChi(event.target.value);
  }
  const handleSave = async (event) => {
    event.preventDefault();

    if (!hovaten || !sodienthoai || !email || !matkhau || !diachi) {
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
      formData.append('hovaten', hovaten);
      formData.append('sodienthoai', sodienthoai);
      formData.append('email', email);
      formData.append('matkhau', matkhau);
      formData.append('diachi', diachi);

      const response = await axios.post('http://localhost:5000/signup', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
      });

      if (response.status === 200) {
      alert("Đăng ký thành công!");
      document.getElementById('sinupDialog').close();  
      document.getElementById('loginDialog').showModal();
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
  }
  return (
    <div>
    <dialog id="sinupDialog" className="modal">
    <div className="modal-box">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-[#004666] text-left">Đăng ký</h3>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Họ và tên</span>
        <br/>
        <input type="text" 
        value = {hovaten}
        onChange = {handleHoVaTen}
        placeholder="Nhập họ và tên của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Số điện thoại</span>
        <br/>
        <input type="text" 
        value = {sodienthoai}
        onChange = {handleSoDienThoai}
        placeholder="Nhập số điện thoại của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Email</span>
        <br/>
        <input type="email" 
        value = {email}
        onChange = {handleEmail}
        placeholder="Nhập email của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Mật khẩu</span>
        <br/>
        <input type="password" 
        value = {matkhau}
        onChange = {handleMatKhau}
        placeholder="Nhập mật khẩu của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Địa chỉ</span>
        <br/>
        <input type="text" 
        value = {diachi}
        onChange = {handleDiaChi}
        placeholder="Nhập địa chỉ của bạn..."
        className='text-black mt-3 w-80 px-3 py-1 border rounded-md outline-none text-sm'/>
    </div>
    {error && (
              <p style={{ color: 'red', marginTop: "10px"}}>{error}</p>
    )}
    <div className='text-black text-base flex justify-around mt-4'>
      <button className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer' onClick = {handleSave}>Đăng ký</button>
    </div>
    </div>
    </dialog>
    </div>
  )
}

export default Signup
