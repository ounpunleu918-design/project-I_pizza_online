import React from 'react'

const Contact = () => {
  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg text-[#004666]">Liên hệ chúng tôi qua :</h3>
          <div className='flex gap-10 mt-5'>
          <img style={{width: "30px", height: "30px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png" alt="" />
          <h2 className='font-bold text-lg text-black'>0835385003</h2>
          </div>
          <div className='flex gap-10 mt-5'>
          <img style={{width: "30px", height: "30px"}} src="https://cdn-icons-png.flaticon.com/128/732/732200.png" alt="" />
          <h2 className='font-bold text-lg text-black'>dpizza@gmail.com</h2>
          </div>
        </div>
      </dialog>
    </div>
  )
}

export default Contact