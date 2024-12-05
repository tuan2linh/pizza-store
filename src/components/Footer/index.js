//#region Imports
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { toast } from 'react-toastify';
//#endregion

//#region Footer Component
const Footer = () => {
    //#region Render
    return (
        <footer className="bg-gray-800 text-white py-8" style={{ backgroundImage: 'url(/path/to/background-image.jpg)', backgroundSize: 'cover' }}>
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left px-4 md:px-0">
                {/* <div className="mb-4 md:mb-0">
                    <img src={logo} alt="Pizza Store Logo" className="mx-auto md:mx-0 mb-2 w-[200px]" />
                </div> */}
                <div className="mb-4 md:mb-0 bg-red-700 p-4 rounded-lg">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-bold">Ưu đãi đặc biệt!</h3>
                            <p className="whitespace-nowrap">Giảm 20% cho đơn hàng đầu tiên của bạn</p>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <input 
                                type="email" 
                                placeholder="Nhập email của bạn" 
                                className="w-full md:w-64 p-2 rounded text-gray-800" 
                            />
                            <button 
                            onClick={() => toast.info(`Tính năng này hiện đang được phát triển`)}
                            className="bg-white text-red-700 px-4 py-2 rounded hover:bg-gray-100 transition-colors whitespace-nowrap">
                            Nhận giảm giá
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mb-4 md:mb-0">
                    <p>Contact us: (123) 456-7890</p>
                    <p>Email: info@pizzastore.com</p>
                </div>
                <div className="flex flex-col md:flex-row justify-center md:justify-start space-y-2 md:space-y-0 md:space-x-4">
                    <a href="/about" className="hover:underline">About Us</a>
                    <a href="/menu" className="hover:underline">Menu</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                </div>
                <div className="flex justify-center md:justify-start space-x-4 mt-4 md:mt-0">
                    <FaFacebook />
                    <FaTwitter />
                    <FaInstagram />
                </div>
            </div>
        </footer>
    );
    //#endregion
}
//#endregion

export default Footer;