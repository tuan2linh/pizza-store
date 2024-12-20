
import React, { useState, useEffect } from 'react';
import { getCart, addProductToCart } from '../../services/apiService';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductDetailModal({ product, isOpen, onClose }) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user.account);
  const customer_id = account?.customer_id;
  const [size, setSize] = useState('small');
  const [cheeseOption, setCheeseOption] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const isPizza = product?.Menu_Name === 'pizza';

  useEffect(() => {
    const hasSmallSize = product?.SizeWithPrice?.some(item => item.Size === 'small');
    if (!hasSmallSize) {
        setSize('medium');
    }
}, [product]);

  if (!isOpen || !product) return null;

  const handleSizeChange = (event) => setSize(event.target.value);
  const handleCheeseOptionChange = (event) => {
    const value = Number(event.target.value);
    setCheeseOption(cheeseOption === value ? 0 : value);
  };
  const handleQuantityChange = (event) => {
    const value = event.target.value;
    // Only allow numeric values
    if (/^\d*$/.test(value)) {
      setQuantity(Number(value) || 1);
    }
  };
  const handleNotesChange = (event) => setNotes(event.target.value);

  const getCheeseOptionPrice = (option) => {
    if (option === 0) return 0;
    const cheesePrices = {
      small: { 25000: 25000, 40000: 40000, 60000: 60000 },
      medium: { 25000: 30000, 40000: 50000, 60000: 70000 },
      big: { 25000: 35000, 40000: 60000, 60000: 85000 },
    };
    return cheesePrices[size][option];
  };

  const getTotalPrice = () => {
    if (isPizza) {
      const basePrice = product.SizeWithPrice?.find(item => item.Size === size)?.Price || 0;
      const totalPrice = (basePrice + getCheeseOptionPrice(cheeseOption)) * quantity;
      return totalPrice.toLocaleString();
    } else {
      return (product.SizeWithPrice?.find(item => item.Size === size)?.Price || 0) * quantity;
    }
  };

  const handleAddToCart = async () => {
    if (!customer_id) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
      return;
    }
    const data = {
      customer_id,
      product_id: product.Product_ID,
      quantity,
      size,
    };
    try {
      const response = await addProductToCart(data);
      toast.success('Thêm sản phẩm vào giỏ hàng thành công');
      onClose();
    } catch (error) {
      toast.error('Thêm sản phẩm vào giỏ hàng thất bại');
      console.error('Add product to cart error:', error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-xl z-10 max-w-2xl w-full relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row p-4">
          <div className="md:w-2/5">
            <img
              src={product.Image}
              alt={product.name}
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
          <div className="md:w-3/5 pl-5 pt-3 pr-2 pb-4">
            <h2 className="text-2xl font-bold text-[#0078ae] mb-4">{product.Product_Name}</h2>
            <p className="text-xs text-gray-500 mb-4 font-bold">{product.Description}</p>
            <hr className="my-4 w-1/2" />
            <div className="space-y-4">
              {isPizza && (
                <>
                  {/* Size selection section */}
                  <div>
                    <h3 className="font-bold text-base mb-2">Chọn Cỡ bánh:</h3>
                    <div className="space-y-2 font-bold text-sm text-gray-500 pl-3 pt-2">
                      {product.SizeWithPrice?.find(item => item.Size === 'small') && (
                        <div className='border-b pb-2'>
                          <label>
                            <input type="radio" value="small" checked={size === 'small'} onChange={handleSizeChange} />
                            <span className='p-4'> Cỡ Nhỏ = {product.SizeWithPrice?.find(item => item.Size === 'small')?.Price.toLocaleString()}đ </span>
                          </label>
                        </div>
                      )}
                      {product.SizeWithPrice?.find(item => item.Size === 'medium') && (
                        <div className='border-b pb-2'>
                          <label>
                            <input type="radio" value="medium" checked={size === 'medium'} onChange={handleSizeChange} className="" />
                            <span className='p-4'>Cỡ Vừa = {product.SizeWithPrice?.find(item => item.Size === 'medium')?.Price.toLocaleString()}đ</span>
                          </label>
                        </div>
                      )}
                      {product.SizeWithPrice?.find(item => item.Size === 'big') && (
                        <div className='border-b pb-2'>
                          <label>
                            <input type="radio" value="big" checked={size === 'big'} onChange={handleSizeChange} className="" />
                            <span className='p-4'>Cỡ To = {product.SizeWithPrice?.find(item => item.Size === 'big')?.Price.toLocaleString()}đ </span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Cheese options section */}
                  <div>
                    <h3 className="font-bold text-base mb-2">Tùy chọn thêm:</h3>
                    <div className="space-y-2 font-bold text-sm text-gray-500 pl-3 pt-2">
                      <div className='border-b pb-2 mt-2'>
                        <label>
                          <input
                            type="checkbox"
                            value={25000}
                            checked={cheeseOption === 25000}
                            onChange={handleCheeseOptionChange}
                            className=""
                          />
                          <span className='p-4'>Thêm Phô Mai = {getCheeseOptionPrice(25000).toLocaleString()}đ</span>
                        </label>
                      </div>
                      <div className='border-b pb-2 mt-2'>
                        <label>
                          <input
                            type="checkbox"
                            value={40000}
                            checked={cheeseOption === 40000}
                            onChange={handleCheeseOptionChange}
                            className="border-b"
                          />
                          <span className='p-4'>Gấp đôi Phô mai = {getCheeseOptionPrice(40000).toLocaleString()}đ</span>
                        </label>
                      </div>
                      <div className='border-b pb-2 mt-2'>
                        <label>
                          <input
                            type="checkbox"
                            value={60000}
                            checked={cheeseOption === 60000}
                            onChange={handleCheeseOptionChange}
                            className="border-b"
                          />
                          <span className='p-4'>Gấp 3 Phô mai = {getCheeseOptionPrice(60000).toLocaleString()}đ</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              {/* Notes and quantity section */}
              <div>
                <h3 className="font-bold text-base mb-2">Lưu ý đơn hàng:</h3>
                <textarea
                  className="w-full p-2 border rounded"
                  value={notes}
                  onChange={handleNotesChange}
                />
              </div>
              <div className="flex items-center justify-start gap-4">
                <div className="flex items-center h-8 mr-2">
                  <button
                    className="w-10 h-full bg-gray-300 border flex items-center justify-center hover:bg-gray-400"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    className="w-10 h-full bg-gray-200 border text-center"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <button
                    className="w-10 h-full bg-gray-300 border flex items-center justify-center hover:bg-gray-400"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-orange-500 text-xs font-bold text-white px-4 h-8 rounded hover:bg-orange-600 flex-shrink-0 "
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng ({getTotalPrice()}đ)
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailModal;