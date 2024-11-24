import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Footer from './components/Footer'
import Menu from './pages/Menu'
import Promotion from './pages/Promotion'
import Order from './pages/Order'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Payment from './pages/Payment'
import Stores from './pages/Stores';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="w-[80%] mx-auto flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/promotion" element={  <Promotion />} />
            <Route path="/order" element={<Order />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/stores" element={<Stores />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App