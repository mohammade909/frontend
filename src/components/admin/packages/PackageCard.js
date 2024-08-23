import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deletePackage } from "../../../actions/package"; // Adjust the import path
import { useState } from "react";
import UpdatePackageDrawer from "./UpdatePackageDrawer";

const PackageCard = ({
  package_id,
  package_name,
  risk,
  swap_fee,
  swap_free,
  created_at,
  amountAndFee,
  brokerPlatform,
  levelFees,
  platform_name,
  broker_name,
  addons,
  rule_name,
  weeklyPayout,
  refund,
  minTrading,
}) => {
  const dispatch = useDispatch();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setShowDeletePopup(true);
  };

  const confirmDelete = () => {
    dispatch(deletePackage(package_id));
    setShowDeletePopup(false);
  };

  const cancelDelete = () => {
    setShowDeletePopup(false);
  };
  const handleEditPackage = () => {
    setOpen(true);
  };
 
  return (
    <div className="bg-white flex shadow-md rounded-lg mb-6">
      <div className="w-1/3 bg-gray-300 p-4">
        <div>
          <div className="text-xl font-bold">{package_name}</div>
        </div>
        <div className="mb-4">
          <div className="font-semibold">Addons:</div>
          {weeklyPayout && (
            <>
          
              {weeklyPayout.mode && parseFloat(weeklyPayout.amount) !== 0 && (
                <p className="flex gap-4 items-center py-3 capitalize">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6 text-green-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Weekly Payout {weeklyPayout.mode} : {weeklyPayout.amount}$
                </p>
              )}
                </>
             
          
          )}
          <div>
            {refund?.length > 0 && (
              <div>
                {refund?.map((item) => (
                  <p className="flex gap-4 item-center py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item.percent}% Refund (+ {item.amount}$ Fees)
                  </p>
                ))}
              </div>
            )}
          </div>
          <div>
            {minTrading.length > 0 && (
              <div>
                {minTrading.map((item) => (
                  <p className="flex gap-4 item-center py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clipRule="evenodd"
                      />
                    </svg>
                   Min Trading: {item.trade_days} Days  (+ {item.amount}$ Fees)
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-2/3 p-4 md:p-6">
        <div className="mb-4 flex">
          <div className="w-1/4 py-1">
            <div className="text-sm">Risk:</div>
          </div>
          <div className="w-3/4 border-dashed border-b border-indigo-600 py-1">
            <div className="text-gray-600 w-full font-semibold">
              {rule_name}
            </div>
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/4 py-1">
            <div className="text-sm">Amount & Fee:</div>
          </div>
          <div className="w-3/4 border-dashed border-b border-indigo-600 py-1">
            <ul className="grid grid-cols-2 md:grid-cols-3">
              {amountAndFee?.map((af, index) => (
                <li
                  className="text-gray-600 w-full text-xs list-none pb-3"
                  key={index}
                >
                  <span className="bg-blue-200  px-3 py-1 border-dashed border border-blue-300 rounded text-blue-600 font-semibold tracking-wider">
                    {af.amount} | {af.fee}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/4 py-1">
            <div className="text-sm">Broker & Platform:</div>
          </div>
          <div className="w-3/4 border-dashed border-b border-indigo-600 py-1">
            {/* {brokerPlatform?.map((bp) => ( */}
            <div className="text-gray-600 w-full font-semibold">
              {broker_name}|{platform_name}
            </div>
            {/* ))} */}
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/4 py-1">
            <div className="text-sm">Swap Fee:</div>
          </div>
          <div className="w-3/4 border-dashed border-b border-indigo-600 py-1">
            <div className="text-gray-600 w-full font-semibold">{swap_fee}</div>
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/4 py-1">
            <div className="text-sm">Swap Free:</div>
          </div>
          <div className="w-3/4 border-dashed border-b border-indigo-600 py-1">
            <div className="text-gray-600 w-full font-semibold">
              {swap_free}
            </div>
          </div>
        </div>
        <div className="mb-4 flex">
          <div className="w-1/4 py-1">
            <div className="text-sm">Level Fee:</div>
          </div>
          <div className="w-3/4 border-dashed border-b border-indigo-600 py-1">
            <ul className="list-disc list-inside flex">
              <li className="text-gray-600 w-full text-xs list-none pb-3">
                <span className="bg-yellow-200 px-3 py-1 border-dashed border border-orange-300 rounded text-orange-600 font-semibold tracking-wider">
                  {levelFees?.level1_fee}
                </span>
              </li>

              <li className="text-gray-600 w-full text-xs list-none pb-3">
                <span className="bg-yellow-200 px-3 py-1 border-dashed border border-orange-300 rounded text-orange-600 font-semibold tracking-wider">
                  {levelFees?.level2_fee}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={handleEditPackage}
          >
            <FaEdit />
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={handleDelete}
          >
            <FaTrash />
          </button>
        </div>
        {showDeletePopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
              <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
              <p className="mb-4">
                Are you sure you want to delete the package{" "}
                <strong>{package_name}</strong>?
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={cancelDelete}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {open && (
        <UpdatePackageDrawer open={open} setOpen={setOpen} id={package_id} />
      )}
    </div>
  );
};
export default PackageCard;
