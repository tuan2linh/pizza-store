import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message, Space, Tag } from 'antd';
import { getAllVoucher, updateVoucherStatus, createVoucher } from "../../../services/apiService";
import moment from 'moment';

const Voucher = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        try {
            const res = await getAllVoucher();
            if (res?.data) {
                setVouchers(res.data);
            }
        } catch (error) {
            console.error("Error fetching vouchers:", error);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active':
                return 'success';
            case 'Disable':
                return 'warning';
            case 'Expired':
                return 'error';
            default:
                return 'default';
        }
    };

    const handleStatusChange = (voucher) => {
        let modalRef = null;
        let selectedStatus = voucher.Status;

        const modal = Modal.confirm({
            title: 'Change Voucher Status',
            icon: null,
            content: (
                <div>
                    <p>Current status: {voucher.Status}</p>
                    <Select
                        defaultValue={voucher.Status}
                        style={{ width: '100%', marginTop: '10px' }}
                        onChange={(value) => selectedStatus = value}
                    >
                        <Select.Option value="Active">Active</Select.Option>
                        <Select.Option value="Disabled">Disabled</Select.Option>
                        <Select.Option value="Expired">Expired</Select.Option>
                    </Select>
                </div>
            ),
            onOk: async () => {
                if (selectedStatus === voucher.Status) {
                    message.info('Status unchanged');
                    return;
                }
                try {
                    const response = await updateVoucherStatus(voucher.Voucher_ID, selectedStatus);
                    console.log(response);
                    const updatedVouchers = vouchers.map(v =>
                        v.Voucher_ID === voucher.Voucher_ID
                            ? { ...v, Status: selectedStatus }
                            : v
                    );
                    setVouchers(updatedVouchers);
                    message.success('Status updated successfully');
                } catch (error) {
                    console.error("Error updating status:", error);
                    message.error('Failed to update status');
                }
            }
        });
    };

    const columns = [
        {
            title: 'Voucher Code',
            dataIndex: 'Voucher_Code',
            key: 'Voucher_Code',
            filteredValue: [searchText],
            onFilter: (value, record) => {
                return record.Voucher_Code.toLowerCase().includes(value.toLowerCase());
            },
        },
        {
            title: 'Discount Type',
            dataIndex: 'Discount_Type',
            key: 'Discount_Type',
        },
        {
            title: 'Discount Value',
            dataIndex: 'Discount_Value',
            key: 'Discount_Value',
        },
        {
            title: 'Start Date',
            dataIndex: 'Start_Date',
            key: 'Start_Date',
            render: (date) => moment(date).format('YYYY-MM-DD'),
            sorter: (a, b) => moment(a.Start_Date).unix() - moment(b.Start_Date).unix(),
        },
        {
            title: 'End Date',
            dataIndex: 'End_Date',
            key: 'End_Date',
            render: (date) => moment(date).format('YYYY-MM-DD'),
        },
        {
            title: 'Max Usage',
            dataIndex: 'Max_Usage',
            key: 'Max_Usage',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'Status',
            render: (status, record) => (
                <Tag 
                    color={getStatusColor(status)}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleStatusChange(record)}
                >
                    {status}
                </Tag>
            ),
            filters: [
                { text: 'Active', value: 'Active' },
                { text: 'Disable', value: 'Disable' },
                { text: 'Expired', value: 'Expired' },
            ],
            onFilter: (value, record) => record.Status === value,
            sorter: (a, b) => a.Status.localeCompare(b.Status),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record)}>Delete</Button>
                </Space>
            ),
        },
    ];

    const handleAdd = () => {
        form.resetFields();
        setIsAddModalOpen(true);
    };

    const handleEdit = (voucher) => {
        setSelectedVoucher(voucher);
        form.setFieldsValue({
            ...voucher,
            Start_Date: moment(voucher.Start_Date),
            End_Date: moment(voucher.End_Date),
        });
        setIsEditModalOpen(true);
    };

    const handleDelete = (voucher) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this voucher?',
            content: `Voucher code: ${voucher.Voucher_Code}`,
            onOk() {
                // Implement delete logic here
                const newVouchers = vouchers.filter(v => v.Voucher_ID !== voucher.Voucher_ID);
                setVouchers(newVouchers);
                message.success('Voucher deleted successfully');
            },
        });
    };

    const handleModalSubmit = async (values) => {
        try {
            if (isAddModalOpen) {
                const voucherData = {
                    code: values.Voucher_Code,
                    discount_type: values.Discount_Type,
                    discount_value: values.Discount_Value.toString(),
                    event_id: 1, // Default event ID, you might want to make this configurable
                    start_date: values.Start_Date.format('YYYY-MM-DD'),
                    end_date: values.End_Date.format('YYYY-MM-DD'),
                    max_usage: values.Max_Usage.toString()
                };

                const response = await createVoucher(voucherData);
                if (response?.success === true) {
                    message.success('Voucher created successfully');
                    setIsAddModalOpen(false);
                    form.resetFields();
                    await fetchVouchers(); // Refresh the voucher list
                }
            } else {
                // Edit logic
                const response = await updateVoucherStatus(selectedVoucher.Voucher_ID, values.Status);
                if (response?.success === true) {
                    message.success('Voucher updated successfully');
                    setIsEditModalOpen(false);
                    form.resetFields();
                    await fetchVouchers(); // Refresh the voucher list
                }
                else {
                    message.error('Failed to update voucher');
                    setIsEditModalOpen(false);
                    form.resetFields();
                }
            }
        } catch (error) {
            console.error("Error handling voucher:", error);
            message.error('Operation failed');
        }
    };

    // Form validation rules
    const formRules = {
        Voucher_Code: [
            { required: true, message: 'Please enter voucher code' },
            { min: 3, message: 'Voucher code must be at least 3 characters' }
        ],
        Discount_Value: [
            { required: true, message: 'Please enter discount value' },
            { 
                validator: (_, value) => {
                    if (value && value >= 0) {
                        return Promise.resolve();
                    }
                    return Promise.reject('Discount value must be positive');
                }
            }
        ],
        Max_Usage: [
            { required: true, message: 'Please enter maximum usage' },
            { 
                validator: (_, value) => {
                    if (value && value >= 0) {
                        return Promise.resolve();
                    }
                    return Promise.reject('Maximum usage must be positive');
                }
            }
        ]
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between' }}>
                <Input.Search
                    placeholder="Search voucher code"
                    style={{ width: 300 }}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                />
                <Button type="primary" onClick={handleAdd}>
                    Add New Voucher
                </Button>
            </div>

            <Table 
                columns={columns} 
                dataSource={vouchers} 
                rowKey="Voucher_ID"
                onChange={(pagination, filters, sorter) => {
                    console.log('Table changed:', { pagination, filters, sorter });
                }}
            />

            <Modal
                title={isAddModalOpen ? "Add New Voucher" : "Edit Voucher"}
                open={isAddModalOpen || isEditModalOpen}
                onCancel={() => {
                    setIsAddModalOpen(false);
                    setIsEditModalOpen(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form
                    form={form}
                    onFinish={handleModalSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="Voucher_Code"
                        label="Voucher Code"
                        rules={formRules.Voucher_Code}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Discount_Type"
                        label="Discount Type"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="Fixed">Fixed</Select.Option>
                            <Select.Option value="Percent">Percent</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="Discount_Value"
                        label="Discount Value"
                        rules={formRules.Discount_Value}
                    >
                        <Input type="number" min={0} />
                    </Form.Item>
                    <Form.Item
                        name="Max_Usage"
                        label="Max Usage"
                        rules={formRules.Max_Usage}
                    >
                        <Input type="number" min={0} />
                    </Form.Item>
                    <Form.Item
                        name="Start_Date"
                        label="Start Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="End_Date"
                        label="End Date"
                        rules={[{ required: true }]}
                    >
                        <DatePicker />
                    </Form.Item>
                    <Form.Item
                        name="Status"
                        label="Status"
                        rules={[{ required: true }]}
                    >
                        <Select>
                            <Select.Option value="Active">Active</Select.Option>
                            <Select.Option value="Disable">Disable</Select.Option>
                            <Select.Option value="Expired">Expired</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isAddModalOpen ? 'Add' : 'Save'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Voucher;