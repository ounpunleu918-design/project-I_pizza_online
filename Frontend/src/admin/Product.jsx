import React from 'react'
import style from './style/Product.module.css'
import Slidebar from './Slidebar'
import ProductContent from './ProductContent'

const Product = () => {
  return (
    <div className={style.Main}>
    <div className={style.MainGlass}>
      <Slidebar/>
    <div className='ml-10'>
      <ProductContent/>
    </div>
    </div>
    </div>
  )
}

export default Product
