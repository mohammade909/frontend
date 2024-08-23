import React, { useEffect } from "react";
import AddRiskRuleDrawer from "./AddRiskRuleDrawer";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllRiskRules } from "../../../actions/riskrule";
import RiskRuleCard from './RiskRuleCard'; // Make sure the import path is correct

export default function RiskRules() {
  const dispatch = useDispatch();
  const { riskRules, status, error } = useSelector((state) => state.riskrules);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllRiskRules());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Risk Rules</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
        >
          ADD RISK RULE
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {riskRules.map((rule) => (
          <RiskRuleCard key={rule.rule_id} {...rule} />
        ))}
      </div>
      <AddRiskRuleDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}
