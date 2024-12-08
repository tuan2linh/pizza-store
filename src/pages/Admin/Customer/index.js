import { useEffect, useState } from "react";
import { getCustomer } from "../../../services/customerService";

const Customers = () => {
    const [customers, setCustomers] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1); 
    const [customersPerPage] = useState(10); 

    const fetchCustomer = async () => {
        try {
            const result = await getCustomer(); 
            setCustomers(result); 
        } catch (error) {
            console.error("Failed to get customers:", error);
            setCustomers([]); 
        }
    };

    useEffect(() => {
        fetchCustomer(); 
    }, []);

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    // Tính tổng số trang
    const totalPages = Math.ceil(customers.length / customersPerPage);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Customers Management</h1>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Username</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Loyalty Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCustomers.length > 0 ? (
                                currentCustomers.map((customer, index) => (
                                    <tr
                                        key={customer.customer_id}
                                        className="bg-white border-b hover:bg-gray-50 transition duration-200"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900">{index + 1}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{customer.username}</td>
                                        <td className="px-6 py-4">{customer.email}</td>
                                        <td className="px-6 py-4">
                                            {customer.loyalty_points !== null
                                                ? customer.loyalty_points
                                                : "Not available"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-8 text-center text-gray-500 bg-gray-50 italic"
                                    >
                                        No customers available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Phân trang */}
                <div className="flex justify-center mt-6">
                    <nav>
                        <ul className="inline-flex -space-x-px">
                            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                                <li key={pageNumber}>
                                    <button
                                        onClick={() => paginate(pageNumber)}
                                        className={`px-4 py-2 border ${pageNumber === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-700"} rounded-l-lg hover:bg-blue-700 hover:text-white`}
                                    >
                                        {pageNumber}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    );
};

export default Customers;
