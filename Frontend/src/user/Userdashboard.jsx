import React from 'react'
import style from './style/Userdashboard.module.css'
import Slidebar from './Slidebar'
import Content from './Content'

const UserDashBoard = () => {
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

export default UserDashBoard
