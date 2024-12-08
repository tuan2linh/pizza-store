//#region Imports
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import LoginModal from "../Login";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import { getLoyalPoint } from "../../services/apiService";
//#endregion

//#region Constants
const MENU_ITEMS = [
  { id: 1, name: "Pizza", link: "/menu/pizza" },
  { id: 2, name: "Gà", link: "/menu/chicken" },
  { id: 3, name: "Mỳ Ý", link: "/menu/pasta" },
  { id: 4, name: "Khai Vị", link: "/menu/appetizer" },
  { id: 5, name: "Tráng Miệng", link: "/menu/dessert" },
  { id: 6, name: "Thức Uống", link: "/menu/drinks" },
];

const NAV_ITEMS = [
  { id: 1, name: "Trang chủ", link: "/" },
  { id: 2, name: "Thực đơn", link: "/menu", hasSubmenu: true },
  { id: 3, name: "Chương trình khuyến mãi", link: "/promotion" },
  { id: 4, name: "Theo dõi đơn hàng", link: "/order" },
  { id: 5, name: "Liên hệ chúng tôi", link: "/contact" },
];

const CATEGORY_MAPPING = {
  '/menu/chicken': 'chicken',
  '/menu/pizza': 'pizza',
  '/menu/pasta': 'pasta',
  '/menu/appetizer': 'appetizers',
  '/menu/dessert': 'desserts',
  '/menu/drinks': 'drinks'
};
//#endregion

function Header({ onCartClick }) {
  //#region State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  //#endregion

  //#region Hooks
  const account = useSelector((state) => state.user.account);
  const isAuthenticated = account?.isAuthenticated;
  const customer_id = account?.customer_id;
  const timeoutId = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      fetchLoyaltyPoints();
    }
  }, [isAuthenticated]);

  const fetchLoyaltyPoints = async () => {
    try {
      const response = await getLoyalPoint();
      setLoyaltyPoints(response.data.loyalty_points);
    } catch (error) {
      console.error('Error fetching loyalty points:', error);
    }
  };
  //#endregion

  //#region Event Handlers
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  const handleAccountClick = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(doLogout());
    setIsAccountDropdownOpen(false);
    toast.success('Đăng xuất thành công');
    navigate('/');
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMouseLeave = () => {
    timeoutId.current = setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handleMouseEnter = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    setIsOpen(true);
  };

  const handleSubmenuClick = (categoryKey) => {
    navigate('/menu', {
      state: { activeMainCategory: CATEGORY_MAPPING[categoryKey] }
    });
    setIsOpen(false);
  };
  //#endregion

  //#region Render Sections
  const renderTopSection = () => (
    <section className="md:flex lg:items-center relative py-3 lg:px-10 px-4 border-gray-200 border-b bg-white lg:min-h-[80px] max-lg:min-h-[60px]">
      <div
        onClick={() => navigate("/")}
        className="max-sm:w-full max-sm:mb-3 shrink-0 cursor-pointer"
      >
        <img src={logo} alt="logo" className="w-[160px]" />
      </div>

      <div className="flex flex-wrap w-full items-center">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="xl:w-96 max-lg:w-full lg:ml-10 max-md:mt-4 max-lg:ml-4 bg-gray-100 focus:bg-transparent px-6 rounded h-11 outline-[#333] text-sm transition-all"
        />
        <div className="ml-auto max-lg:mt-4">
          <ul className="flex items-center">
            <li className="max-sm:hidden flex text-[15px] max-lg:py-2 px-3 font-bold text-[#333] cursor-pointer"
              onClick={() => navigate('/stores')}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Hệ thống cửa hàng
            </li>
            <li className="max-sm:hidden flex text-[15px] max-lg:py-2 px-3 font-bold text-[#333] cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                className="mr-2"
                viewBox="0 0 512 511"
              >
                <path
                  d="M497 193.3h-40.168c-1.215 0-2.418.052-3.613.13-9.024-8.051-19.004-14.7-29.68-19.82 24.348-17.294 40.262-45.712 40.262-77.778C463.8 43.266 421.035.5 368.469.5c-52.57 0-95.336 42.766-95.336 95.332 0 25.262 9.883 48.258 25.976 65.332h-70.148c16.094-17.074 25.973-40.07 25.973-65.332C254.934 43.266 212.168.5 159.602.5c-52.567 0-95.336 42.766-95.336 95.332 0 29.48 13.453 55.875 34.539 73.379-14.602 5.457-28.149 13.617-40.028 24.219a55.211 55.211 0 0 0-3.609-.13H15c-8.285 0-15 6.716-15 15v80.333c0 8.285 6.715 15 15 15h1.066v113.535c0 8.281 6.715 15 15 15h449.868c8.285 0 15-6.719 15-15V303.633H497c8.285 0 15-6.715 15-15V208.3c0-8.285-6.715-15-15-15zm-15 80.333h-25.168c-13.875 0-25.168-11.29-25.168-25.168 0-13.875 11.293-25.164 25.168-25.164H482zM303.133 95.832c0-36.023 29.308-65.332 65.332-65.332 36.023 0 65.336 29.309 65.336 65.332 0 36.027-29.309 65.332-65.332 65.332-36.028 0-65.336-29.305-65.336-65.332zM159.602 30.5c36.023 0 65.332 29.309 65.332 65.332 0 36.023-29.309 65.332-65.332 65.332-36.028 0-65.336-29.305-65.336-65.332 0-36.023 29.308-65.332 65.336-65.332zM30 223.3h25.168c13.875 0 25.168 11.29 25.168 25.169 0 13.875-11.293 25.164-25.168 25.164H30zm16.066 80.333h9.102c30.418 0 55.168-24.746 55.168-55.168 0-16.844-7.602-31.942-19.54-42.067h.356c15.504-9.918 33.535-15.23 52.383-15.23h142.887C258.664 214.566 241 249.574 241 288.633v113.535H110.332v-65.336c0-8.281-6.715-15-15-15-8.281 0-15 6.719-15 15v65.332H46.066zm419.868 98.531h-34.27v-65.332c0-8.281-6.715-15-15-15-8.281 0-15 6.719-15 15v65.332H271V288.633c0-53.742 43.723-97.465 97.469-97.465 18.933 0 37.039 5.36 52.582 15.36-11.852 10.128-19.383 25.163-19.383 41.94 0 30.419 24.746 55.165 55.168 55.165h9.098zm0 0"
                  data-original="#000000"
                />
              </svg>
              Hotline: 1900 1234
            </li>
            <li className="max-lg:py-2 px-3 cursor-pointer">
              <span className="relative">
                <button
                 onClick={isAuthenticated ? onCartClick : () => toast.warning('Vui lòng đăng nhập để sử dụng giỏ hàng')}
                  className="your-existing-cart-button-classes"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    className="inline"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                      data-original="#000000"
                    ></path>
                  </svg>
                  <span className="absolute left-auto -ml-1 -top-1 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                    x
                  </span>
                </button>
              </span>
            </li>
            <li className="flex text-[15px] max-lg:py-2 px-3 hover:text-[#007bff] hover:fill-[#007bff]">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={handleAccountClick}
                    className="mr-8 px-4 py-2 text-sm font-semibold text-[#333] flex items-center hover:bg-gray-100 rounded-lg"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {account.username}
                  </button>
                  {isAccountDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                      <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-orange-100 hover:text-orange-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Thông tin
                      </a>
                      <div className="block px-4 py-2 text-gray-800 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                        </svg>
                        Điểm thưởng: <span className="font-semibold ml-1">{loyaltyPoints}</span>
                      </div>
                      <a href="/orders" className="block px-4 py-2 text-gray-800 hover:bg-orange-100 hover:text-orange-500 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        Đơn hàng
                      </a>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-orange-100 hover:text-orange-500 flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-4 py-2 text-sm rounded-full font-semibold text-[#333] border-2 border-orange-500 bg-transparent hover:bg-yellow-100 transition-colors duration-300"
                >
                  Đăng nhập
                </button>
              )}
            </li>
            <li id="toggleOpen" className="lg:hidden">
              <button onClick={handleMenuToggle}>
                <svg
                  className="w-7 h-7"
                  fill="#333"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );

  const renderNavigationMenu = () => (
    <div id="collapseMenu" className={`${isMenuOpen ? "block" : "max-lg:hidden"} lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50`}>
      <button
        id="toggleClose"
        onClick={handleMenuToggle}
        className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 fill-black"
          viewBox="0 0 320.591 320.591"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          ></path>
        </svg>
      </button>

      <ul className="lg:flex lg:flex-wrap lg:items-center lg:justify-center px-10 py-3 bg-orange-400 min-h-[46px] gap-4 max-lg:space-y-4 max-lg:fixed max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
        <li className="mb-6 hidden max-lg:block">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <img
              src="https://readymadeui.com/readymadeui-white.svg"
              alt="logo"
              className="w-36"
            />
          </div>
        </li>
        {NAV_ITEMS.map((item) => (
          <li
            key={item.id}
            className="max-lg:border-b max-lg:py-3 px-3 relative"
            onMouseEnter={item.hasSubmenu ? handleMouseEnter : undefined}
            onMouseLeave={item.hasSubmenu ? handleMouseLeave : undefined}
          >
            <div
              onClick={() => navigate(item.link)}
              className={`hover:text-yellow-300 ${location.pathname === item.link
                  ? "text-yellow-300"
                  : "text-white"
                } text-[15px] font-bold block cursor-pointer`}
            >
              {item.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  //#endregion

  return (
    <>
      <header className="shadow-md font-[sans-serif] tracking-wide relative z-50">
        {renderTopSection()}
        {renderNavigationMenu()}
      </header>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
    </>
  );
}

export default Header;
