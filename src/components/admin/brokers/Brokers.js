import React, { useState } from "react";
import { useSelector } from "react-redux";
import BrokerForm from "./CreateBrokerForm";
import BrokerList from "./BrokerList";

const Brokers = () => {
  const [activeTab, setActiveTab] = useState('list');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };


  return (
    <div className="max-w-6xl mx-auto p-6 mt-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Broker Management
      </h1>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => handleTabChange("list")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "list"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            List
          </button>
          <button
            onClick={() => handleTabChange("create")}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === "create"
                ? "border-indigo-500 text-indigo-600"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            Create
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "list" && (
          <BrokerList/>
        )}
        {activeTab === "create" && <BrokerForm />}
      </div>
    </div>
  );
};

export default Brokers;
