import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Homes from './home/Homes'
import Pizzahome from './home/Pizzahome'
import Drinkhome from './home/Drinkhome'
import Admindashboard from './admin/Admindashboard'
import User from './admin/User'
import Product from './admin/Product'
import UserDashBoard from './user/UserDashBoard'
import Order from './admin/Order'
import Signin from './home/Signin'
import UserOrder from './user/UserOrder'
import AdminRoute from './routes/AdminRoute'
import UserRoute from './routes/UserRoute'


const App = () => {
  return (
    <Routes>
        <Route path="/" element={<Homes/>} />
        <Route path="/pizza" element={<Pizzahome/>} />
        <Route path="/drinks" element={<Drinkhome/>} />
        {/*   Admin Routes  */}
        <Route path="/page_admin" element= {<AdminRoute path="/page_admin" element={<Homes/>}/>}/>
        <Route path="/pizza_admin"  element= {<AdminRoute path="/pizza_admin" element={<Pizzahome/>} />}/>
        <Route path="/drinks_admin"  element= {<AdminRoute path="/drinks_admin" element={<Drinkhome/>} />}/>
        <Route path="/admin" element= {<AdminRoute path="/admin" element={<Admindashboard/>} />}/>
        <Route path='/customer' element={<AdminRoute path="/user" element={<User/>}/>}/>
        <Route path='/product' element={<AdminRoute path="/product" element={<Product/>}/>}/>
        <Route path='/order' element={<AdminRoute path="/order" element={<Order/>}/>}/>
        {/*   User Routes  */}
        <Route path="/page_user" element= {<UserRoute path="/page_user" element={<Homes/>}/>}/>
        <Route path="/pizza_user"  element= {<UserRoute path="/pizza_user" element={<Pizzahome/>} />}/>
        <Route path="/drinks_user"  element= {<UserRoute path="/drinks_user" element={<Drinkhome/>} />}/>
        <Route path='/user' element={<UserRoute path="/user" element={<UserDashBoard/>}/>}/>
        <Route path='/user_order' element={<UserRoute path="/user_order" element={<UserOrder/>}/>}/>
    </Routes>
  )
}

export default App