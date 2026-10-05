import React from 'react'
import style from './style/UserOrderContent.module.css'
import UserOrderTable from './UserOrderTable'


const UserOrderContent = () => {
  return (
    <div className={style.ContentMain}>
      <h1 className='mt-5'>Đơn hàng</h1>
      <div className='mt-10'>
        <UserOrderTable/>
      </div>
    </div>
  )
}

export default UserOrderContent
