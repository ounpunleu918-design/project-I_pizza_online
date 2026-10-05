import React from 'react'

const Footer = () => {
  return (
    <>
    <footer className="footer sm:footer-horizontal text-base-content p-10" style={{color: "white", backgroundColor: "#004666"}}>
  <nav className='space-y-2'>
    <div className='flex items-center justify-center gap-5'>
    <img src="https://cdn-icons-png.flaticon.com/128/2454/2454219.png" alt="" />
    <h1 className='text-3xl font-bold mt-10'>D-Pizza</h1>
    </div>
    <p className='footer-title'>@{new Date().getFullYear()} D-Pizza Vietnam | Privacy Policy</p>
  </nav>
  <nav>
    <h6 className="footer-title">Liên hệ</h6>
    <a className="link link-hover">Số điện thoại: (+84)835385003</a>
    <a className="link link-hover">Email: dpizza@gmail.com</a>
  </nav>
  <nav>
    <h6 className="footer-title">Địa chỉ</h6>
    <a className="link link-hover">Hai Bà Trưng, Bách Khoa, Hà Nội</a>
  </nav>
</footer>
    </>
  )
}

export default Footer
