import React from 'react';
import { useLocation } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import UserNavbar from './UserNavbar';
import Navbar from './Navbar';


const SmartNavbar = () => {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/page_admin' || path === '/pizza_admin' || path === '/drinks_admin') {
    return <AdminNavbar />;
  } else if (path === '/page_user' || path === '/pizza_user' || path === '/drinks_user') {
    return <UserNavbar />;
  } else {
    return <Navbar/>;
  }
};

export default SmartNavbar;
