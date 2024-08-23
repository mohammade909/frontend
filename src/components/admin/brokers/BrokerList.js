import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllBrokers, deleteBroker } from '../../../actions/brokers'; // Adjust the import path as needed

const BrokerList = () => {
    const dispatch = useDispatch();
    const { brokers, loading, error } = useSelector((state) => state.brokers);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedBrokerId, setSelectedBrokerId] = useState(null);

    useEffect(() => {
        dispatch(fetchAllBrokers());
    }, [dispatch]);

    const handleDeleteClick = (id) => {
        setSelectedBrokerId(id);
        setIsDeleting(true);
    };

    const handleConfirmDelete = () => {
        if (selectedBrokerId) {
            dispatch(deleteBroker(selectedBrokerId));
            setSelectedBrokerId(null);
            setIsDeleting(false);
        }
    };

    const handleCancelDelete = () => {
        setSelectedBrokerId(null);
        setIsDeleting(false);
    };

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Brokers</h2>

            {/* Display loading state */}
            {loading && <p className="text-center text-blue-500">Loading brokers...</p>}

            {/* Display error message if there's an error */}
            {error && <p className="text-center text-red-500">Failed to load brokers: {error}</p>}

            {/* Display the list of brokers in a table */}
            {!loading && brokers.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Broker Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Platform 
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created At
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Updated At
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {brokers.map((broker) => (
                                <tr key={broker.broker_id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{broker.broker_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{broker.platform_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(broker.created_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(broker.updated_at).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button
                                            onClick={() => handleDeleteClick(broker.broker_id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Display message if no brokers found */}
            {!loading && brokers.length === 0 && (
                <p className="text-center text-gray-500">No brokers available</p>
            )}

            {/* Confirmation Modal */}
            {isDeleting && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-4">Are you sure you want to delete this broker?</p>
                        <div className="flex justify-end">
                            <button
                                onClick={handleConfirmDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={handleCancelDelete}
                                className="ml-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrokerList;
