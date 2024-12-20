//#region Imports
import React, { useState, useEffect } from 'react';
import { pizzaDataMock } from '../../data/pizzaData';
import { chickenData } from '../../data/chickenData';
import { FaPizzaSlice, FaFish, FaDrumstickBite, FaBacon, FaLeaf, FaList, FaUtensils, FaIceCream, FaCoffee } from 'react-icons/fa';
import { LuBeef } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
import ProductDetailModal from '../../components/ProductDetailModal';
import { getProduct } from '../../services/productService';
import { useSelector, useDispatch } from "react-redux";
//#endregion

//#region Menu Component
function Menu() {
    const account = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const customer_id = account?.customer_id;
    const location = useLocation();
    const [activeMainCategory, setActiveMainCategory] = useState(
        location.state?.activeMainCategory || 'pizza'
    );
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [pizzaProducts, setPizzaProducts] = useState([]);
    const [chickenProducts, setChickenProducts] = useState([]);
    const [pastaProducts, setPastaProducts] = useState([]);
    const [appetizerProducts, setAppetizerProducts] = useState([]);
    const [dessertProducts, setDessertProducts] = useState([]);
    const [drinkProducts, setDrinkProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (location.state?.activeMainCategory) {
            setActiveMainCategory(location.state.activeMainCategory);
        }
    }, [location.state]);

    // Add this new useEffect for scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    useEffect(() => {
        fetchProduct();
    }, []);

    const handleProductClick = (product, type) => {
        setSelectedProduct({ ...product, productType: type });
        setIsModalOpen(true);
    };
    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const result = await getProduct();
            setProducts(result);
            setPizzaProducts(result.filter(product => product.Menu_Name.toLowerCase() === 'pizza'));
            setChickenProducts(result.filter(product => product.Menu_Name.toLowerCase() === 'chicken'));
            setPastaProducts(result.filter(product => product.Menu_Name.toLowerCase() === 'pasta'));
            setAppetizerProducts(result.filter(product => product.Menu_Name.toLowerCase() === 'appetizers'));
            setDessertProducts(result.filter(product => product.Menu_Name.toLowerCase() === 'desserts'));
            setDrinkProducts(result.filter(product => product.Menu_Name.toLowerCase() === 'drinks'));
        } catch (error) {
            console.error("Failed to get list product:", error);
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    }

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

    const PIZZA_CATEGORY_IDS = {
        beef: [5, 10, 19, 20, 21],
        seafood: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 15],
        chicken: [18],
        pork: [6, 7, 14, 16, 17, 18, 22],
        vegetarian: [23, 24, 22]
    };

    //#endregion

    //#region Helper Functions
    // const getAllPizzas = () => {
    //     const filteredPizzas = products.filter(product => 
    //         product.Menu_Name.toLowerCase() === 'pizza'
    //     );
    //     console.log(filteredPizzas);
    //     setPizzaProducts(filteredPizzas);
    //     return filteredPizzas;
    //     // if (activeCategory === 'all') {
    //     //     return pizzaDataMock.products;
    //     // }
    //     // return pizzaDataMock.products.filter(pizza =>
    //     //     pizza.categories.includes(activeCategory)
    //     // );
    // };
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
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pizzaProducts
                        .filter(pizza => {
                            if (activeCategory === 'all') return true;
                            return PIZZA_CATEGORY_IDS[activeCategory]?.includes(pizza.Product_ID);
                        })
                        .map((pizza) => (
                            <div key={pizza.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                                onClick={() => handleProductClick(pizza, 'pizza')}>
                                <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                                    <img
                                        src={pizza.Image}
                                        alt={pizza.name}
                                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-3">
                                    <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{pizza.Product_Name}</h3>
                                </div>
                                <div className="p-3 text-center">
                                    <div className="text-sm font-bold">
                                        <p>
                                            {(() => {
                                                const smallPrice = pizza.SizeWithPrice?.find(item => item.Size === 'small')?.Price;
                                                const mediumPrice = pizza.SizeWithPrice?.find(item => item.Size === 'medium')?.Price;
                                                const bigSize = pizza.SizeWithPrice?.find(item => item.Size === 'big')?.Price;
                                                const priceToShow = smallPrice || mediumPrice || bigSize || 0;

                                                return parseInt(priceToShow).toLocaleString() + 'đ';
                                            })()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </>
    );

    const renderChickenSection = () => (
        isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {chickenProducts.map((chicken) => (
                    <div key={chicken.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                        onClick={() => handleProductClick(chicken, 'chicken')}>
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={chicken.Image}
                                alt={chicken.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{chicken.Product_Name}</h3>
                            <p className="text-sm text-gray-600 text-center">{chicken.Description}</p>
                        </div>
                        <div className="p-3 text-center">
                            <div className="text-sm font-bold">
                                <p>
                                    {(() => {
                                        const smallPrice = chicken.SizeWithPrice?.find(item => item.Size === 'small')?.Price;
                                        const mediumPrice = chicken.SizeWithPrice?.find(item => item.Size === 'medium')?.Price;
                                        const bigSize = chicken.SizeWithPrice?.find(item => item.Size === 'big')?.Price;
                                        const priceToShow = smallPrice || mediumPrice || bigSize || 0;

                                        return parseInt(priceToShow).toLocaleString() + 'đ';
                                    })()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
    const renderPastaSection = () => (
        isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {pastaProducts.map((pasta) => (
                    <div key={pasta.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                        onClick={() => handleProductClick(pasta, 'pasta')}>
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={pasta.Image}
                                alt={pasta.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{pasta.Product_Name}</h3>
                            <p className="text-sm text-gray-600 text-center">{pasta.Description}</p>
                        </div>
                        <div className="p-3 text-center">
                            <div className="text-sm font-bold">
                                <p>
                                    {(() => {
                                        const smallPrice = pasta.SizeWithPrice?.find(item => item.Size === 'small')?.Price;
                                        const mediumPrice = pasta.SizeWithPrice?.find(item => item.Size === 'medium')?.Price;
                                        const bigSize = pasta.SizeWithPrice?.find(item => item.Size === 'big')?.Price;
                                        const priceToShow = smallPrice || mediumPrice || bigSize || 0;

                                        return parseInt(priceToShow).toLocaleString() + 'đ';
                                    })()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
    const renderAppetizersSection = () => (
        isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {appetizerProducts.map((appetizer) => (
                    <div key={appetizer.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                        onClick={() => handleProductClick(appetizer, 'appetizer')}>
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={appetizer.Image}
                                alt={appetizer.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{appetizer.Product_Name}</h3>
                            <p className="text-sm text-gray-600 text-center">{appetizer.Description}</p>
                        </div>
                        <div className="p-3 text-center">
                            <div className="text-sm font-bold">
                                <p>
                                    {(() => {
                                        const smallPrice = appetizer.SizeWithPrice?.find(item => item.Size === 'small')?.Price;
                                        const mediumPrice = appetizer.SizeWithPrice?.find(item => item.Size === 'medium')?.Price;
                                        const bigSize = appetizer.SizeWithPrice?.find(item => item.Size === 'big')?.Price;
                                        const priceToShow = smallPrice || mediumPrice || bigSize || 0;

                                        return parseInt(priceToShow).toLocaleString() + 'đ';
                                    })()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
    const renderDessertsSection = () => (
        isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {dessertProducts.map((dessert) => (
                    <div key={dessert.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                        onClick={() => handleProductClick(dessert, 'dessert')}>
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={dessert.Image}
                                alt={dessert.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{dessert.Product_Name}</h3>
                            <p className="text-sm text-gray-600 text-center">{dessert.Description}</p>
                        </div>
                        <div className="p-3 text-center">
                            <div className="text-sm font-bold">
                                <p>
                                    {(() => {
                                        const smallPrice = dessert.SizeWithPrice?.find(item => item.Size === 'small')?.Price;
                                        const mediumPrice = dessert.SizeWithPrice?.find(item => item.Size === 'medium')?.Price;
                                        const bigSize = dessert.SizeWithPrice?.find(item => item.Size === 'big')?.Price;
                                        const priceToShow = smallPrice || mediumPrice || bigSize || 0;

                                        return parseInt(priceToShow).toLocaleString() + 'đ';
                                    })()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );
    const renderDrinksSection = () => (
        isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-400"></div>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {drinkProducts.map((drink) => (
                    <div key={drink.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs flex flex-col justify-between h-80 cursor-pointer"
                        onClick={() => handleProductClick(drink, 'drink')}>
                        <div className="relative w-full h-48 bg-gray-100 overflow-hidden group">
                            <img
                                src={drink.Image}
                                alt={drink.name}
                                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                        <div className="p-3">
                            <h3 className="text-lg font-bold mb-1 text-center text-[#0078ae] hover:underline cursor-pointer">{drink.Product_Name}</h3>
                            <p className="text-sm text-gray-600 text-center">{drink.Description}</p>
                        </div>
                        <div className="p-3 text-center">
                            <div className="text-sm font-bold">
                                <p>
                                    {(() => {
                                        const smallPrice = drink.SizeWithPrice?.find(item => item.Size === 'small')?.Price;
                                        const mediumPrice = drink.SizeWithPrice?.find(item => item.Size === 'medium')?.Price;
                                        const bigSize = drink.SizeWithPrice?.find(item => item.Size === 'big')?.Price;
                                        const priceToShow = smallPrice || mediumPrice || bigSize || 0;

                                        return parseInt(priceToShow).toLocaleString() + 'đ';
                                    })()}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )
    );

    //#endregion

    //#region Main Render
    return (
        <div>
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
                {activeMainCategory === 'pasta' && renderPastaSection()}
                {activeMainCategory === 'appetizers' && renderAppetizersSection()}
                {activeMainCategory === 'desserts' && renderDessertsSection()}
                {activeMainCategory === 'drinks' && renderDrinksSection()}
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