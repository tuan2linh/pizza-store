import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import 'chart.js/auto';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('today');
  useEffect(() => {
    toast.info("👨‍💻 Đang phát triển");
    }, []);
  const getStats = () => {
    switch (timeRange) {
      case 'today':
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
      case 'month':
        return [
          { title: 'Tổng số đơn hàng', value: '300', icon: '📦', link: '/admin/orders' },
          { title: 'Thu nhập', value: '45,000,000đ', icon: '💰', link: '/admin/orders' },
          { title: 'Chương trình khuyến mãi', value: '10', icon: '🎉', link: '/admin/promotions', progress: { boughtWithPromotion: 150, totalBought: 300 } },
          { title: 'Voucher phát hành', value: '30', icon: '🎟️', link: '/admin/vouchers', progress: { boughtWithVoucher: 180, totalBought: 300 } },
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

  const getTrendData = () => ({
    labels: ['', '', '', '', '', ''],
    datasets: [{
      data: [65, 59, 80, 81, 56, 75],
      fill: false,
      borderColor: '#10B981',
      tension: 0.4,
      pointRadius: 0
    }]
  });

  const renderStatCard = (stat) => {
    const isIncrease = Math.random() > 0.5; // Demo purpose, replace with real trend data
    const trendPercentage = (Math.random() * 20).toFixed(1); // Demo purpose

    return (
      <div className="bg-white rounded-xl shadow p-6 relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl">{stat.icon}</span>
          {stat.title !== 'Tổng số đơn hàng' && (
            <span className={`flex items-center text-sm ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
              {isIncrease ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
              {trendPercentage}%
            </span>
          )}
        </div>
        
        <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
        <div className="flex items-end justify-between">
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
          {stat.title === 'Thu nhập' && (
            <div className="w-24 h-12">
              <Line
                data={getTrendData()}
                options={{
                  plugins: { legend: { display: false } },
                  scales: { x: { display: false }, y: { display: false } },
                  responsive: true,
                  maintainAspectRatio: true
                }}
              />
            </div>
          )}
        </div>

        {stat.progress && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">
                {stat.title === 'Chương trình khuyến mãi' ? 'Sử dụng KM' : 'Sử dụng voucher'}
              </span>
              <span className="font-medium">
                {((stat.progress.boughtWithPromotion || stat.progress.boughtWithVoucher) / 
                  stat.progress.totalBought * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-500"
                style={{ 
                  width: `${((stat.progress.boughtWithPromotion || stat.progress.boughtWithVoucher) / 
                    stat.progress.totalBought * 100)}%` 
                }}
              />
            </div>
          </div>
        )}

        <Link 
          to={stat.link}
          className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/5 transition-opacity duration-300"
        >
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm">
            Xem chi tiết →
          </span>
        </Link>
      </div>
    );
  };

  const stats = getStats().slice(0, 4); // Only show first 4 stats

  const revenueData = {
    labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    datasets: [
      {
        label: 'Doanh thu',
        data: [5000000, 7000000, 8000000, 7500000, 9000000, 8500000, 10000000, 11000000, 9500000, 12000000, 11500000, 13000000],
        backgroundColor: 'rgba(255, 145, 68, 0.2)',
        borderColor: 'rgb(255, 145, 68)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Chi phí',
        data: [3000000, 4000000, 4500000, 4200000, 5000000, 4800000, 6000000, 6500000, 5500000, 7000000, 6800000, 7500000],
        backgroundColor: 'rgba(99, 147, 235, 0.2)',
        borderColor: 'rgb(99, 147, 235)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }
    ],
  };

  const topProductsData = {
    labels: ['Pizza Hải Sản', 'Pizza Bò', 'Pizza Gà', 'Pizza Chay'],
    datasets: [{
      data: [30, 25, 20, 15],
      backgroundColor: [
        'rgba(255, 145, 68, 0.8)',
        'rgba(99, 147, 235, 0.8)',
        'rgba(52, 211, 153, 0.8)',
        'rgba(251, 146, 60, 0.8)'
      ],
      borderWidth: 0,
      borderRadius: 5,
    }]
  };

  return (
    <>
      <div className="flex justify-between items-center ml-10 mb-3">
        <h1 className="text-2xl text-orange-500 font-bold">Bảng Điều Khiển</h1>
        <select 
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="today">Hôm nay</option>
          <option value="week">Tuần này</option>
          <option value="month">Tháng này</option>
          <option value="year">Năm nay</option>
        </select>
      </div>

      <div className="p-6 w-[90%] mx-auto bg-[#e5e7eb]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => renderStatCard(stat))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Tổng Quan Doanh Thu</h2>
                <p className="text-gray-500 text-sm mt-1">Thống kê theo tháng</p>
              </div>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>Năm 2024</option>
                <option>Năm 2023</option>
              </select>
            </div>
            <Bar 
              data={revenueData} 
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                      boxWidth: 8,
                      usePointStyle: true,
                      pointStyle: 'circle'
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                          label += ': ';
                        }
                        label += new Intl.NumberFormat('vi-VN', { 
                          style: 'currency', 
                          currency: 'VND' 
                        }).format(context.raw);
                        return label;
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return new Intl.NumberFormat('vi-VN', { 
                          style: 'currency', 
                          currency: 'VND',
                          notation: 'compact'
                        }).format(value);
                      }
                    }
                  }
                }
              }}
            />
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold">Sản Phẩm Bán Chạy</h2>
                <p className="text-gray-500 text-sm mt-1">Top 4 sản phẩm bán chạy nhất</p>
              </div>
              <select className="border rounded-lg px-3 py-1 text-sm">
                <option>Tháng này</option>
                <option>3 tháng</option>
                <option>6 tháng</option>
              </select>
            </div>
            <div className="relative" style={{ height: '300px' }}>
              <Doughnut 
                data={topProductsData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  cutout: '60%',
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        boxWidth: 8,
                        usePointStyle: true,
                        pointStyle: 'circle'
                      }
                    }
                  }
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-3xl font-bold">90</p>
                  <p className="text-gray-500 text-sm">Tổng đơn</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Đơn Hàng Gần Đây</h2>
            <Link to="/admin/orders" className="text-orange-500 hover:text-orange-600">
              Xem tất cả
            </Link>
          </div>
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left">Mã đơn</th>
                <th className="px-4 py-2 text-left">Khách hàng</th>
                <th className="px-4 py-2 text-left">Tổng tiền</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Ngày đặt</th>
                <th className="px-4 py-2 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: '#123', customer: 'Nguyễn Văn A', amount: '350.000đ', status: 'Đã giao', date: '01/11/2024' },
                { id: '#122', customer: 'Trần Thị B', amount: '240.000đ', status: 'Đang xử lý', date: '02/11/2024' },
                { id: '#121', customer: 'Lê Văn C', amount: '520.000đ', status: 'Chờ xác nhận', date: '03/11/2024' },
              ].map((order) => (
                <tr key={order.id} className="border-b">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.customer}</td>
                  <td className="px-4 py-2">{order.amount}</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                      order.status === 'Đang xử lý' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.date}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700">Chi tiết</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
