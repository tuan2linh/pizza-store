import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { addEmployee } from "../../../services/employeeService"; // Đường dẫn service phù hợp

const AddEmployee = () => {
    const navigate = useNavigate();

    const [newEmployee, setNewEmployee] = useState({
        username: "",
        password: "",
        email: "",
        store_id: "102", // Store ID mặc định
        birth_date: "",
        gender: "",
        phone: "",
        role: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Chỉ validate phone khi nhập ký tự không phải số
        if (name === "phone" && (value === "" || /^[0-9]*$/.test(value))) {
            setNewEmployee({ ...newEmployee, [name]: value });
        } else if (name !== "phone") {
            setNewEmployee({ ...newEmployee, [name]: value });
        }

        // setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate tuổi (18 đến 64)
        const birthDate = new Date(newEmployee.birth_date);
        const age = Math.floor((new Date() - birthDate) / (365.25 * 24 * 60 * 60 * 1000));
        if (age < 18 || age > 64) {
            toast.error("Age must be between 18 and 64 years.");
            return;
        }

        // Validate dữ liệu
        if (
            !newEmployee.username ||
            !newEmployee.password ||
            !newEmployee.email ||
            !newEmployee.birth_date ||
            !newEmployee.gender ||
            !newEmployee.phone ||
            !newEmployee.role
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            const formData = new FormData();
            for (const key in newEmployee) {
                formData.append(key, newEmployee[key]);
            }
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
                        readOnly // Store ID cố định
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100"
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
                    <select
                        name="role"
                        value={newEmployee.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select role</option>
                        <option value="Sales">Sales</option>
                        <option value="Customer Support">Customer Support</option>
                        <option value="Kitchen">Kitchen</option>
                        <option value="Delivery">Delivery</option>
                        <option value="Manager">Manager</option>
                    </select>
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
