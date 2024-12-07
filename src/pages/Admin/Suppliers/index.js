import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "../../../services/supplier.js";
import { FaEdit, FaTrash, FaSearch, FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm.jsx";

const Products = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchSupplier = async () => {
        setLoading(true);
        try {
            const result = await getSuppliers();
            setSuppliers(result);
        } catch (error) {
            console.error("Failed to get suppliers:", error);
            setSuppliers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteReview = (id) => {
        setSupplierToDelete(id);
        setModalOpen(true);
    };

    const handleDelete = async () => {
        if (!supplierToDelete) return;

        try {
            const result = await deleteSupplier(supplierToDelete);
            if (result.message === "Supplier removed successfully") {
                await fetchSupplier();
                toast.success(`Supplier was deleted`);
            } else {
                toast.error(`Error deleting supplier: ${supplierToDelete}`);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setModalOpen(false);
        }
    };

    useEffect(() => {
        fetchSupplier();
    }, []);

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.Supplier_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.Email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-8xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Supplier Management</h1>
                    <p className="text-gray-600">Manage and track your pizza ingredient suppliers</p>
                </div>
                <Link
                    to="/admin/addsupplier"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                >
                    <span>Add New Supplier</span>
                    <span className="text-xl">+</span>
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6 gap-4">
                    <div className="relative flex-1 max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search suppliers..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="text-gray-600 bg-gray-50 px-4 py-2 rounded-lg">
                        Total Suppliers: <span className="font-semibold">{suppliers.length}</span>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-lg border border-gray-200">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <FaSpinner className="animate-spin text-blue-600 text-4xl" />
                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs bg-gray-50 border-b border-gray-200">
                                <tr>
                                    {["ID", "Name", "Phone Number", "Email", "Address", "Rating", "Actions"].map((header) => (
                                        <th key={header} className="px-6 py-4 font-semibold text-gray-700">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredSuppliers.length > 0 ? (
                                    filteredSuppliers.map((supplier, index) => (
                                        <tr
                                            key={supplier.Supplier_ID}
                                            className="hover:bg-gray-50 transition duration-200"
                                        >
                                            <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{supplier.Supplier_Name}</div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{supplier.PhoneNumber}</td>
                                            <td className="px-6 py-4 text-gray-600">{supplier.Email}</td>
                                            <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{supplier.Supplier_Address}</td>
                                            <td className="px-6 py-4">
                                                {getRatingBadge(supplier.Rating)}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <Link
                                                        to={`/admin/updatesupplier/${supplier.Supplier_ID}`}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                                                    >
                                                        <FaEdit size={18} />
                                                    </Link>
                                                    <button
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                                        onClick={() => handleDeleteReview(supplier.Supplier_ID)}
                                                    >
                                                        <FaTrash size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                                    </svg>
                                                </div>
                                                <p className="text-xl font-medium mb-2">No suppliers found</p>
                                                <p className="text-sm text-gray-400">
                                                    {searchTerm ? "Try adjusting your search" : "Start by adding your first supplier"}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
            
            <ModalConfirm
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Delete Supplier"
                message="Are you sure you want to delete this supplier? This action cannot be undone."
                onConfirm={handleDelete}
            />
        </div>
    );
};

const getRatingBadge = (rating) => {
    const colors = {
        high: { bg: 'bg-green-100', text: 'text-green-800' },
        medium: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
        low: { bg: 'bg-red-100', text: 'text-red-800' },
    };

    const ratingStyle = rating >= 4 ? colors.high : rating >= 3 ? colors.medium : colors.low;

    return (
        <span className={`${ratingStyle.bg} ${ratingStyle.text} px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1`}>
            {rating} <span className="text-yellow-500">★</span>
        </span>
    );
};

export default Products;
