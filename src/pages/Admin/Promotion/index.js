import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Space, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';

// Mock data with new structure
const initialPromotions = [
  {
    name: 'FESTIVE DEAL MUA 2 TẶNG 3',
    image: 'https://img.dominos.vn/promotion+m2t3+-+3%27.png',
    description: [
      'Tặng lên đến 173.000VND với 2 lựa chọn:',
      '* FESTIVE DEAL 1: Mua 1 Pizza size M/L kèm 1 thức uống sẽ được tặng 1 phần MỲ Ý ĐẪM XỐT/ CÁNH GÀ 4PCS + 1 phần Tráng miệng + 1 lon Coca-Cola Zero Sugar.',
      '* FESTIVE DEAL 2: Mua 1 Pizza size M/L kèm 1 thức uống sẽ được tặng 1 phần GÀ VIÊN + 1 phần Tráng miệng + 1 lon Coca-Cola Zero Sugar.',
      '* Áp dụng từ 1/12 đến 31/12/2024 cho hình thức Dùng tại chỗ, Mua mang về hoặc Giao hàng tận nơi.'
    ],
    startDate: '2023-11-01',
    endDate: '2023-11-30',
    targetAudience: 'Khách hàng thân thiết',
    offers: 'Mua 1 tặng 1',
    maxProducts: 50,
    combos: ['FESTIVE DEAL 1', 'FESTIVE DEAL 2']
  },
  {
    name: 'GIẢM 70% CHO PIZZA THỨ 2',
    image: 'https://img.dominos.vn/Family-Combo.png',
    description: ['* Mua 1 Pizza size M/L kèm thức uống lớn bất kỳ hoặc 2 th���c uống nhỏ được giảm 70% cho Pizza thứ 2 (tiết kiệm từ 109.000VND) cùng size có giá bằng hoặc thấp hơn Pizza thứ nhất.',
      '* Áp dụng cho Mua Mang Về & Giao Hàng Tận Nơi tất cả các ngày trong tuần.'
    ],
    startDate: '2023-12-01',
    endDate: '2023-12-31',
    targetAudience: 'Tất cả khách hàng',
    offers: 'Giảm giá 10%',
    maxProducts: 200,
    combos: ['PIZZA SIZE M + 1 NƯỚC LỚN', 'PIZZA SIZE L + 1 NƯỚC LỚN','PIZZA SIZE M + 2 NƯỚC NHỎ','PIZZA SIZE L + 2 NƯỚC NHỎ']
  },
  {
    name: '[SAME PRICE] PIZZA ĐỒNG GIÁ 99.000VND',
    image: 'https://img.dominos.vn/web+sp99.png',
    description: [
      '* Pizza đồng giá 99.000VND (size M) hoặc 149.000VND (size L) khi mua từ 02 Pizza trở lên, áp dụng cho Sausage Kid Mania, Cheesy Chicken Bacon, Veggie Mania, Teriyaki Chicken, Hawaiian, Cheese Mania – Tiết kiệm đến 45%.',
      '+ Thêm 40.000VND/ Pizza để nâng cấp lên dòng Seafood Cravers, Traditional & Meat Lovers.',
      '+ Thêm 60.000VND/ Pizza để nâng cấp lên American Cheeseburger, Habanero Cheeseburger, Seafood Lime Pesto, Super Topping (trừ dòng Super Topping của American Cheeseburger, Habanero Cheeseburger Seafood Lime Pesto, ).',
      `* Áp dụng cho Dùng tại ch���, Mua mang về hoặc Giao hàng tận nơi tại các cửa hàng Domino's được chỉ định.`
    ],
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 20%',
    maxProducts: 100,
    combos: ['PIZZA SIZE M', 'PIZZA SIZE L']
  },
  {
    name: '[FAMILY COMBO] VUI TIỆC CẢ NHÀ CHỈ TỪ 93.000VND/ NGƯỜI',
    image: 'https://img.dominos.vn/web+sp99.png',
    description: [
      '* Combo 279.000VND (Giá gốc: 357.000VND) dành cho 2-3 người gồm 1 Pizza size M bất kỳ + 1 phần Gà Viên Phô Mai Đút Lò + 3 thức uống nhỏ + 1 Voucher 2-tặng-1 Kid Pizza Maker.',
      '* Combo 279.000VND (Giá gốc: 425.000VND) dành cho 2-3 người gồm 1 Pizza size M bất kỳ + 1 phần Khai Vị Tổng Hợp + 1 Chocochips + 3 thức uống nhỏ + 1 Voucher 2-tặng-1 Kid Pizza Maker.',
      '* Combo 399.000VND (Giá gốc: 586.000VND) dành cho 4-5 người gồm 2 Pizza size M bất kỳ + 1 phần Gà Viên Phô Mai Đút Lò + 1 phần Bánh Cuộn Xốt Sô-cô-la + 1 thức uống lớn + 1 Voucher 2-tặng-1 Kid Pizza Maker.',
    ],
    startDate: '2023-10-01',
    endDate: '2023-10-31',
    targetAudience: 'Khách hàng mới',
    offers: 'Giảm giá 20%',
    maxProducts: 100,
    combos: ['COMBO 279.000VND', 'COMBO 309.000VND','COMBO 399.000VND']
  }
];

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    toast.info("👨‍💻 Đang phát triển");
    }, []);

  const columns = [
    { 
      title: 'Name', 
      dataIndex: 'name', 
      key: 'name',
      width: '15%',
      ellipsis: true
    },
    {
      title: 'Descriptions',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
      render: (description) => (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {description?.map((desc, index) => (
            <li key={index} style={{ marginBottom: 4 }}>{desc}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: '15%',
      render: (image) => (
        <img src={image} alt="Promotion" style={{ width: 100, height: 'auto' }} />
      )
    },
    {
      title: 'Combos',
      dataIndex: 'combos',
      key: 'combos',
      width: '20%',
      render: (combos) => (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {combos.map((combo, index) => (
            <li key={index}>{combo}</li>
          ))}
        </ul>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: '10%',
      fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Button 
            icon={<EditOutlined />} 
            type="primary"
            ghost
          />
          <Button 
            icon={<DeleteOutlined />} 
            danger
          />
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    toast.info("👨‍💻 Đang phát triển");
  };

  const handleEdit = (promotion) => {
    toast.info("👨‍💻 Đang phát triển");
  };

  const handleDelete = (id) => {
    toast.info("👨‍💻 Đang phát triển");
  };

  const handleModalOk = () => {
    form.validateFields()
      .then(values => {
        if (editingPromotion) {
            toast.info("👨‍💻 Đang phát triển");
        } else {
            toast.info("👨‍💻 Đang phát triển");
        }
        setIsModalVisible(false);
      });
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={handleAdd}
        >
          Add Promotion
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={promotions} 
        rowKey="id"
        scroll={{ x: 1200 }} 
        bordered
      />

      <Modal
        title={editingPromotion ? 'Edit Promotion' : 'Add Promotion'}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Promotion Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Descriptions">
            <Form.List name="descriptions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                      <Form.Item
                        {...field}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter description" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Description
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Form.Item
            name="image"
            label="Promotion Image URL"
            rules={[
              { required: true, message: 'Please input the image URL!' },
              { type: 'url', message: 'Please enter a valid URL!' }
            ]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>

          <Form.Item label="Combos">
            <Form.List name="combos">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }}>
                      <Form.Item
                        {...field}
                        rules={[{ required: true }]}
                      >
                        <Input placeholder="Enter combo name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Combo
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PromotionManagement;
