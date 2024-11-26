import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pizzaData } from '../../data/pizzaData';
import { cartItems } from '../../data/cartItems'; // Import cartItems
import order1 from '../../assets/order1.png';
import order2 from '../../assets/order2.png';

const Cart = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const recommendedItems = pizzaData.products.slice(0, 10); // Move this line to the top
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recommendedItems.length);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recommendedItems.length) % recommendedItems.length);
  };
  const getRecommendedItems = () => {
    const start = currentIndex;
    const end = (currentIndex + 3) % recommendedItems.length;
    if (start < end) {
      return recommendedItems.slice(start, end);
    } else {
      return [...recommendedItems.slice(start), ...recommendedItems.slice(0, end)];
    }
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    navigate('/payment');
  };

  return (
    <>
      <div className="container mx-auto py-8 flex justify-center relative">
        <div className="hidden xl:block absolute left-0 top-0 h-full w-1/6">
          <img src={order1} alt="Left Banner" className="w-full h-full object-cover" />
        </div>
        <div className="w-full max-w-3xl z-10 xl:mx-8">
          <h1 className="text-2xs font-bold mb-4 text-left">Giỏ Hàng Của Bạn</h1>
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 flex flex-col items-center w-full">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center mb-4 w-full">
                <div className="w-36 h-28 mr-4 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium mb-2 flex-1">{item.name}</h3>
                    <span className="text-lg font-medium mx-4">{item.price.toLocaleString('vi-VN')}₫</span>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button className="px-2 py-1">-</button>
                      <span className="px-2">{item.quantity}</span>
                      <button className="px-2 py-1">+</button>
                    </div>
                  </div>
                  <ul className="text-xs text-[#6c757d] font-bold">
                    {item.options.map((option, index) => (
                      <li key={index}>- {option}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 mb-6 w-2/3 ml-auto">
            <div className="flex items-center mb-4">
              <input type="text" className="border-blue-300 border-b py-2 px-3 w-full focus:border focus:border-blue-500 placeholder-gray-600 font-bold text-xs" placeholder="Nhập Mã Khuyến Mãi" style={{ height: '42px' }} />
              <div className='w-1/3'>
                <button className="bg-[#0078ae] hover:bg-[#005f8a] text-xs text-white font-bold rounded-r flex items-center justify-center w-full" style={{ height: '42px' }}>Áp Dụng</button>
              </div>
            </div>
            <div className="flex justify-between mb-2 font-bold text-[#6c757d] text-xs">
              <span>Tổng</span>
              <span className='text-black' >{totalPrice.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between mb-2 font-bold text-[#6c757d] text-xs">
              <span>Giảm K.Mãi</span>
              <span className="text-red-600">0₫</span>
            </div>
            <div className="flex justify-between mb-2 font-bold text-[#6c757d] text-xs">
              <span>Giảm Voucher</span>
              <span className="text-red-600">0₫</span>
            </div>
            <div className="flex justify-between mb-2 font-bold text-[#6c757d] text-xs ">
              <span>Phí Giao Hàng</span>
              <span className="text-red-600">0₫</span>
            </div>
            <button 
              onClick={handlePayment}
              className="bg-orange-400 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4 w-full"
            >
              Thanh Toán {totalPrice.toLocaleString('vi-VN')}₫
            </button>
          </div>
          <div className="recommend mt-8 rounded-lg p-3 border border-blue-500">
            <h2 className="text-lg font-medium mb-0 text-center">Có Thể Bạn Sẽ Thích</h2>
            <div className="relative">
              <button onClick={handlePrev} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">‹</button>
              <div className="flex overflow-hidden m-2">
                {getRecommendedItems().map((item, index) => (
                  <div key={index} className="flex-shrink-0 w-1/3 p-2">
                    <div className="p-4 flex flex-col justify-between h-full min-h-[300px]">
                      <div>
                        <img src={item.image} alt={item.name} className="w-full h-36 object-cover rounded mb-2" />
                        <h3 className="text-sm font-medium text-[#0078ae] h-12 overflow-hidden">{item.name}</h3>
                      </div>
                      <div className="mt-auto text-center">
                        <span className="text-xs text-[#6c757d] font-bold block mt-0 mb-4">{item.prices.medium.toLocaleString('vi-VN')}₫</span>
                        <button className="bg-orange-400 hover:bg-orange-500 text-white text-xs font-bold py-1 px-2 rounded">Thêm vào Giỏ Hàng</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={handleNext} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full">›</button>
            </div>
          </div>
        </div>
        <div className="hidden xl:block absolute right-0 top-0 h-full w-1/6">
          <img src={order2} alt="Right Banner" className="w-full h-full object-cover" />
        </div>
      </div>
    </>
  );
}

export default Cart;