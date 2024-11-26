
import React from 'react';

function Contact() {
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Liên hệ chúng tôi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn cho chúng tôi</h2>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Nội dung"
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-400 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
              >
                Gửi tin nhắn
              </button>
            </form>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="space-y-4">
              <p>
                <strong>Địa chỉ:</strong> 123 Đường ABC, Quận XYZ, TP.HCM
              </p>
              <p>
                <strong>Email:</strong> info@pizzastore.com
              </p>
              <p>
                <strong>Hotline:</strong> 1900 1234
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;