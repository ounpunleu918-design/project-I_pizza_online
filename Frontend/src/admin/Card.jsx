import React, { useEffect, useState } from 'react'
import { BiCart, BiDollar, BiUser } from 'react-icons/bi'
import style from './style/Card.module.css'

const Card = () => {
  const [summary, setSummary] = useState({
    doanh_thu: 0,
    so_khach_hang: 0,
    tong_don_hang: 0
  });

  useEffect(() => {
    fetch('http://localhost:5000/dashboard_summary')
      .then(res => res.json())
      .then(data => setSummary(data))
      .catch(err => console.error('Error fetching dashboard data:', err));
  }, []);

  const cards = [
    {
      title: 'Doanh thu',
      icon: <BiDollar />,
      total: `${summary.doanh_thu.toLocaleString()}đ`,
      className: 'cardEarning'
    },
    {
      title: 'Khách hàng',
      icon: <BiUser />,
      total: summary.so_khach_hang,
      className: 'cardCustomers'
    },
    {
      title: 'Tổng đơn',
      icon: <BiCart />,
      total: summary.tong_don_hang,
      className: 'cardOrders'
    }
  ];

  return (
    <div className={style.cardContainer}>
      {cards.map((item, index) => (
        <div className={`${style.cardContent} ${style[item.className]}`} key={index}>
          <div className={style.cardCover}>{item.icon}</div>
          <div className={style.cardTitle}>
            <h2>{item.title}</h2>
          </div>
          <div className={style.cardTotal}>
            <h3>{item.total}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
