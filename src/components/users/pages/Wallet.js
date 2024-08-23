import { useEffect, useState } from "react";
import {
  getTransactionHistory,
  getWalletBalance,
  deleteTransactionById
} from "../../../actions/wallet";
import { useDispatch, useSelector } from "react-redux";
import DepositDrawer from "../components/DepositDrwaer";
import { WalletIcon } from "@heroicons/react/24/outline";

export default function Wallet() {
  const [open, setOpen] = useState(false);
  const [transactionTypeFilter, setTransactionTypeFilter] = useState(""); // State for transaction type filter
  const [transactionDateFilter, setTransactionDateFilter] = useState(""); // State for transaction date filter
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectEntry, setSelectEntry] = useState(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.auth);
  const { balance, transactions, loading, success, error } = useSelector(
    (state) => state.wallet
  );

  useEffect(() => {
    dispatch(getTransactionHistory(auth.user_id));
    dispatch(getWalletBalance(auth.user_id));
  }, [dispatch, auth.user_id]);

  // Apply filters to transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      transactionTypeFilter === "" ||
      transaction.transaction_type === transactionTypeFilter;
    const matchesDate =
      transactionDateFilter === "" ||
      new Date(transaction.transaction_date).toLocaleDateString() ===
        new Date(transactionDateFilter).toLocaleDateString();
    return matchesType && matchesDate;
  });

  const handleDeleteClick = (id) => {
    setSelectEntry(id);
    setIsDeleting(true);
};

const handleConfirmDelete = () => {
    if (selectEntry) {
        dispatch(deleteTransactionById(selectEntry));
        setSelectEntry(null);
        setIsDeleting(false);
    }
};

const handleCancelDelete = () => {
    setSelectEntry(null);
    setIsDeleting(false);
};
  return (
    <>
      <div className="max-w-4xl rounded-full justify-between m-auto container flex gap-6 font-sans font-bold px-10 bg-indigo-600/10 shadow-custom my-3 text-indigo-700">
        <WalletIcon className="w-10 h-10" /> :
        <h2 className="text-2xl ">{parseFloat(balance)}$</h2>
      </div>
      <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Transactions</h2>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Deposit
            </button>
            {/* Filters */}
            <select
              value={transactionTypeFilter}
              onChange={(e) => setTransactionTypeFilter(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300"
            >
              <option value="">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdraw</option>
            </select>
            <input
              type="date"
              value={transactionDateFilter}
              onChange={(e) => setTransactionDateFilter(e.target.value)}
              className="px-4 py-2 rounded border border-gray-300"
            />
          </div>
        </div>

        {/* Display loading state */}
        {loading && (
          <p className="text-center text-blue-500">Loading transactions...</p>
        )}

        {/* Display error message if there's an error */}
        {error && (
          <p className="text-center text-red-500">
            Failed to load transactions: {error}
          </p>
        )}

        {/* Display the filtered transactions in a table */}
        {!loading && filteredTransactions.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Wallet ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transactions Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transactions ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Transactions Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.transaction_id}
                    className={
                      transaction.transaction_type === "deposit"
                        ? ""
                        : transaction.transaction_type === "withdrawal"
                        ? ""
                        : ""
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.wallet_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                        className={`px-2 py-1 rounded-full text-center ${
                          transaction.transaction_type === "deposit"
                            ? "bg-green-200 text-green-700"
                            : transaction.transaction_type === "withdrawal"
                            ? "bg-red-200 text-red-700"
                            : ""
                        }`}
                      >
                        {transaction.transaction_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.transaction_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 py-1 rounded-full text-center ${
                          transaction.transaction_type === "deposit"
                            ? "bg-green-200 text-green-700"
                            : transaction.transaction_type === "withdrawal"
                            ? "bg-red-200 text-red-700"
                            : ""
                        }`}
                      >
                        {new Date(transaction.transaction_date).toLocaleString()}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => handleDeleteClick(transaction.transaction_id)}
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

        <DepositDrawer open={open} setOpen={setOpen} />
        {!loading && filteredTransactions.length === 0 && (
          <p className="text-center text-gray-500">No transactions available</p>
        )}
         {isDeleting && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                        <p className="mb-4">Are you sure you want to delete this Entry?</p>
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
    </>
  );
}
