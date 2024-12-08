import { Button, Table, Input, Space, Modal, Tag, message, Card, Row, Col, Statistic, Descriptions, Select } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined, ShoppingCartOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAllOrder, getOrderbyId, updateOrderStatus } from "../../../services/apiService";
import moment from 'moment';

const OrderAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalLoading, setModalLoading] = useState(false);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await getAllOrder();
            // Sort orders by date in descending order
            const sortedOrders = response.sort((a, b) => 
                moment(b.order_date).valueOf() - moment(a.order_date).valueOf()
            );
            setOrders(sortedOrders);
        } catch (error) {
            message.error("Failed to fetch orders");
        }
        setLoading(false);
    };

    const handleDelete = (orderId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this order?',
            content: `Delete order #${orderId}`,
            onOk: () => {
                // Add delete API call here
                message.success('Order deleted successfully');
            }
        });
    };

    const showOrderDetails = async (orderId) => {
        setModalLoading(true);
        setIsModalVisible(true);
        try {
            const response = await getOrderbyId(orderId);
            if (response && response.orderDetails) {
                setSelectedOrder(response);
            } else {
                message.error("Invalid order data received");
            }
        } catch (error) {
            message.error("Failed to fetch order details");
            setIsModalVisible(false);
        } finally {
            setModalLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'gold',
            'Cancelled': 'red',
            'Delivered': 'green',
            'In Progress': 'blue'
        };
        return colors[status] || 'default';
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            const response = await updateOrderStatus(orderId, newStatus);
            console.log(response);
            if (response&& response.message === 'Order status updated successfully'){
                message.success('Order status updated successfully');
                fetchOrders();
            }
            else {
                message.error('Failed to update order status');
            }
        } catch (error) {
            message.error('Failed to update order status');
        }
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'order_id',
            key: 'order_id',
            sorter: (a, b) => a.order_id - b.order_id
        },
        {
            title: 'Date',
            dataIndex: 'order_date',
            key: 'order_date',
            render: (date) => moment(date).format('DD/MM/YYYY HH:mm'),
            sorter: (a, b) => moment(a.order_date).unix() - moment(b.order_date).unix()
        },
        {
            title: 'Customer ID',
            dataIndex: 'Cus_Place_Order',
            key: 'Cus_Place_Order'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Select
                    value={status}
                    style={{ width: 140 }}
                    onChange={(value) => handleStatusChange(record.order_id, value)}
                    options={[
                        { value: 'Pending', label: <Tag color="gold">Pending</Tag> },
                        { value: 'In Progress', label: <Tag color="blue">In Progress</Tag> },
                        { value: 'Delivered', label: <Tag color="green">Delivered</Tag> },
                        { value: 'Cancelled', label: <Tag color="red">Cancelled</Tag> }
                    ]}
                />
            ),
            filters: [
                { text: 'Pending', value: 'Pending' },
                { text: 'In Progress', value: 'In Progress' },
                { text: 'Delivered', value: 'Delivered' },
                { text: 'Cancelled', value: 'Cancelled' }
            ],
            onFilter: (value, record) => record.status === value
        },
        {
            title: 'Total Amount',
            dataIndex: 'finalPrice',
            key: 'finalPrice',
            render: (price) => formatPrice(price),
            sorter: (a, b) => a.finalPrice - b.finalPrice
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => showOrderDetails(record.order_id)}
                    />
                    <Button 
                        icon={<DeleteOutlined />} 
                        danger 
                        onClick={() => handleDelete(record.order_id)}
                    />
                </Space>
            )
        }
    ];

    const filteredOrders = orders.filter(order => 
        order.order_id.toString().includes(searchText) ||
        order.status.toLowerCase().includes(searchText.toLowerCase())
    );

    const getOrderStats = () => {
        const total = orders.length;
        const pending = orders.filter(o => o.status === 'Pending').length;
        const inProgress = orders.filter(o => o.status === 'In Progress').length;
        const delivered = orders.filter(o => o.status === 'Delivered').length;
        const cancelled = orders.filter(o => o.status === 'Cancelled').length;
        return { total, pending, inProgress, delivered, cancelled };
    };

    const stats = getOrderStats();

    return (
        <div style={{ padding: '24px', minHeight: '100vh' }}>
            <Card 
                title={
                    <h2 style={{ 
                        margin: 0, 
                        color: '#1890ff',
                        fontSize: '24px',
                        fontWeight: 'bold' 
                    }}>
                        Order Management
                    </h2>
                }
                style={{ marginBottom: '24px' }}
            >
                <Row gutter={16}>
                    <Col span={4}>
                        <Card>
                            <Statistic
                                title="Total Orders"
                                value={stats.total}
                                prefix={<ShoppingCartOutlined />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card>
                            <Statistic
                                title="Pending Orders"
                                value={stats.pending}
                                prefix={<ClockCircleOutlined />}
                                valueStyle={{ color: '#faad14' }}
                            />
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card>
                            <Statistic
                                title="In Progress"
                                value={stats.inProgress}
                                prefix={<SyncOutlined spin />}
                                valueStyle={{ color: '#1890ff' }}
                            />
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card>
                            <Statistic
                                title="Delivered Orders"
                                value={stats.delivered}
                                prefix={<CheckCircleOutlined />}
                                valueStyle={{ color: '#52c41a' }}
                            />
                        </Card>
                    </Col>
                    <Col span={5}>
                        <Card>
                            <Statistic
                                title="Cancelled Orders"
                                value={stats.cancelled}
                                prefix={<CloseCircleOutlined />}
                                valueStyle={{ color: '#ff4d4f' }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>

            <Card>
                <Space style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                    <Input
                        placeholder="Search orders..."
                        prefix={<SearchOutlined />}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: '300px' }}
                    />
                    <Button type="primary" icon={<ShoppingCartOutlined />}>
                        Add New Order
                    </Button>
                </Space>

                <Table 
                    columns={columns}
                    dataSource={filteredOrders}
                    rowKey="order_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showTotal: (total) => `Total ${total} orders`,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        defaultSortOrder: 'descend'
                    }}
                    style={{ marginTop: '16px' }}
                    scroll={{ x: 'max-content' }}
                />
            </Card>

            <Modal
                title={`Order Details #${selectedOrder?.orderDetails?.order_id || ''}`}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setSelectedOrder(null);
                }}
                footer={[
                    <Button key="close" onClick={() => {
                        setIsModalVisible(false);
                        setSelectedOrder(null);
                    }}>
                        Close
                    </Button>
                ]}
                width={800}
            >
                {modalLoading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        Loading order details...
                    </div>
                ) : selectedOrder?.orderDetails ? (
                    <>
                        <Descriptions title="Order Information" bordered>
                            <Descriptions.Item label="Order Date">
                                {moment(selectedOrder.orderDetails.order_date).format('DD/MM/YYYY HH:mm')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                <Tag color={getStatusColor(selectedOrder.orderDetails.status)}>
                                    {selectedOrder.orderDetails.status}
                                </Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="Customer ID">
                                {selectedOrder.orderDetails.Cus_Place_Order}
                            </Descriptions.Item>
                            <Descriptions.Item label="Delivery Address">
                                {selectedOrder.orderDetails.address}
                            </Descriptions.Item>
                            <Descriptions.Item label="Total Amount">
                                {formatPrice(selectedOrder.orderDetails.OrderTotal)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Final Price">
                                {formatPrice(selectedOrder.orderDetails.finalPrice)}
                            </Descriptions.Item>
                        </Descriptions>

                        <h3 style={{ margin: '20px 0 12px' }}>Order Items</h3>
                        <Table
                            dataSource={selectedOrder.orderItems}
                            pagination={false}
                            columns={[
                                {
                                    title: 'Product Name',
                                    dataIndex: 'Product_Name',
                                    key: 'Product_Name'
                                },
                                {
                                    title: 'Size',
                                    dataIndex: 'size',
                                    key: 'size',
                                    render: (size) => size.charAt(0).toUpperCase() + size.slice(1)
                                },
                                {
                                    title: 'Quantity',
                                    dataIndex: 'quantity',
                                    key: 'quantity'
                                },
                                {
                                    title: 'Price Per Item',
                                    dataIndex: 'price_per_item',
                                    key: 'price_per_item',
                                    render: (price) => formatPrice(price)
                                },
                                {
                                    title: 'Total Price',
                                    dataIndex: 'total_price',
                                    key: 'total_price',
                                    render: (price) => formatPrice(price)
                                }
                            ]}
                        />
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        No order details available
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OrderAdmin;