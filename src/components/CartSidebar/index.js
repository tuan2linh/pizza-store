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
    <div className="flex items-center gap-4 py-4 border-b hover:bg-gray-50 transition-colors">
      <div className="relative w-24 h-24">
        <img src="https://img.jakpost.net/c/2016/09/29/2016_09_29_12990_1475116504._large.jpg" 
             alt={Product_Name} 
             className="w-full h-full object-cover rounded-lg shadow-sm" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{Product_Name}</h3>
        <p className="text-sm text-gray-500 mt-1">Size: {size}</p>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center bg-gray-100 rounded-lg overflow-hidden">
            <button onClick={handleDecrease} 
                    className="px-3 py-1 hover:bg-gray-200 transition-colors text-gray-600">
              −
            </button>
            <span className="px-4 py-1 font-medium bg-white">{quantity}</span>
            <button onClick={handleIncrease} 
                    className="px-3 py-1 hover:bg-gray-200 transition-colors text-gray-600">
              +
            </button>
          </div>
          <span className="font-bold text-orange-500">
            {(parseFloat(price_per_item) * quantity).toLocaleString()}đ
          </span>
        </div>
      </div>
      <button onClick={onDelete} 
              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors">
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
  const [cartData, setCartData] = useState({ items: [], subTotal: "0" });
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
      console.log(response);
      setCartData(response);
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
      <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-50 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={onClose} />
      
      <div className={`fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2 className="text-xl font-bold text-gray-900">Giỏ hàng của bạn</h2>
              </div>
              <button onClick={onClose} 
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"/>
                <p className="text-gray-500">Đang tải giỏ hàng...</p>
              </div>
            ) : cartData.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <p className="text-lg font-medium">Giỏ hàng của bạn đang trống</p>
              </div>
            ) : (
              <div className="py-4 space-y-4">
                {cartData.items.map((item) => (
                  <CartItem key={item.cart_item_id} {...item} 
                           onDelete={() => handleDelete(item.cart_item_id)}
                           onUpdateQuantity={(quantity) => handleChangeQuantity(item.cart_item_id, quantity)} />
                ))}
              </div>
            )}
          </div>

          {cartData.items.length > 0 && (
            <div className="border-t px-6 pt-4 pb-6 bg-gray-50">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>{parseFloat(cartData.subTotal).toLocaleString()}đ</span>
                </div>
                {cartData.loyaltyDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá khuyến mãi:</span>
                    <span>-{parseFloat(cartData.loyaltyDiscount).toLocaleString()}đ</span>
                  </div>
                )}
                {cartData.voucher && (
                  <div className="flex justify-between text-green-600">
                    <span>Giảm giá voucher ({cartData.voucher.Voucher_Code}):</span>
                    <span>
                      {cartData.voucher.Discount_Type === 'Percent' 
                        ? `-${(parseFloat(cartData.subTotal) * parseFloat(cartData.voucher.Discount_Value) / 100).toLocaleString()}đ`
                        : `-${parseFloat(cartData.voucher.Discount_Value).toLocaleString()}đ`
                      }
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold border-t pt-3">
                  <span>Tổng cộng:</span>
                  <span className="text-orange-500">
                    {(
                      parseFloat(cartData.subTotal) - 
                      (parseFloat(cartData.loyaltyDiscount) || 0) - 
                      (cartData.voucher 
                        ? (cartData.voucher.Discount_Type === 'Percent'
                          ? parseFloat(cartData.subTotal) * parseFloat(cartData.voucher.Discount_Value) / 100
                          : parseFloat(cartData.voucher.Discount_Value))
                        : 0)
                    ).toLocaleString()}đ
                  </span>
                </div>
              </div>
              <button onClick={handleCart}
                      className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 
                               transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                Tiến hành đặt hàng
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
//#endregion

export default CartSidebar;