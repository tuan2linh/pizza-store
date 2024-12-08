import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSupplierById, updateSupplier } from "../../../services/supplierService";

const UpdateSupplier = () => {
    const { id } = useParams(); // Lấy id từ URL
    const navigate = useNavigate();

    // State lưu trữ thông tin nhà cung cấp
    const [supplier, setSupplier] = useState({
        Supplier_Name: "",
        PhoneNumber: "",
        Email: "",
        Supplier_Address: "",
        Rating: "",
        Description: "",
    });

    useEffect(() => {
        const fetchSupplier = async () => {
            try {
                const result = await getSupplierById(id);
                setSupplier(result);
                console.log(result)
            } catch (error) {
                console.error("Error fetching supplier:", error);
                toast.error("Failed to load supplier data.");
            }
        };

        fetchSupplier();
    }, [id]);

    // Hàm xử lý thay đổi giá trị input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSupplier({ ...supplier, [name]: value });
    };

    // Hàm xử lý submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { Supplier_Name, PhoneNumber, Email, Supplier_Address, Rating, Description } = supplier;

        try {
            // Gửi yêu cầu cập nhật nhà cung cấp
            await updateSupplier(id, supplier);
            toast.success("Supplier updated successfully!");
            navigate("/admin/suppliers");
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred while updating the supplier.");
        }
    };

    return (
        <section className="p-8 relative">
            <div>
                <h2 className="font-medium text-3xl">Update Supplier</h2>
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
                                value={supplier.Supplier_Name}
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
                                value={supplier.PhoneNumber}
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
                                value={supplier.Email}
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
                                value={supplier.Supplier_Address}
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
                                value={supplier.Rating}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border rounded-lg"
                                placeholder="Enter rating (1-5)"
                                required
                                min="1"
                                max="5"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="Description" className="block text-gray-700 font-medium">
                                Description
                            </label>
                            <textarea
                                name="Description"
                                value={supplier.Description}
                                onChange={handleInputChange}
                                className="w-full h-32 px-4 py-2 border rounded-lg"
                                placeholder="Enter supplier description"
                            />
                        </div>

                        <div className="flex justify-between items-center pt-6">
                            <Link
                                to="/admin/suppliers"
                                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 
                   bg-white border border-blue-600 rounded-lg shadow-md 
                   hover:bg-blue-600 hover:text-white hover:shadow-lg
                   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                   transition-all duration-200"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to Supplier List
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
                                Update Supplier
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UpdateSupplier;
