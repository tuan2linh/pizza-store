//#region Imports
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { pizzaData } from '../../data/pizzaData';
import { chickenData } from '../../data/chickenData';
import CartSidebar from '../../components/CartSidebar';
import { FaPizzaSlice, FaFish, FaDrumstickBite, FaBacon, FaLeaf, FaList, FaUtensils, FaIceCream, FaCoffee } from 'react-icons/fa';
import { LuBeef } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
import ProductDetailModal from '../../components/ProductDetailModal';
//#endregion

//#region Menu Component
function Menu() {   
    const location = useLocation();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeMainCategory, setActiveMainCategory] = useState(
      location.state?.activeMainCategory || 'pizza'
    );
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    useEffect(() => {
      if (location.state?.activeMainCategory) {
        setActiveMainCategory(location.state.activeMainCategory);
      }
    }, [location.state]);

    // Add this new useEffect for scroll to top
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const handleProductClick = (product, type) => {
        setSelectedProduct({ ...product, productType: type });
        setIsModalOpen(true);
    };

    //#endregion

    //#region Category Definitions
    const mainCategories = {
        pizza: { name: 'Pizza', icon: <FaPizzaSlice /> },
        chicken: { name: 'Gà', icon: <FaDrumstickBite /> },
        pasta: { name: 'Mì Ý', icon: <FaUtensils /> },
        appetizers: { name: 'Khai Vị', icon: <FaUtensils /> },
        desserts: { name: 'Tráng Miệng', icon: <FaIceCream /> },
        drinks: { name: 'Thức Uống', icon: <FaCoffee /> }
    };

    const categories = {
        all: { name: 'Tất Cả', icon: <FaList /> },
        beef: { name: 'Pizza Bò', icon: <LuBeef /> },
        seafood: { name: 'Pizza Hải Sản', icon: <FaFish /> },
        chicken: { name: 'Pizza Gà', icon: <FaDrumstickBite /> },
        pork: { name: 'Pizza Heo', icon: <FaBacon /> },
        vegetarian: { name: 'Pizza Chay', icon: <FaLeaf /> }
    };
    //#endregion

    //#region Helper Functions
    const getAllPizzas = () => {
        if (activeCategory === 'all') {
            return pizzaData.products;
       } 
        return pizzaData.products.filter(pizza => 
            pizza.categories.includes(activeCategory)
        );
    };
    //#endregion

    //#region Section Renderers
    const renderPizzaSection = () => (
        <>
            <div className="flex flex-wrap gap-4 mb-8">
                {Object.entries(categories).map(([key, { name, icon }]) => (
                    <button
                        key={key}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-base ${activeCategory === key
                            ? 'bg-orange-400 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        onClick={() => setActiveCategory(key)}
                    >
                        {icon}
                        {name}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {getAllPizzas().map((pizza) => (
                    <div key={pizza.id} 
                         className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                         onClick={() => handleProductClick(pizza, 'pizza')}>
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={pizza.image}
                                alt={pizza.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{pizza.name}</h3>
                        </div>
                        <div className="p-3 text-center">
                            <div className="text-sm font-bold">
                                <p>Medium - {pizza.prices.medium.toLocaleString()}đ</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );

    const renderChickenSection = () => (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {chickenData.products.map((chicken) => (
                <div key={chicken.id} 
                     className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                     onClick={() => handleProductClick(chicken, 'chicken')}>
                    <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                        <img
                            src={chicken.image}
                            alt={chicken.name}
                            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                    </div>
                    <div className="p-3">
                        <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{chicken.name}</h3>
                        <p className="text-sm text-gray-600 text-center">{chicken.description}</p>
                    </div>
                    <div className="p-3 text-center">
                        <div className="text-sm font-bold">
                            <p>Small - {chicken.prices.small.toLocaleString()}đ</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
    //#endregion

    //#region Main Render
    return (
        <div>
            <div className="sticky top-0 z-50 bg-white">
                <Header onCartClick={handleCartToggle} />
            </div>
            <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap gap-4 mb-8 justify-center">
                    {Object.entries(mainCategories).map(([key, { name, icon }]) => (
                        <button
                            key={key}
                            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold ${activeMainCategory === key
                                ? 'bg-orange-400 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                            onClick={() => setActiveMainCategory(key)}
                        >
                            {icon}
                            {name}
                        </button>
                    ))}
                </div>

                {/* Conditional Rendering of Sections */}
                {activeMainCategory === 'pizza' && renderPizzaSection()}
                {activeMainCategory === 'chicken' && renderChickenSection()}
                {activeMainCategory === 'pasta' && <div>Pasta Section</div>}
                {activeMainCategory === 'appetizers' && <div>Appetizers Section</div>}
                {activeMainCategory === 'desserts' && <div>Desserts Section</div>}
                {activeMainCategory === 'drinks' && <div>Drinks Section</div>}
            </div>
            <ProductDetailModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
    //#endregion
}
//#endregion

export default Menu;