import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Header from '../../components/Header';
import bannerImage from '../../assets/banner.png';
import CartSidebar from '../../components/CartSidebar';
import menu_1 from '../../assets/menu_1.png';
import menu_2 from '../../assets/menu_2.png';
import menu_3 from '../../assets/menu_3.png';
import menu_4 from '../../assets/menu_4.png';
import menu_5 from '../../assets/menu_5.png';
import menu_6 from '../../assets/menu_6.png';
import menu_7 from '../../assets/menu_7.png';
import menu_8 from '../../assets/menu_8.png';

const Home = () => {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const menuItems = [
    { name: 'Salad', image: menu_1, path: '/menu' },
    { name: 'Rolls', image: menu_2, path: '/menu' },
    { name: 'Deserts', image: menu_3, path: '/menu' },
    { name: 'Sandwich', image: menu_4, path: '/menu' },
    { name: 'Cake', image: menu_5, path: '/menu' },
    { name: 'Pure Veg', image: menu_6, path: '/menu' },
    { name: 'Pasta', image: menu_7, path: '/menu' },
    { name: 'Noodles', image: menu_8, path: '/menu' },
  ];
  const pizzas = [
    {
      name: 'Pizza bò Go Mỹ sốt phô mai ngập vị',
      image: 'https://img.dominos.vn/cheeseburger.jpg',
      price: '265,000₫',
      new: true,
      sale: 'EXTRA 50'
    },
    {
      name: 'Pizza hải sản sốt Pesto "chanh sả"',
      image: 'https://img.dominos.vn/lime.png',
      price: '215,000₫',
      new: false,
      sale: null
    },
    {
      name: 'Pizza ngập vị phô mai hảo hạng',
      image: 'https://img.dominos.vn/CHEESY+MADNESS+NO+NEW+PC.jpg',
      price: '175,000₫',
      new: false,
      sale: null
    },
    {
      name: 'Pizza siêu topping bò và tôm nướng kiểu Mỹ',
      image: 'https://img.dominos.vn/Pizza+Extra+Topping+(4).jpg',
      price: '235,000₫',
      new: false,
      sale: 'EXTRA 50'
    },
  ];

  return (
    <>
      
      <div
        className="banner h-[34vw] my-[30px] mx-auto bg-no-repeat bg-contain relative"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        <div className="absolute flex flex-col items-start gap-[1.5vw] max-w-[50%] bottom-[10%] left-[6vw] animate-[fadeIn_3s] text-white">
          <h2 className="text-[max(4.5vw,22px)] font-medium text-white drop-shadow-lg">
            Order your pizza here
          </h2>
          <p className="text-white text-[1vw]">Choose from menu</p>
          <button 
            onClick={() => navigate('/menu')}
            className="border-none text-black font-medium py-[1vw] px-[2.3vw] bg-white text-[max(1vw,13px)] rounded-[50px]"
          >
            View Menu
          </button>
        </div>
      </div>
      <div className="home-container">
        <div className="container mx-auto flex justify-between">
          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4" // Added margin-right
              src="//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_1.png?1730347951357"
              alt="Giao hàng miễn phí trong 24h"
            />
            <div className="pl-2"> {/* Added padding-left */}
              <p className="font-bold">Giao hàng hỏa tốc</p>
              <p className="text-sm">Nội thành TP. HCM trong 1h</p>
            </div>
          </div>

          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4" // Added margin-right
              src="//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_2.png?1730347951357"
              alt="Giao hàng miễn phí trong 24h"
            />
            <div className="pl-2"> {/* Added padding-left */}
              <p className="font-bold">Sản phẩm luôn mới</p>
              <p className="text-sm">Nhập mới nguyên liệu hàng ngày</p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4"
              src='//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_3.png?1730347951357'
              alt="Hỗ trợ 24/7"

            />
            <div className="pl-2">
              <p className="font-bold">Hỗ trợ 24/7</p>
              <p className="text-sm">Hỗ trợ khách hàng 24/7</p>
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="object-contain w-6 h-6 mr-4" // Added margin-right
              src="//bizweb.dktcdn.net/100/527/383/themes/964940/assets/policies_icon_4.png?1730347951357"
              alt="Giao hàng miễn phí trong 24h"
            />
            <div className="pl-2"> {/* Added padding-left */}
              <p className="font-bold">Deal hot bùng nổ</p>
              <p className="text-sm">Flash sale giảm giá cực sốc</p>
            </div>
          </div>
        </div>

        <div className="container mx-auto flex justify-between mt-10">
          {[
            { code: 'EGA50...', expiry: 'HSD: 28/12/2024', description: 'Giảm 15% cho đơn hàng giá trị tối thiểu 500k. Mã giảm tối đa 25k' },
            { code: 'EGA30...', expiry: 'HSD: 20/02/2024', description: 'Giảm 20k cho đơn hàng giá trị tối thiểu 500k. Mã giảm tối đa 25k' },
            { code: 'FREESH...', expiry: 'HSD: 30/12/2024', description: 'Miễn phí vận chuyển cho đơn hàng tối thiểu 1 triệu. Tối đa 3 mã giảm giá đơn hàng.' },
            { code: '500K...', expiry: 'HSD: 30/12/2024', description: 'Nhận ưu đãi lớn cho đơn hàng từ 500k. Áp dụng cho khu vực Tp.HCM' },
          ].map((coupon, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:bg-yellow-100 w-1/4 m-2 flex flex-col h-[200px]"
            >
              {/* Header */}
              <div className="flex justify-between mb-2">
                <p className="font-bold">Mã: {coupon.code}</p>
                <p className="text-gray-500">{coupon.expiry}</p>
              </div>

              {/* Description with fixed height and overflow handling */}
              <p className="text-sm mb-auto overflow-y-auto flex-1">{coupon.description}</p>

              {/* Button container fixed to bottom */}
              <div className="flex justify-between mt-4 pt-2 border-t">
                <button className="border border-red-500 text-red-500 px-3 py-1 rounded-md hover:bg-red-100">
                  Điều kiện
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600">
                  Sao chép
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="container mx-auto py-8">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-bold text-red-500">Thực đơn nổi bật</h2>
          </div>
          <div className="grid grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => navigate(item.path)}
              >
                <div className="relative rounded-full overflow-hidden w-[150px] h-[150px]"> {/* Reduced size */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black opacity-25 hover:opacity-0 transition-opacity duration-300"></div>
                </div>
                <p className="text-center mt-4 font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container mx-auto py-8">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl mr-40 font-bold mr-4">Hôm Nay Ăn Gì?</h2>
            <h2 className="text-3xl ml-40 font-bold text-red-500 underline">Best Sellers</h2>
          </div>
          <div className="grid grid-cols-4 gap-4"> {/* Sử dụng grid để sắp xếp các pizza */}
            {pizzas.map((pizza, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  <img src={pizza.image} alt={pizza.name} className="w-full h-48 object-cover" />
                  {pizza.new && <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">NEW</div>}
                  {pizza.sale && <div className="absolute bottom-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md">{pizza.sale}</div>}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{pizza.name}</h3>
                  <p className="text-gray-600 text-sm">MEDIUM - {pizza.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <button onClick={() => navigate('/menu')}
            className="bg-orange-400 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">Xem Thêm</button>
          </div>
        </div>
      </div>
      

    </>
  );
};

export default Home;
