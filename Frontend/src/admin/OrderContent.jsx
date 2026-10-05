import React from 'react'
import style from './style/OrderContent.module.css'
import OrderTable from './OrderTable'

const OrderContent = () => {
  return (
    <div className={style.ContentMain}>
      <h1 className='mt-5'>Đơn hàng</h1>
      <div className='mt-10'>
        <OrderTable/>
      </div>
    </div>
  )
}

export default OrderContent
