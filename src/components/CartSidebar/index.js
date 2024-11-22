//#region Imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartItems } from '../../data/cartItems';
//#endregion

//#region CartItem Component
const CartItem = ({ image, name, price, quantity: initialQuantity, onDelete }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img src={image} alt={name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-lg">
            <button onClick={handleDecrease} className="px-2 py-1 hover:bg-gray-100">-</button>
            <span className="px-4 py-1">{quantity}</span>
            <button onClick={handleIncrease} className="px-2 py-1 hover:bg-gray-100">+</button>
          </div>
          <span className="font-bold">{(price * quantity).toLocaleString()}đ</span>
        </div>
      </div>
      <button onClick={onDelete} className="p-2 hover:bg-gray-100 rounded-full">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};
//#endregion

//#region CartSidebar Component
const CartSidebar = ({ isOpen, onClose }) => {
  //#region Hooks and Handlers
  const navigate = useNavigate();

  const handleDelete = (id) => {
    console.log('Delete item:', id);
  };

  const handleCart = () => {
    navigate('/cart');
  };
  //#endregion

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Giỏ hàng</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                {...item}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>

          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Tổng cộng:</span>
              <span className="font-bold">
                {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}đ
              </span>
            </div>
            <button 
              className="w-full bg-orange-400 text-white py-2 rounded-md hover:bg-orange-500"
              onClick={handleCart}
            >
              Tiến hành đặt hàng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
//#endregion

export default CartSidebar;