//#region Imports
import React from 'react';
import designer from '../../assets/Designer.png'
import promo from '../../assets/promo.png'
//#endregion

//#region Promotion Data
const promotions = [
  {
    name: 'Khuyến mãi 1',
    description: 'Mô tả chương trình khuyến mãi 1',
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 20%',
    maxProducts: 100,
  },
  {
    name: 'Khuyến mãi 2',
    description: 'Mô tả chương trình khuyến mãi 2',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    targetAudience: 'Khách hàng thân thiết',
    offers: 'Mua 1 tặng 1',
    maxProducts: 50,
  },
  {
    name: 'Khuyến mãi 3',
    description: 'Mô tả chương trình khuyến mãi 3',
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    targetAudience: 'Tất cả khách hàng',
    offers: 'Giảm giá 10%',
    maxProducts: 200,
  },
  {
    name: 'Khuyến mãi 4',
    description: 'Mô tả chương trình khuyến mãi 4',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    targetAudience: 'Khách hàng VIP',
    offers: 'Giảm giá 30%',
    maxProducts: 30,
  },
  {
    name: 'Khuyến mãi 5',
    description: 'Mô tả chương trình khuyến mãi 5',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 15%',
    maxProducts: 150,
  },
];
//#endregion

//#region Promotion Component
function Promotion() {
  //#region State and Handlers
  //#endregion

  //#region Render
  return (
    <>
      <div className="bg-dark bg-cover--black-zone bg-grey-lightes" style={{ backgroundImage: `url(${promo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl"> {/* Changed max-w-xl to max-w-4xl */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Added grid and grid-cols-2 */}
                {promotions.map((promo, index) => (
                  <div key={index} className="bg-white p-2 rounded shadow-lg flex flex-row mb-4">
                    <div className="w-32 bg-gray-200 rounded flex items-center justify-center">
                      <img src={designer} alt="Promotion" className="h-full w-full object-cover rounded" />
                    </div>
                    <div className="flex flex-col ml-4 justify-center">
                      <h2 className="text-xl font-bold mb-2 text-center" style={{ color: '#0078ae' }}>{promo.name}</h2>
                      <p className="mb-2">{promo.description}</p>
                      <p className="mb-2"><strong>Thời gian bắt đầu:</strong> {promo.startDate}</p>
                      <p className="mb-2"><strong>Thời gian kết thúc:</strong> {promo.endDate}</p>
                      <p className="mb-2"><strong>Đối tượng áp dụng:</strong> {promo.targetAudience}</p>
                      <p className="mb-2"><strong>Ưu đãi:</strong> {promo.offers}</p>
                      <p className="mb-2"><strong>Tổng sản phẩm tối đa:</strong> {promo.maxProducts}</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-4 relative">
                        <div className="bg-orange-400 h-4 rounded-full" style={{ width: `${(10 / promo.maxProducts) * 100}%` }}></div>
                        <span className="absolute inset-0 flex items-center justify-center text-xs text-gray">Đã sử dụng 10/{promo.maxProducts}</span>
                      </div>
                      <button className="bg-orange-400 text-white py-2 px-4 rounded mt-4">Sử dụng</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
  //#endregion
}
//#endregion

export default Promotion;