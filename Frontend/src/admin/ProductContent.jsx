import React from 'react'
import style from './style/ProductContent.module.css'
import ProductTable from './ProductTable'

const ProductContent = () => {
  return (
    <div className={style.ContentMain}>
      <h1 className='mt-5'>Sản phẩm</h1>
      <div className='mt-10'>
        <ProductTable/>
      </div>
    </div>
  )
}

export default ProductContent
