import React from 'react'
import UserOrderContent from './UserOrderContent'
import style from './style/UserOrder.module.css'
import Slidebar from './Slidebar'

const UserOrder = () => {
  return (
   <div className={style.Main}>
    <div className={style.MainGlass}>
        <Slidebar/>
    <div className='ml-10'>
        <UserOrderContent/>
    </div>
    </div>
    </div>
  )
}

export default UserOrder
