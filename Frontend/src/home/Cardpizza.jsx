import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Buy from './Buy';

const Cardpizza = ({ item }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const isAdmin = path.includes('admin');
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className='mt-4 my-3 p-3'>
      <div className="card bg-base-100 w-92 shadow-xl">
        <figure>
          <img
            src={item.anhsanpham}
            alt={item.tensanpham}
            className="w-full h-48 object-cover hover:scale-110 transition-transform duration-300"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title" style={{ color: "#004666" }}>
            {item.tensanpham}
          </h2>
          <p className='text-md font-bold'>
            {item.kichthuoc} Inches - {item.gia.toLocaleString()} đ
          </p>
          <div className="card-actions justify-end">
            {!isAdmin && (
              <div>
                <button
                  className="text-white font-bold text-sm border border-blue-500 bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded cursor-pointer"
                  onClick={() => {
                    setSelectedId(item.masanpham);
                    const modal = document.getElementById(`my_modal_${item.masanpham}`);
                    if (modal) {
                      modal.showModal();
                    } else {
                      console.error(`Modal with id my_modal_${item.masanpham} not found`);
                    }
                  }}
                >
                  Mua hàng
                </button>
                <Buy
                  id={`my_modal_${item.masanpham}`}
                  Id_Product={item.masanpham}
                  Name_Product={item.tensanpham}
                  Image_Product={item.anhsanpham}
                  Price_Product={item.gia}
                  Amount_Product={item.soluong}
                  Type_Product={item.loaisanpham}
                  Size_Product={item.kichthuoc}
                />
              </div>
            )}
            {isAdmin && (
              <button
                className="text-white font-bold text-sm border border-green-500 bg-green-500 hover:bg-green-600 px-2 py-1 rounded cursor-pointer"
                onClick={() => {
                  navigate('/product');
                }}
              >
                Xem chi tiết
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cardpizza;
