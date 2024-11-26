import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [reportType, setReportType] = useState('day');

  const getStats = () => {
    switch (reportType) {
      case 'day':
        return [
          { title: 'Tổng số đơn hàng', value: '10', icon: '📦', link: '/admin/orders' },
          { title: 'Thu nhập', value: '2,000,000đ', icon: '💰', link: '/admin/orders' },
          { title: 'Chương trình khuyến mãi', value: '10', icon: '🎉', link: '/admin/promotions', progress: { boughtWithPromotion: 5, totalBought: 10 } },
          { title: 'Voucher phát hành', value: '30', icon: '🎟️', link: '/admin/vouchers', progress: { boughtWithVoucher: 15, totalBought: 30 } },
          { title: 'Tổng số sản phẩm', value: '45', icon: '🍕', link: '/admin/products' },
          { title: 'Tổng số người dùng', value: '120', icon: '👥', link: '/admin/customers' },
        ];
      case 'week':
        return [
          { title: 'Tổng số đơn hàng', value: '100', icon: '📦', link: '/admin/orders' },
          { title: 'Thu nhập', value: '20,000,000đ', icon: '💰', link: '/admin/orders' },
          { title: 'Chương trình khuyến mãi', value: '10', icon: '🎉', link: '/admin/promotions', progress: { boughtWithPromotion: 50, totalBought: 100 } },
          { title: 'Voucher phát hành', value: '30', icon: '🎟️', link: '/admin/vouchers', progress: { boughtWithVoucher: 150, totalBought: 300 } },
          { title: 'Tổng số sản phẩm', value: '45', icon: '🍕', link: '/admin/products' },
          { title: 'Tổng số người dùng', value: '120', icon: '👥', link: '/admin/customers' },
        ];
      case 'year':
        return [
          { title: 'Tổng số đơn hàng', value: '40', icon: '📦', link: '/admin/orders' },
          { title: 'Thu nhập', value: '90,000,000đ', icon: '💰', link: '/admin/orders' },
          { title: 'Chương trình khuyến mãi', value: '10', icon: '🎉', link: '/admin/promotions', progress: { boughtWithPromotion: 20, totalBought: 40 } },
          { title: 'Voucher phát hành', value: '30', icon: '🎟️', link: '/admin/vouchers', progress: { boughtWithVoucher: 200, totalBought: 400 } },
          { title: 'Tổng số sản phẩm', value: '45', icon: '🍕', link: '/admin/products' },
          { title: 'Tổng số người dùng', value: '120', icon: '👥', link: '/admin/customers' },
        ];
      default:
        return [];
    }
  };

  const stats = getStats();

  const revenueData = {
    labels: ['01-10', '11-20', '21-30'],
    datasets: [
      {
        label: 'Doanh thu (VND)',
        data: [5000000, 7000000, 8000000],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    <h1 className="text-2xl text-orange-500 font-bold ml-10 mb-3">Dashboard</h1>
    <div className="p-6 w-[90%] mx-auto bg-[#e5e7eb]">
      <div className="flex justify-start mb-4">
        <button onClick={() => setReportType('day')} className={`rounded-l-lg p-2 ${reportType === 'day' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>Day</button>
        <button onClick={() => setReportType('week')} className={` p-2 ${reportType === 'week' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>Week</button>
        <button onClick={() => setReportType('year')} className={`rounded-r-lg p-2 ${reportType === 'year' ? 'bg-orange-500 text-white' : 'bg-gray-200'}`}>Month</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 pb-0">
              <div>
                <p className="text-gray-500 font-bold">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                {stat.progress && (
                  <div className="mt-2">
                    {stat.title == 'Chương trình khuyến mãi' && (
                      <>
                        <p className="text-sm text-gray-500 mt-1">{stat.progress.boughtWithPromotion}/{stat.progress.totalBought} sản phẩm được mua có bao gồm khuyến mãi</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 my-3">
                          <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(stat.progress.boughtWithPromotion / stat.progress.totalBought) * 100}%` }}></div>
                        </div>
                      </>
                    )}
                    {stat.title === 'Voucher phát hành' && (
                      <>
                        <p className="text-sm text-gray-500 mt-1">{stat.progress.boughtWithVoucher}/{stat.progress.totalBought} sản phẩm được mua có bao gồm voucher</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 my-3">
                          <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(stat.progress.boughtWithVoucher / stat.progress.totalBought) * 100}%` }}></div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="ml-2 text-gray-400 text-sm pl-4 pb-3">
              Updated 15 mins ago
            </div>
            <div className="bg-slate-50 px-5 py-4">
              <Link to={stat.link} className="text-blue-500 font-bold tracking-wide relative after:content-[''] after:absolute after:h-px after:w-0 hover:after:w-full after:end-0 hover:after:end-auto after:bottom-0 after:start-0 after:transition-all after:duration-500 after:bg-blue-500">
                View Detail <span>&rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Tháng 11/2024</h2>
          <Bar data={revenueData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Đơn hàng gần đây</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="bg-gray-300 border py-2">Mã đơn</th>
                <th className="bg-gray-300 border py-2">Khách hàng</th>
                <th className="bg-gray-300 border py-2">Giá trị</th>
                <th className="bg-gray-300 border py-2">Ngày đặt</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">#123</td>
                <td className="border px-4 py-2">John Doe</td>
                <td className="border px-4 py-2">$50.00</td>
                <td className="border px-4 py-2">2024-11-01</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">#122</td>
                <td className="border px-4 py-2">Jane Smith</td>
                <td className="border px-4 py-2">$35.00</td>
                <td className="border px-4 py-2">2024-11-02</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">#121</td>
                <td className="border px-4 py-2">Alice Johnson</td>
                <td className="border px-4 py-2">$75.00</td>
                <td className="border px-4 py-2">2024-11-03</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard;
