import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployeeByID, updateEmployee } from "../../../services/employeeService";

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy `id` từ URL

    // State lưu trữ thông tin nhân viên
    const [employee, setEmployee] = useState({
        employee_id: "",
        account_id: "",
        store_id: "102", // Mặc định là 102
        birth_date: "",
        gender: "",
        phone: "",
        role: "",
    });

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    // Fetch thông tin nhân viên khi component được tải
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const employeeData = await getEmployeeByID(id); // Lấy dữ liệu nhân viên từ API
                setEmployee({
                    ...employeeData,
                    birth_date: employeeData.birth_date.split("T")[0], // Chỉ lấy phần ngày
                });
            } catch (error) {
                toast.error("Failed to fetch employee details.");
                console.error(error);
            }
        };
        fetchEmployee();
    }, [id]);

    // Kiểm tra hợp lệ cho trường tuổi
    const isAgeValid = (birth_date) => {
        const today = new Date();
        const birthDate = new Date(birth_date);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1; // Điều chỉnh nếu chưa qua ngày sinh
        }
        return age;
    };

    // Xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra thông tin đầu vào
        const age = isAgeValid(employee.birth_date);
        if (age < 18 || age > 64) {
            toast.error("Employee age must be between 18 and 64 years.");
            return;
        }

        if (!employee.gender || !employee.role) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Gửi dữ liệu cập nhật
        try {
            await updateEmployee(id, employee);
            toast.success("Employee updated successfully!");
            navigate("/admin/employees"); // Điều hướng tới danh sách nhân viên
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while updating the employee.");
        }
    };

    return (
        <section className="p-8 pt-0 relative min-h-screen bg-[#e5e7eb] from-gray-50 to-gray-100">
            <div className="flex justify-center">
                <div className="w-[90%] max-w-4xl">
                    <div className="text-center mb-8">
                        <h2 className="font-bold text-3xl text-gray-800 tracking-tight">Update Employee</h2>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 bg-white p-8 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100"
                    >
                        {/* Store ID (Mặc định 102, không cho chỉnh sửa) */}
                        <div>
                            <label htmlFor="store_id" className="block text-gray-700 font-semibold mb-2">
                                Store ID
                            </label>
                            <input
                                name="store_id"
                                type="text"
                                value={employee.store_id}
                                disabled
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                            />
                        </div>

                        {/* Birth Date */}
                        <div>
                            <label htmlFor="birth_date" className="block text-gray-700 font-semibold mb-2">
                                Birth Date
                            </label>
                            <input
                                name="birth_date"
                                type="date"
                                value={employee.birth_date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-gray-700 font-semibold mb-2">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={employee.gender}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                                Phone
                            </label>
                            <input
                                name="phone"
                                type="text"
                                value={employee.phone}
                                onChange={(e) => {
                                    const regex = /^[0-9]*$/; // Chỉ cho phép số
                                    if (regex.test(e.target.value)) {
                                        handleInputChange(e);
                                    }
                                }}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter phone number"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
                                Role
                            </label>
                            <select
                                name="role"
                                value={employee.role}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="Sales">Sales</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="Kitchen">Kitchen</option>
                                <option value="Delivery">Delivery</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>

                        <div className="flex justify-between items-center pt-6">
                            <Link
                                to="/admin/employees"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 
                                    bg-white border border-blue-600 rounded-lg shadow-md 
                                    hover:bg-blue-600 hover:text-white hover:shadow-lg
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                                    transition-all duration-200"
                            >
                                Back to Employee List
                            </Link>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                            >
                                Update Employee
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateEmployee;
