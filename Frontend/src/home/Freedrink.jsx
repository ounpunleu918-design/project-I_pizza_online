import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Carddrink from './Carddrink';

const Freedrink = () => {
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/product_info') 
      .then(res => res.json())
      .then(data => {
        const foodItems = data.filter(item => item.loaisanpham === 'Đồ uống');
        setFilterData(foodItems);
        setLoading(false); 
      })
      .catch(err => {
        console.error('Error fetching product data:', err);
        setLoading(false); 
      });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    appendDots: dots => (
      <ul style={{ display: 'flex', justifyContent: 'center', padding: 0 }}>
        {dots.slice(0, 3).map((dot, i) => (
          <li key={i} style={{ display: 'inline-block', margin: '0 5px' }}>
            {dot}
          </li>
        ))}
      </ul>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <>
      <div className='max-w-screen-2xl container mx-auto md:px-20 px-4 mt-5'>
        <h1 className='font-semibold text-2xl pb-2'>
          <span className='border-b-2 border-red-500'>THỨ</span>C UỐNG
        </h1>

        {loading ? (
          <div className='text-center text-lg mt-10 font-medium'>Đang tải...</div>
        ) : (
          <Slider {...settings}>
            {filterData.map((item) => (
              <div key={item.masanpham}>
              <Carddrink item={item} />
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
};

export default Freedrink;
