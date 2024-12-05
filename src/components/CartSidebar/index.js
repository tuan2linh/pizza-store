//#region Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, removeProductFromCart, updateProductInCart } from '../../services/apiService';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
//#endregion

//#region CartItem Component
const CartItem = ({ Product_Name, price_per_item, quantity: initialQuantity, onUpdateQuantity, size, onDelete }) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    onUpdateQuantity(newQuantity);
    setQuantity(newQuantity);

  }
  const handleDecrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    onUpdateQuantity(newQuantity);
    setQuantity(newQuantity);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img src="https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg" alt={Product_Name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-semibold">{Product_Name}</h3>
        <p className="text-sm text-gray-600">Size: {size}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border rounded-lg">
            <button onClick={handleDecrease} className="px-2 py-1 hover:bg-gray-100">-</button>
            <span className="px-4 py-1">{quantity}</span>
            <button onClick={handleIncrease} className="px-2 py-1 hover:bg-gray-100">+</button>
          </div>
          <span className="font-bold">{(parseFloat(price_per_item) * quantity).toLocaleString()}đ</span>
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
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const customer_id = account?.customer_id;
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(isOpen) {
      fetchCart();
    }
  }, [isOpen]);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const response = await getCart();
      setCart(response);
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await removeProductFromCart(id);
      console.log(response);
      if(response?.message === 'Product removed from cart')
      {
          fetchCart();
          toast.success('Xóa sản phẩm khỏi giỏ hàng thành công');
      }
      else
      {
          toast.error('Xóa sản phẩm khỏi giỏ hàng thất bại'); 
      }
    } catch (error) {
      toast.error('Xóa sản phẩm khỏi giỏ hàng thất bại');
      console.error('Remove product from cart error:', error);
    }
  };

  const handleChangeQuantity = async (id, quantity) => {
    try {
      const response = await updateProductInCart(id, quantity);
      console.log(response);
      if(response?.message === 'Quantity updated successfully')
      {
          fetchCart();
      }
      else
      {
          toast.error('Cập nhật số lượng sản phẩm thất bại');
      }
    } catch (error) {
      toast.error('Cập nhật số lượng sản phẩm thất bại');
      console.error('Update product in cart error:', error);
    }
  };

  const handleCart = () => {
    navigate('/payment');
    onClose();
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
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <span>Loading...</span>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex justify-center items-center h-full">
                <span>Giỏ hàng trống</span>
              </div>
            ) : (
              cart.map((item) => (
                <CartItem
                  key={item.cart_item_id}
                  {...item}
                  onDelete={() => handleDelete(item.cart_item_id)}
                  onUpdateQuantity={(quantity) => handleChangeQuantity(item.cart_item_id, quantity)}
                />
              ))
            )}
          </div>

          <div className="border-t pt-4 mt-auto">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Tổng cộng:</span>
              <span className="font-bold">
                {cart
                  .reduce((total, item) => total + Number(item.total_price), 0)
                  .toLocaleString()}đ
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