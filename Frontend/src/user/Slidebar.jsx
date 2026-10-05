import React, { useState } from 'react'
import style from './style/Slidebar.module.css'
import {SidebarData} from './Data/Data'
import { BiArrowToRight } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Slidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
    navigate('/page_user'); 
    };

    const [selected, setSelected] = useState(0);
  return (
    <div className={style.Sidebar}>
        <div className={style.Logo}>
        <img src="https://cdn-icons-png.flaticon.com/128/9495/9495045.png" alt="" />
        <span>D-Pizza</span>
        </div>
        <div className={style.Menu}>
        {SidebarData.map((item, index) => {
            return (
                <NavLink
                        to={item.path} 
                        key={index}
                        className={({ isActive }) =>
                            `${style.MenuItem} ${isActive ? style.active : ''}`
                        }
                        onClick={() => setSelected(index)}
                        >
                        <item.icon />
                        <span>{item.heading}</span>
                </NavLink>
            )
        })}
        <div className={style.MenuItem} onClick = {handleLogout}>
            <BiArrowToRight/>
        </div>
        </div>
    </div>
  )
}

export default Slidebar
