import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRiskRule } from "../../../actions/riskrule";

const RiskRuleCard = ({
  rule_id,
  rule_name,
  calculation_type,
  drawdown_daily,
  drawdown_weekly,
  drawdown_monthly,
  drawdown_overall,
  profit_share,
  max_open_lot,
  leverage,
  addons,
  new_trade,
  extension,
  carry_forward,
  EA_allowed,
  repetition,
  HFT_allowed,
  scalping,
  created_at,
}) => {
  const dispatch = useDispatch();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDelete = () => {
    dispatch(deleteRiskRule(rule_id));
    setIsConfirmOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm relative">
      <h2 className="text-xl font-semibold mb-4">{rule_name}</h2>
      <div className="space-y-2">
        <div className="flex justify-between capitalize py-1">
          <span className="font-medium">Calculation Type:</span>
          {calculation_type.replace('_', ' ')}
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium">Daily:</span>
          <span>{Number(drawdown_daily).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium">Weekly:</span>
          <span>{Number(drawdown_weekly).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium">Monthly:</span>
          <span>{Number(drawdown_monthly).toFixed(0)}%</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="font-medium">Overall:</span>
          <span>{Number(drawdown_overall).toFixed(0)}%</span>
        </div>
      </div>

      {/* Button to show more details */}
      <button
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        className="mt-4 text-blue-500 hover:underline focus:outline-none"
      >
        {isDetailsOpen ? "Hide Details" : "See More Details"}
      </button>

      {/* Additional details section */}
      {isDetailsOpen && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between py-1">
            <span className="font-medium">Addons:</span>
            <span>{addons ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">New Trade:</span>
            <span>{new_trade ? "Allowed" : "Not Allowed"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Extension:</span>
            <span>{extension ? "Allowed" : "Not Allowed"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Carry Forward:</span>
            <span>{carry_forward ? "Allowed" : "Not Allowed"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">EA Allowed:</span>
            <span>{EA_allowed ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Repetition:</span>
            <span>{repetition ? "Allowed" : "Not Allowed"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">HFT Allowed:</span>
            <span>{HFT_allowed ? "Yes" : "No"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Scalping:</span>
            <span>{scalping ? "Allowed" : "Not Allowed"}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium">Created At:</span>
            <span>{new Date(created_at).toLocaleDateString()}</span>
          </div>
        </div>
      )}

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="bg-green-100 rounded-md p-2">
          <div className="text-green-600 font-semibold">
            {Number(profit_share).toFixed(0)}%
          </div>
          <div className="text-xs">Profit Share</div>
        </div>
        <div className="bg-green-100 rounded-md p-2">
          <div className="text-green-600 font-semibold">
            {Number(max_open_lot).toFixed(0)}
          </div>
          <div className="text-xs">Max Op. Lot</div>
        </div>
        <div className="bg-green-100 rounded-md p-2">
          <div className="text-green-600 font-semibold">{leverage}</div>
          <div className="text-xs">Leverage</div>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex space-x-2">
        <button
          onClick={() => {
            /* Handle Edit */
          }}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => setIsConfirmOpen(true)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>

      {/* Confirmation Popup */}
      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this risk rule?</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
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

export default RiskRuleCard;
