import React from 'react'
import style from './style/Content.module.css'
import Card from './Card'
import Table from './Table'

const Content = () => {
  return (
    <div className={style.ContentMain}>
      <h1 className='mt-5'>Tổng quan</h1>
      <Card/>
      <Table/>
    </div>
  )
}

export default Content
