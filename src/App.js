import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css'
import './App.css'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Promotion from './pages/Promotion'
import Order from './pages/Order'
import UserOrder from './pages/UserOrder'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Stores from './pages/Stores';
import Profile from './pages/User/Profile';
import Dashboard from './pages/Admin/Dashboard'
import Products from './pages/Admin/Products';
import AddProduct from './pages/Admin/AddProduct';
import AdminLayout from './layouts/AdminLayout';
import MainLayout from './layouts/MainLayout';
import PrivateRoute from './pages/Admin/PrivateRoute';
import Material from './pages/Admin/Material'
import AddMaterial from './pages/Admin/AddMaterial'
import UpdateMaterial from './pages/Admin/UpdateMaterial'
import Suppliers from './pages/Admin/Suppliers'
import AddSupplier from './pages/Admin/AddSupplier'
import UpdateSupplier from './pages/Admin/UpdateSupplier'



function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mx-auto flex-1">
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orders" element={<UserOrder />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='admin' element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='products' element={<Products />} />
              <Route path='addproduct' element={<AddProduct />} />
              <Route path='orders' element={<h1>Orders</h1>} />
              <Route path='customers' element={<h1>Customers</h1>} />
              <Route path='promotions' element={<h1>Promotions</h1>} />
              <Route path='vouchers' element={<h1>Vouchers</h1>} />
              <Route path='suppliers' element={<Suppliers/>} />
              <Route path='addsupplier' element={<AddSupplier />} />
              <Route path='updatesupplier/:id' element={<UpdateSupplier />} />
              <Route path='materials' element={<Material />} />
              <Route path='addmaterial' element={<AddMaterial />} />
              <Route path='updatematerial/:id' element={<UpdateMaterial />} />
              <Route path='support' element={<h1>Customer Support</h1>} />
            </Route>
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;