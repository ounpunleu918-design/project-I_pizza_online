import React from 'react'
import style from './style/User.module.css'
import Slidebar from './Slidebar'
import UserContent from './UserContent'

const User = () => {
  return (
    <div className={style.Main}>
    <div className={style.MainGlass}>
      <Slidebar/>
    <div className='ml-10'>
      <UserContent/>
    </div>
    </div>
    </div>
  )
}

export default User
