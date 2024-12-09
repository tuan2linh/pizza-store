import { useEffect, useState } from "react";
import { getCustomer } from "../../../services/customerService";
import { FiSearch, FiRefreshCw } from 'react-icons/fi';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCustomer = async () => {
        try {
            setIsLoading(true);
            const result = await getCustomer();
            setCustomers(result);
        } catch (error) {
            console.error("Failed to get customers:", error);
            setCustomers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomer();
    }, []);

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

    const filteredCustomers = customers.filter(customer =>
        customer.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="">
            <div className="bg-white rounded-xl shadow-lg">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Customers Management</h1>
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="relative flex-1 sm:flex-initial">
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <button
                                onClick={fetchCustomer}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                title="Refresh"
                            >
                                <FiRefreshCw className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {indexOfFirstCustomer + 1} to {Math.min(indexOfLastCustomer, filteredCustomers.length)} of {filteredCustomers.length} customers
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">ID</th>
                                <th className="px-6 py-4 font-semibold">Username</th>
                                <th className="px-6 py-4 font-semibold">Email</th>
                                <th className="px-6 py-4 font-semibold">Loyalty Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center">
                                        <div className="flex justify-center items-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : currentCustomers.length > 0 ? (
                                currentCustomers.map((customer, index) => (
                                    <tr
                                        key={customer.customer_id}
                                        className="border-b hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-medium">{indexOfFirstCustomer + index + 1}</td>
                                        <td className="px-6 py-4 font-medium">{customer.username}</td>
                                        <td className="px-6 py-4 text-gray-600">{customer.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                                                {customer.loyalty_points ?? 0} points
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic">
                                        No customers found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-lg hover:bg-gray-50 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Customers;
