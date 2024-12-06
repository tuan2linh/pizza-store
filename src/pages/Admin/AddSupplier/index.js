import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addSupplier } from "../../../services/supplier";

const AddSupplier = () => {
    const navigate = useNavigate();

    // State lưu trữ thông tin nhà cung cấp
    const [newSupplier, setNewSupplier] = useState({
        Supplier_Name: "",
        PhoneNumber: "",
        Email: "",
        Supplier_Address: "",
        Rating: "",
    });

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { Supplier_Name, PhoneNumber, Email, Supplier_Address, Rating } = newSupplier;
        if (!Supplier_Name || !PhoneNumber || !Email || !Supplier_Address || !Rating) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            // Gửi dữ liệu tới backend
            await addSupplier(newSupplier);
            toast.success("Supplier added successfully!");
            navigate("/admin/suppliers");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while adding the supplier.");
        }
    };

    return (
        <section className="p-8 relative">
            <div>
                <h2 className="font-medium text-3xl">Add New Supplier</h2>
            </div>
            <hr className="my-5" />
            <div className="flex justify-center">
                <div className="w-[80%] shadow-lg border-2 border-gray-200 rounded-lg">
                    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg">
                        {/* Supplier Name */}
                        <div>
                            <label htmlFor="Supplier_Name" className="block text-gray-700 font-medium">
                                Supplier Name
                            </label>
                            <input
                                name="Supplier_Name"
                                type="text"
                                value={newSupplier.Supplier_Name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter supplier name"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label htmlFor="PhoneNumber" className="block text-gray-700 font-medium">
                                Phone Number
                            </label>
                            <input
                                name="PhoneNumber"
                                type="text"
                                value={newSupplier.PhoneNumber}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="Email" className="block text-gray-700 font-medium">
                                Email
                            </label>
                            <input
                                name="Email"
                                type="email"
                                value={newSupplier.Email}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter email"
                                required
                            />
                        </div>

                        {/* Supplier Address */}
                        <div>
                            <label htmlFor="Supplier_Address" className="block text-gray-700 font-medium">
                                Supplier Address
                            </label>
                            <input
                                name="Supplier_Address"
                                type="text"
                                value={newSupplier.Supplier_Address}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter supplier address"
                                required
                            />
                        </div>

                        {/* Rating */}
                        <div>
                            <label htmlFor="Rating" className="block text-gray-700 font-medium">
                                Rating
                            </label>
                            <input
                                name="Rating"
                                type="number"
                                value={newSupplier.Rating}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter rating (1-5)"
                                required
                                min="1"
                                max="5"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between items-center">
                            <Link to="/admin/suppliers" className="text-accent hover:underline transition-all">
                                Back to supplier list
                            </Link>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#3498db",
                                    color: "#fff",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                                className="hover:opacity-60 transition-all"
                            >
                                Add Supplier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddSupplier;
