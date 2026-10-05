import React, { useEffect, useState } from 'react';
import { MdMenu, MdClose } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import Contact from './Contact';
import Signin from './Signin';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 0){
        setSticky(true)
      }
      else{
        setSticky(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const NavbarMenu = [
    {
      id: 1,
      title: "TRANG CHỦ",
      link: "/"
    },
    {
      id: 2,
      title: "THỨC ĂN",
      link: "/pizza"
    },
    {
      id: 3,
      title: "THỨC UỐNG",
      link: "/drinks"
    },
    {
      id: 4,
      title: "LIÊN HỆ",
      link: "/contact"
    }
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div 
        style={{ 
          backgroundColor: "#004666", 
          color: "white",
          position: sticky ? 'fixed' : 'relative',
          top: sticky ? 0 : 'auto',
          width: '100%',
          zIndex: 1000
        }} 
        className={`py-4 ${
          sticky?"shadow-md bg-base-200 duration-300 transition-all ease-in-out":
          ""
        }`     
      }>
        <nav className='mx-auto container max-w-7xl flex justify-between items-center'>
          <div>
            <a href="" className='text-2xl font-bold uppercase'>
              D-Pizza
            </a>
          </div>
          <div className='hidden md:block'>
            <ul className='flex items-center gap-4 font-bold'>
              {NavbarMenu.map((item) => (
                <li key={item.id}>
                {item.link === '/contact' ? (
                <div>
                  <a
                className='cursor-pointer inline-block text-md py-2 px-3 uppercase relative after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-50 after:transition-transform after:duration-300'
                onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                {item.title}
                </a>
                <Contact/>
                </div>
                ) : (
                  <a 
                    href={item.link} 
                    className='inline-block text-md py-2 px-3 uppercase relative after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-50 after:transition-transform after:duration-300'
                  >
                    {item.title}
                  </a>
                )}
              </li>
              ))}
              <div>
              <button className='text-xl flex items-center gap-4'>
              <FaCircleUser className='cursor-pointer'onClick={() => document.getElementById("loginDialog").showModal()}/>
              <Signin/>
              </button>
              </div>
            </ul>
          </div>
          <div className='md:hidden'>
            <MdMenu onClick={handleMenuToggle} className={`${isMenuOpen ? 'hidden' : 'block'}`} />
            {isMenuOpen && (
              <div className='absolute bg-[#004666] w-full top-16 left-0 py-4'>
                <div className='flex justify-end px-4'>
                  <MdClose onClick={handleMenuToggle} className='text-2xl cursor-pointer' />
                </div>
                <ul className='flex flex-col items-center gap-4 font-bold'>
                  {NavbarMenu.map((item) => (
                    <li key={item.id}>
                      <a 
                        href={item.link} 
                        className='inline-block text-sm py-2 px-3 uppercase relative after:content-[""] after:absolute after:w-full after:h-0.5 after:bg-white after:left-0 after:-bottom-1 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                  <div className='text-xl flex items-center gap-4'>
                  <div>
                  </div>
                  <FaCircleUser className='cursor-pointer'onClick={() => document.getElementById("loginDialog").showModal()}/>
                  <Signin/>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;