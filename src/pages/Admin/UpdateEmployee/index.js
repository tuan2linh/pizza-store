import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmployeeByID, updateEmployee } from "../../../services/employeeService";

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Lấy employee_id từ URL

    // State lưu trữ thông tin nhân viên
    const [employee, setEmployee] = useState({
        employee_id: "",
        account_id: "",
        store_id: "",
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra thông tin đầu vào
        if (!employee.store_id || !employee.birth_date || !employee.gender || !employee.role) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Gửi dữ liệu cập nhật về backend
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
                        {/* Store ID */}
                        <div>
                            <label htmlFor="store_id" className="block text-gray-700 font-semibold mb-2">
                                Store ID
                            </label>
                            <input
                                name="store_id"
                                type="number"
                                value={employee.store_id}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter store ID"
                                required
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
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
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter phone number"
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label htmlFor="role" className="block text-gray-700 font-semibold mb-2">
                                Role
                            </label>
                            <input
                                name="role"
                                type="text"
                                value={employee.role}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                placeholder="Enter role (e.g., Manager, Kitchen)"
                                required
                            />
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
