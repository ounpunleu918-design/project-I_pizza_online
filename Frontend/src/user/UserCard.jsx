import React, { useState, useEffect } from 'react';
import { BiCart, BiDollar } from 'react-icons/bi';
import axios from 'axios';
import style from './style/UserCard.module.css';

const UserCard = () => {
  const userId = localStorage.getItem('user_id');

  const [stats, setStats] = useState({ total_amount: 0, total_orders: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:5000/get_user_stats', {
           params: { user_id: userId }
      });
        setStats({
          total_amount: response.data.total_amount || 0,
          total_orders: response.data.total_orders || 0
        });
      } catch (err) {
        setError('Không thể tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  const card = [
    {
      title: 'Tổng tiền đã mua',
      icon: <BiDollar />,
      total: Number(stats.total_amount).toLocaleString('en-US') + ' đ',
      className: 'cardEarning'
    },
    {
      title: 'Tổng đơn đã mua',
      icon: <BiCart />,
      total: stats.total_orders,
      className: 'cardOrders'
    }
  ];

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!userId) return <p>Vui lòng đăng nhập để xem thông tin.</p>;

  return (
    <div className={style.cardContainer}>
      {card.map((item, index) => (
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

export default UserCard;
