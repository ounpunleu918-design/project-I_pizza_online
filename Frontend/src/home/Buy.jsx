import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Buy = ({id, Id_Product, Name_Product, Image_Product, Amount_Product, Type_Product,
  Price_Product, Size_Product
}) => {
  const [soLuongMua, setSoLuongMua] = useState(1);
  const [tongGia, setTongGia] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const userId = localStorage.getItem('user_id');
  const [error, setError] = useState(null)

  const handlesoLuongMua = (event) => {
    let soluongmua = parseInt(event.target.value) || 0;
    if(soluongmua < 0) soluongmua = 0;
    setSoLuongMua(soluongmua);
  }
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsSignedIn(!!user);
  }, []);

  useEffect(() => {
  const dongia = Price_Product;
  const total = dongia * soLuongMua;
  setTongGia(total);
  }, [soLuongMua, Price_Product]);
  const handleBuy = async (e) => {
   e.preventDefault();
   if (!userId) {
      alert("Bạn chưa đăng nhập, vui lòng đăng nhập trước!");
      return;
  }
   if(!soLuongMua || soLuongMua < 1) {
    setError('Hãy nhập số lượng sản phẩm bạn muốn mua (≥ 1)!');
    return;
   }
    try {
         const formData = new FormData();
         formData.append('makhachhang', userId);
         formData.append('masanpham', Id_Product);
         formData.append('soluong', soLuongMua);
         formData.append('tonggia', tongGia);
         const response = await axios.post('http://localhost:5000/buy_product', formData, {
         headers: {
               'Content-Type': 'multipart/form-data'
         },
         withCredentials: true 
        });

   
         if (response.status === 200) {
         alert("Mua thành công!");
         window.location.href = "/user_order";
         } else {
         setError(response.data?.error || 'Server error');
         }
       } catch (error) {
         let errorText = ''
             if(error.response)
           {
               if (error.response.status == 401)
               {
                   errorText = 'Số lượng sản phẩm không đủ!';
               }
               if (error.response.status == 402)
               {
                   errorText = 'Sản phẩm đã hết hàng!';
               }
               if (error.response.status == 405)
               {
                  alert('Bạn vui lòng đăng nhập trước!');
                  const signin = document.getElementById("loginDialog");
                  if(signin) signin.showModal();
               }
               else if (error.response.status == 400)
               {
                  errorText = error.response.data?.message || 'Dữ liệu không hợp lệ';
               }
           } else {
           errorText = `Unexpected error: ${error.message}`;
           }
         setError(errorText)
    }
};
  return (
    <div>
    <dialog id = {id} className="modal">
    <div className="modal-box">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-[#004666] text-left">Mua hàng</h3>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Mã sản phẩm</span>
        <br/>
        <input type = "number" 
        value = {Id_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Tên sản phẩm</span>
        <br/>
        <input type = "text" 
        value = {Name_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
    <span className='text-black text-base'>Ảnh sản phẩm</span>
    <div className='flex justify-center items-center mt-2'>
    <img
      style={{ width: 'full', height: '100px' }}
      src = {Image_Product}
      alt = {Image_Product}
    />
     </div>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Loại sản phẩm</span>
        <br/>
        <input type = "text" 
        value = {Type_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Kích thước (Inches hoặc Liters)</span>
        <br/>
        <input type = "number" 
        value = {Size_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Số lượng tồn kho</span>
        <br/>
        <input type = "number" 
        value = {Amount_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Số lượng mua</span>
        <br/>
        <input type = "number" 
        value = {soLuongMua}
        onChange = {handlesoLuongMua}
        placeholder="Bạn muốn mua bao nhiêu cái?..."
        min="1"
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Đơn giá (đ)</span>
        <br/>
        <input type = "number" 
        value = {Price_Product}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
     <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Tổng giá (đ)</span>
        <br/>
        <input type = "number" 
        value = {tongGia}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    {error && (
        <p style={{ color: 'red', marginTop: "10px", "fontSize": "15px", textAlign: "center"}}>{error}</p>
    )}
    <div className='text-black text-base flex justify-around mt-4'>
      <button className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer' onClick = {handleBuy}>Mua</button>
    </div>
    </div>
    </dialog>
    </div>
  )
}

export default Buy
