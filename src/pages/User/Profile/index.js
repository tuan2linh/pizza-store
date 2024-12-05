import React, { useState, useEffect } from 'react';
import { Tabs, Skeleton, Modal, Form, Input } from 'antd';
import { UserOutlined, HomeOutlined, LockOutlined, PhoneOutlined, MailOutlined, CameraOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
    const account = useSelector((state) => state.user.account);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const customer_id = account?.customer_id;
    const [activeTab, setActiveTab] = useState('1');
    const [loading, setLoading] = useState(false);
    const defaultAvatarUrl = "https://api.dicebear.com/7.x/adventurer/svg?seed=Lucky";
    const defaultCoverUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=400&fit=crop";
    const [userProfile, setUserProfile] = useState([
        {
            fullName: 'Nguyễn Thanh Tùng',
            email: 'thanhtung@hcmut.edu.vn',
            phoneNumber: '0987654321',
            addresses: [
                {
                    id: '1',
                    recipientName: 'Nguyễn Thanh Tùng',
                    recipientEmail: 'thanhtung@hcmut.edu.vn',
                    recipientPhone: '0987654321',
                    address: '123 Đường ABC, Phường XYZ, Quận 1, TP.HCM'
                },
            ]
        }
    ]);
    const [userAddresses, setUserAddresses] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [addressForm] = Form.useForm();
    const [fullName, setFullName] = useState(userProfile?.fullName || '');
    const [phoneNumber, setPhoneNumber] = useState(userProfile?.phoneNumber || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleAddAddress = () => {
        setEditingAddress(null);
        addressForm.resetFields();
        setIsModalVisible(true);
    };

    const handleEditAddress = (address) => {
        setEditingAddress(address);
        addressForm.setFieldsValue({
            address: address.address,
            recipientName: address.recipientName,
            recipientEmail: address.recipientEmail,
            recipientPhone: address.recipientPhone
        });
        setIsModalVisible(true);
    };
    const handleDeleteAddress = async (addressId) => {
        toast.success('Đã xóa địa chỉ thành công');
    };

    const handleModalOk = async () => {
        try {
            const values = await addressForm.validateFields();
            if (editingAddress) {
                toast.success('Đã cập nhật địa chỉ thành công');
            } else {
                toast.success('Đã cập nhật địa chỉ thành công');
            }
            setIsModalVisible(false);
            addressForm.resetFields();
        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    const handleProfileUpdate = async (fullName,phoneNumber) => {           
            toast.success('Đã cập nhật thông tin cá nhân thành công');
    };


    const handleModalCancel = () => {
        setIsModalVisible(false);
        addressForm.resetFields();
    };

    const validateAddress = (_, value) => {
        const addressPattern = /^[^,]+,[^,]+,[^,]+,[^,]+$/;
        if (!value) {
            return Promise.reject('Vui lòng nhập địa chỉ!');
        }
        if (!addressPattern.test(value)) {
            return Promise.reject('Địa chỉ phải theo định dạng: Tên đường, Phường, Quận, Thành phố');
        }
        return Promise.resolve();
    };

    const validatePhone = (_, value) => {
        const phonePattern = /^[0-9]{10}$/;
        if (!value) {
            return Promise.reject('Vui lòng nhập số điện thoại!');
        }
        if (!phonePattern.test(value)) {
            return Promise.reject('Số điện thoại không hợp lệ!');
        }
        return Promise.resolve();
    };

    const validateEmail = (_, value) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            return Promise.reject('Vui lòng nhập email!');
        }
        if (!emailPattern.test(value)) {
            return Promise.reject('Email không hợp lệ!');
        }
        return Promise.resolve();
    };

    const handlePasswordChange = async (e) => {     
        if (newPassword !== confirmPassword) {
            setPasswordError('Mật khẩu mới không khớp!');
            return;
        }
        
        if (newPassword.length < 6) {
            setPasswordError('Mật khẩu mới phải có ít nhất 6 ký tự!');
            return;
        }
        toast.success('Đổi mật khẩu thành công');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        
    };

    const items = [
        {
            key: '1',
            label: (
                <span className="flex items-center text-base hover:text-blue-600 transition-colors">
                    <UserOutlined className="mr-2" />
                    Thông tin cá nhân
                </span>
            ),
            children: (
                <div className="p-8 bg-white rounded-lg shadow-lg transition-all duration-300">
                    <div className="relative mb-12">
                        <div className="h-64 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl overflow-hidden group">
                            <img
                                src={defaultCoverUrl}
                                alt="Cover"
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all">
                                <CameraOutlined className="text-gray-700" />
                            </button>
                        </div>
                        <div className="absolute -bottom-6 left-8 border-4 border-white rounded-full shadow-lg group">
                            <img
                                src={defaultAvatarUrl}
                                alt="Avatar"
                                className="w-32 h-32 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <button className="absolute bottom-0 right-0 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-all">
                                <CameraOutlined className="text-gray-700" />
                            </button>
                        </div>
                    </div>

                    <form className="max-w-lg mx-auto space-y-6">
                        {loading ? (
                            <Skeleton active paragraph={{ rows: 4 }} />
                        ) : (
                            <>
                                <div className="transition-all duration-200 hover:shadow-lg p-6 rounded-xl border bg-white/50 backdrop-blur-sm">
                                    <label className="block text-gray-700 font-medium mb-3 flex items-center">
                                        <UserOutlined className="mr-2 text-blue-500" /> Họ và tên
                                    </label>
                                    <input
                                        type="text"
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
                                        defaultValue={userProfile?.fullName}
                                    />
                                </div>
                                <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg border">
                                    <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                        <MailOutlined className="mr-2" /> Email
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-2 rounded-lg border-2 focus:border-blue-500 focus:outline-none transition-colors"
                                        defaultValue={userProfile?.email}
                                        disabled
                                    />
                                </div>
                                <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg border">
                                    <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                        <PhoneOutlined className="mr-2" /> Số điện thoại
                                    </label>
                                    <input
                                        type="tel"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full px-4 py-2 rounded-lg border-2 focus:border-blue-500 focus:outline-none transition-colors"
                                        defaultValue={userProfile?.phoneNumber}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleProfileUpdate(fullName,phoneNumber)}
                                    className="w-full bg-gradient-to-r from-orange-300 to-orange-400 text-white px-6 py-4 rounded-xl hover:from-orange-400 hover:to-orange-500 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                                >
                                    Cập nhật thông tin
                                </button>
                            </>
                        )}
                    </form>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span>
                    <HomeOutlined className="mr-2" />
                    Địa chỉ
                </span>
            ),
            children: (
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <div className="max-w-lg mx-auto space-y-4">
                        {userAddresses.length === 0 && (
                            <div className="text-center text-gray-500">Chưa có địa chỉ nào</div>
                        )}
                        {userAddresses.map((item, index) => (
                            <div key={item.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                                <h3 className="font-bold mb-2 text-lg">Địa chỉ {index + 1}</h3>
                                <div className="space-y-2">
                                    <div className="flex items-start gap-2">
                                        <UserOutlined className="mt-1 text-blue-500" />
                                        <div>
                                            <div className="font-medium">Người nhận:</div>
                                            <div>{item.recipientName}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <PhoneOutlined className="mt-1 text-green-500" />
                                        <div>
                                            <div className="font-medium">Số điện thoại:</div>
                                            <div>{item.recipientPhone}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MailOutlined className="mt-1 text-orange-500" />
                                        <div>
                                            <div className="font-medium">Email:</div>
                                            <div>{item.recipientEmail}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <HomeOutlined className="mt-1 text-purple-500" />
                                        <div>
                                            <div className="font-medium">Địa chỉ:</div>
                                            <div>{item.address}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 space-x-4 flex justify-end">
                                    <button 
                                        className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                                        onClick={() => handleEditAddress(item)}
                                    >
                                        Chỉnh sửa
                                    </button>
                                    <button 
                                    onClick={() => handleDeleteAddress(item._id)}
                                    className="text-red-500 hover:text-red-700 flex items-center gap-1">
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={handleAddAddress}
                            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold flex items-center justify-center"
                        >
                            <span className="mr-2">+</span> Thêm địa chỉ mới
                        </button>
                    </div>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <span>
                    <LockOutlined className="mr-2" />
                    Đổi mật khẩu
                </span>
            ),
            children: (
                <div className="p-6 bg-white rounded-lg shadow-md">
                    <form className="max-w-lg mx-auto space-y-6">
                        <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg border">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                <LockOutlined className="mr-2" /> Mật khẩu hiện tại
                            </label>
                            <div className="relative">
                                <input
                                    type={showCurrentPassword ? "text" : "password"}
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 focus:border-blue-500 focus:outline-none transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showCurrentPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </button>
                            </div>
                        </div>
                        <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg border">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                <LockOutlined className="mr-2" /> Mật khẩu mới
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 focus:border-blue-500 focus:outline-none transition-colors"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showNewPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </button>
                            </div>
                        </div>
                        <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg border">
                            <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                                <LockOutlined className="mr-2" /> Xác nhận mật khẩu mới
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 focus:border-blue-500 focus:outline-none transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                </button>
                            </div>
                        </div>
                        {passwordError && (
                            <div className="text-red-500 text-sm">{passwordError}</div>
                        )}
                        <button
                            type="button"
                            onClick={handlePasswordChange}
                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold"
                        >
                            Đổi mật khẩu
                        </button>
                    </form>
                </div>
            ),
        },
    ];

    return (
        <div className="container py-12 px-4 min-h-screen bg-gray-50 mx-auto">
            <Tabs
                defaultActiveKey="1"
                items={items}
                onChange={(key) => setActiveTab(key)}
                className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6"
            />
            
            <Modal
                title={editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
                open={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                okText={editingAddress ? "Cập nhật" : "Thêm mới"}
                cancelText="Hủy"
            >
                <Form
                    form={addressForm}
                    layout="vertical"
                    className="mt-4"
                >
                    <Form.Item
                        name="recipientName"
                        label="Tên người nhận"
                        rules={[
                            { required: true, message: 'Vui lòng nhập tên người nhận!' }
                        ]}
                    >
                        <Input placeholder="Nhập tên người nhận" />
                    </Form.Item>

                    <Form.Item
                        name="recipientEmail"
                        label="Email"
                        rules={[
                            { validator: validateEmail }
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        name="recipientPhone"
                        label="Số điện thoại"
                        rules={[
                            { validator: validatePhone }
                        ]}
                    >
                        <Input placeholder="Nhập số điện thoại" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Địa chỉ"
                        rules={[
                            { validator: validateAddress }
                        ]}
                        extra="Định dạng: Tên đường, Phường, Quận, Thành phố"
                    >
                        <Input.TextArea 
                            rows={4}
                            placeholder="Ví dụ: 123 Đường ABC, Phường XYZ, Quận 1, TP.HCM"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Profile;
