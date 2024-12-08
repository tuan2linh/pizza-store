import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../../services/employeeService"; // Đường dẫn service phù hợp

const AddEmployee = () => {
    const navigate = useNavigate();

    // State lưu trữ thông tin nhân viên mới
    const [newEmployee, setNewEmployee] = useState({
        username: "",
        password: "",
        email: "",
        store_id: "",
        birth_date: "",
        gender: "",
        phone: "",
        role: "",
    });

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra dữ liệu đầu vào
        if (
            !newEmployee.username ||
            !newEmployee.password ||
            !newEmployee.email ||
            !newEmployee.store_id ||
            !newEmployee.birth_date ||
            !newEmployee.gender ||
            !newEmployee.phone ||
            !newEmployee.role
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Tạo FormData để gửi dữ liệu
        const formData = new FormData();
        formData.append("username", newEmployee.username);
        formData.append("password", newEmployee.password);
        formData.append("email", newEmployee.email);
        formData.append("store_id", newEmployee.store_id);
        formData.append("birth_date", newEmployee.birth_date);
        formData.append("gender", newEmployee.gender);
        formData.append("phone", newEmployee.phone);
        formData.append("role", newEmployee.role);

        try {
            // Gọi API thêm nhân viên
            await addEmployee(formData);
            toast.success("Employee added successfully!");
            navigate("/admin/employees");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while adding the employee.");
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Add New Employee</h1>
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
                {/* Username */}
                <div>
                    <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                        Username
                    </label>
                    <input
                        name="username"
                        type="text"
                        value={newEmployee.username}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter username"
                        required
                    />
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={newEmployee.password}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter password"
                        required
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={newEmployee.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                        required
                    />
                </div>

                {/* Store ID */}
                <div>
                    <label htmlFor="store_id" className="block text-gray-700 font-semibold mb-2">
                        Store ID
                    </label>
                    <input
                        name="store_id"
                        type="text"
                        value={newEmployee.store_id}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                        value={newEmployee.birth_date}
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
                        value={newEmployee.gender}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select gender</option>
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
                        value={newEmployee.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                        required
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
                        value={newEmployee.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter role (e.g., Kitchen)"
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
                    >
                        Add Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
