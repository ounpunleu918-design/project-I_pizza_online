import React, { useState, useEffect } from 'react';
import style from './style/Content.module.css';
import UserCard from './UserCard';
import EditUser from './EditUser';
import axios from 'axios';

const Content = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData]  = useState([])
  const userId = localStorage.getItem('user_id');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
  const fetchUsersData = async () => {
    if (!userId) return; 

    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/get_user_info', {
        params: {
          makhachhang: userId
        }
      });
      console.log('User info response:', response.data);
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
      await fetchUsersData();
  }
  return (
    <div className={style.ContentMain}>
      <h1 className='mt-5'>Tổng quán</h1>
      <UserCard/>
      <div className='mt-10'>
        <div className="flex gap-5 items-center">
        <h1>Thông tin cá nhân</h1>
        <div className="flex mr-0 sm:mr-20 cursor-pointer w-full sm:w-auto">
        <a>
          <img style={{width: "20px", height: "20px", marginTop: "3px"}}  src="https://cdn-icons-png.flaticon.com/128/1250/1250615.png" alt="" 
          onClick={()=> {
          setSelectedId(usersData.tenkhachhang)
            const modal = document.getElementById(`my_modal_${usersData.makhachhang}`);
          if (modal) {
              modal.showModal();
          } else {
            console.error(`Modal with id my_modal_${usersData.makhachhang} not found`);
          }
        }}
         />
        </a>
        <EditUser id = {`my_modal_${usersData.makhachhang}`} Id_Customer = {usersData.makhachhang} Name_Customer = {usersData.tenkhachhang}
        onEdit = {editUpdate}
        />
        </div>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
        <>
        <div className='mt-10 flex'>
          <ul>
            <div style={{display: "flex", gap: "10px"}}>
              <img style={{width: "20px", height: "20px", marginTop: "3px"}} src="https://cdn-icons-png.flaticon.com/128/3381/3381635.png" alt="" />
              <li><span className='font-bold text-lg'>Mã khách hàng : </span>{usersData.makhachhang}</li>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <img style={{width: "20px", height: "20px", marginTop: "3px"}} src="https://cdn-icons-png.flaticon.com/128/3024/3024605.png" alt="" />
              <li><span className='font-bold text-lg'>Họ và tên : </span>{usersData.tenkhachhang}</li>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <img style={{width: "20px", height: "20px", marginTop: "3px"}} src="https://cdn-icons-png.flaticon.com/128/455/455604.png" alt="" />
              <li><span className='font-bold text-lg'>Số điện thoại : </span>{usersData.sodienthoai}</li>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <img style={{width: "20px", height: "20px", marginTop: "3px"}} src="https://cdn-icons-png.flaticon.com/128/3178/3178165.png" alt="" />
              <li><span className='font-bold text-lg'>Email : </span>{usersData.email}</li>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <img style={{width: "20px", height: "20px", marginTop: "3px"}} src="https://cdn-icons-png.flaticon.com/128/535/535239.png" alt="" />
              <li><span className='font-bold text-lg'>Địa chỉ : </span>{usersData.diachi}</li>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <img style={{width: "20px", height: "20px", marginTop: "3px"}} src="https://cdn-icons-png.flaticon.com/128/833/833593.png" alt="" />
              <li><span className='font-bold text-lg'>Ngày đăng ký vào : </span>{usersData.ngaydangky}</li>
            </div>
            <div style={{display: "flex", gap: "10px"}}>
              <img style={{width: "20px", height: "20px", marginTop: "3px"}} src="https://cdn-icons-png.flaticon.com/128/17964/17964222.png" alt="" />
              <li><span className='font-bold text-lg'>Mật khẩu : </span>{usersData.matkhau}</li>
            </div>
          </ul>
        </div>  
      </>
      )}
      </div>
    </div>
  );
};

export default Content;

