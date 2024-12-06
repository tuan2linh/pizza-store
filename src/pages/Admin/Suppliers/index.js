import { useEffect, useState } from "react";
import { getSuppliers, deleteSupplier } from "../../../services/supplier.js";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModalConfirm from "../../../components/ModalConfirm/ModalConfirm.jsx";

const Products = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [supplierToDelete, setSupplierToDelete] = useState(null);

    const fetchSupplier = async () => {
        try {
            const result = await getSuppliers();
            setSuppliers(result);
        } catch (error) {
            console.error("Failed to get suppliers:", error);
            setSuppliers([]);
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

    return (
        <>
            <div className="relative overflow-x-auto rounded-lg">
                <div className="flex justify-end mb-4">
                    <Link
                        to="/admin/addsupplier"
                        className="bg-gray-500 hover:opacity-60 transition-all text-black font-medium text-[17px] py-2 px-4 rounded-lg"
                    >
                        Add new supplier
                    </Link>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Phone Number</th>
                            <th className="px-6 py-3">Email</th>
                            <th className="px-6 py-3">Address</th>
                            <th className="px-6 py-3">Rating</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.length > 0 ? (
                            suppliers.map((supplier, index) => (
                                <tr
                                    key={supplier.Supplier_ID}
                                    className="bg-white border-b hover:bg-gray-50"
                                >
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4">{supplier.Supplier_Name}</td>
                                    <td className="px-6 py-4">{supplier.PhoneNumber}</td>
                                    <td className="px-6 py-4">{supplier.Email}</td>
                                    <td className="px-6 py-4">{supplier.Supplier_Address}</td>
                                    <td className="px-6 py-4">{supplier.Rating}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center gap-3">
                                            <Link
                                                to={`/admin/updatesupplier/${supplier.Supplier_ID}`}
                                                className="font-medium text-red-500"
                                            >
                                                <FaEdit size={20} />
                                            </Link>
                                            <button
                                                className="font-medium text-red-500"
                                                onClick={() => handleDeleteReview(supplier.Supplier_ID)}
                                            >
                                                <FaTrash size={20} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="px-6 py-4 text-center text-gray-500"
                                >
                                    No suppliers available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ModalConfirm
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                title="Confirm delete?"
                message="Are you sure you want to delete this supplier?"
                onConfirm={handleDelete}
            />
        </>
    );
};

export default Products;
