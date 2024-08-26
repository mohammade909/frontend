import React from 'react';
import { useDispatch } from 'react-redux';
import { updateLevelStatusByUserId } from '../../../actions/user'; // Adjust the import path

const TableComponent = ({ data }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (userId, newStatus) => {
    dispatch(updateLevelStatusByUserId({ user_id: userId, level_status: newStatus }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="py-3 px-4 text-left text-gray-600">Level Name</th>
            <th className="py-3 px-4 text-left text-gray-600">Fee</th>
            <th className="py-3 px-4 text-left text-gray-600">Package</th>
            <th className="py-3 px-4 text-left text-gray-600">Username</th>
            <th className="py-3 px-4 text-left text-gray-600">Email</th>
            <th className="py-3 px-4 text-left text-gray-600">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item) => (
              <tr key={item.level_id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{item.level_name}</td>
                <td className="py-3 px-4 border-b">${Number(item.fee).toFixed(2)}</td>
                <td className="py-3 px-4 border-b">{item.package_name}</td>
                <td className="py-3 px-4 border-b">{item.username}</td>
                <td className="py-3 px-4 border-b">{item.email}</td>
                <td className="py-3 px-4 border-b">
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item.user_id, e.target.value)}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="process">Process</option>
                    <option value="failed">Failed</option>
                    <option value="passed">Passed</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="py-3 px-4 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
