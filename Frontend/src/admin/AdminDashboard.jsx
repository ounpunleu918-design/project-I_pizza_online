import React from 'react'
import style from './style/AdminDashboard.module.css'
import Slidebar from './Slidebar'
import Content from './Content'

const Admindashboard = () => {
  return (
    <div className={style.Main}>
      <div className={style.MainGlass}>
      <Slidebar/>
      <div className='ml-10'>
      <Content/>
      </div>
      </div>
    </div>
  )
}

export default Admindashboard
