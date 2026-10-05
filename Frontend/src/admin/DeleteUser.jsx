import React, {useState} from 'react'
import axios from 'axios'

const DeleteUser = ({id, Id_Customer, Name_Customer, onEdit}) => {
  const [error, setError] = useState(null);
  const handleSave = async (e) => {
        e.preventDefault();

        const confirmDelete = window.confirm(`Bạn có muốn xóa khách hàng với mã: ${Id_Customer} không?`);
        if (!confirmDelete) return;
        
        try {
          const formData = new FormData();
          formData.append('makhachhang', Id_Customer); 
          const response = await axios.post('http://localhost:5000/delete_user', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
          });
    
        if (response.status === 200) {
          alert("Khách hàng đã xóa thành công!");
          onEdit();
          window.location.reload();
          } else {
          setError(response.data?.error || 'Server error');
          }
        } catch (error) {
        errorText = `Unexpected error: ${error.message}`;
        setError(errorText)
        }
    };
  return (
    <div>
    <dialog id={id} className="modal">
    <div className="modal-box">
    <form method="dialog">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg text-[#004666] text-left">Xóa khách hàng</h3>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Mã khách hàng</span>
        <br/>
        <input type = "number" 
        value = {Id_Customer}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    <div className='mt-4 space-y-2 text-left'>
        <span className='text-black text-base'>Tên khách hàng</span>
        <br/>
        <input type = "text" 
        value = {Name_Customer}
        disabled
        className='w-80 px-3 font-bold outline-none' style={{textAlign: "center"}}/>
    </div>
    {error && (
        <p style={{ color: 'red', marginTop: "10px", "fontSize": "15px", textAlign: "center"}}>{error}</p>
    )}
    <div className='text-black text-base flex justify-around mt-10'>
      <button className='bg-blue-700 text-white rounded-md px-3 py-1 hover:bg-blue-800 duration-200 cursor-pointer' onClick = {handleSave}>Xóa</button>
    </div>
    </div>
    </dialog>
    </div>
  )
}

export default DeleteUser
