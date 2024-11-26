import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CartSidebar from '../components/CartSidebar';
import { useState } from 'react';

const MainLayout = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-50 bg-white">
        <Header onCartClick={handleCartToggle} />
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <div className="w-[80%] mx-auto flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;