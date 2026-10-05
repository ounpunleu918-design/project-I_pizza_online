import React from 'react'
import style from './style/Order.module.css'
import Slidebar from './Slidebar'
import OrderContent from './OrderContent'

const Order = () => {
  return (
    <div className={style.Main}>
    <div className={style.MainGlass}>
      <Slidebar/>
    <div className='ml-10'>
      <OrderContent/>
    </div>
    </div>
    </div>
  )
}

export default Order
