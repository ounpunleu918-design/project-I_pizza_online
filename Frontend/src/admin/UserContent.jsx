import React from 'react'
import Table from './Table'
import style from './style/UserContent.module.css'
import UserTable from './UserTable'

const UserContent = () => {
  return (
    <div className={style.ContentMain}>
      <h1 className='mt-5'>Khách hàng</h1>
      <div className='mt-10'>
        <UserTable/>
      </div>
    </div>
  )
}

export default UserContent
