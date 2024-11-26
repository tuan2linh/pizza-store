
import React from 'react';

function Order() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Theo dõi đơn hàng</h1>
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <input
              type="text"
              placeholder="Nhập mã đơn hàng..."
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button className="mt-4 w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors">
              Tra cứu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;