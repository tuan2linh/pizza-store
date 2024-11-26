
import React, { useState } from 'react';
import { stores, districts } from '../data/storeData';

function Stores() {
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const filteredStores = selectedDistrict === 'all'
    ? stores
    : stores.filter(store => store.district === selectedDistrict);

  return (
    <>
      <div className="py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Hệ Thống Cửa Hàng</h1>
        
        <div className="mb-6">
          <select 
            className="w-full md:w-64 p-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="all">Tất cả quận</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStores.map(store => (
            <div key={store.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-2">{store.name}</h2>
              <div className="space-y-2">
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{store.address}, {store.district}</span>
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{store.phone}</span>
                </p>
                <p className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{store.hours}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Stores;