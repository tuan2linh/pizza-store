import React from 'react';
import { toast } from 'react-toastify';
import { FaSearchLocation, FaSearch } from 'react-icons/fa';

function Order() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3 flex items-center justify-center gap-2">
            <FaSearchLocation className="text-orange-500" />
            Theo dõi đơn hàng
          </h1>
          <p className="text-gray-600">
            Nhập số điện thoại đặt hàng để kiểm tra trạng thái đơn hàng của bạn
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nhập số điện thoại..."
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-700"
              />
            </div>
            <button 
              onClick={() => toast.info('Chức năng này đang được phát triển')}
              className="mt-4 w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
              Tra cứu đơn hàng
            </button>

            <div className="mt-8 text-center">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/9356/9356230.png"
                alt="Order Tracking" 
                className="w-24 mx-auto opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;