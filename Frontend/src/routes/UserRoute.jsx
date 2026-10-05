import React, {useE} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const UserRoute = ({ path, element }) => {
  const location = useLocation();
  const isUser = localStorage.getItem('role') === 'user' || localStorage.getItem('user_id');

  if (!isUser) {
    console.log('UserRoute: Not logged in, role:', localStorage.getItem('role'), 'user_id:', localStorage.getItem('user_id'));
    alert("Hãy đăng nhập trước!");
    return (
      <Navigate
        to="/"
        state = {{ from: location }}
        replace
      />
    );
  }

  return element;
};

export default UserRoute;