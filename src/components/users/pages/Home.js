import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPackages } from '../../../actions/package';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { packages } = useSelector(state => state.packages);
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Weather Card */}
          <div className="bg-gray-100 p-6 border border-gray-100 shadow-custom rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm text-gray-500">San Francisco</h3>
                <p className="text-4xl font-bold text-gray-700">10°C</p>
                <p className="text-sm text-gray-500">
                  Humidity: 90% Wind: 5 km/h
                </p>
              </div>
              <i className="fas fa-cloud text-gray-500 text-3xl"></i>
            </div>
          </div>

          {/* Time Card */}
          <div className="bg-gray-100 border border-gray-100 p-6 shadow-custom rounded-lg">
            <p className="text-4xl font-bold text-gray-700">02:49 PM</p>
            <p className="text-sm text-gray-500">Thursday 08/08/2024</p>
            <p className="text-sm text-gray-500 mt-2">
              Indoor Temperature: 23°C Humidity: 25%
            </p>
          </div>

          {/* Camera View Card */}
          <div className="bg-gray-100 p-6 border border-gray-100 shadow-custom rounded-lg">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button className="bg-gray-200 px-4 py-2 rounded shadow-custom hover:bg-gray-300">
                  Living
                </button>
                <button className="bg-gray-200 px-4 py-2 rounded shadow-custom hover:bg-gray-300">
                  Kitchen
                </button>
              </div>
              <button className="bg-green-500 text-white px-4 py-2 rounded shadow-custom hover:bg-green-600">
                Add +
              </button>
            </div>
            <div className="mt-4 bg-gray-100 h-48 rounded-lg flex items-center justify-center shadow-custom">
              <img
                src="https://via.placeholder.com/300x200"
                alt="Camera View"
                className="rounded"
              />
            </div>
          </div>
        </div>

        {/* Middle Row: Power Consumed, Power by Room */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Power Consumed Card */}
          <div className="bg-gray-100 p-6 border border-gray-100 shadow-custom rounded-lg">
            <h3 className="text-sm text-gray-500">Power Consumed</h3>
            <div className="mt-4 bg-gray-100 h-32 flex items-center justify-center shadow-custom">
              {/* Placeholder for chart */}
              <span className="text-gray-500">Chart</span>
            </div>
          </div>

          {/* Power by Room Card */}
          <div className="bg-gray-100 p-6 border border-gray-100 shadow-custom rounded-lg">
            <h3 className="text-sm text-gray-500">Power by Room</h3>
            <div className="mt-4 bg-gray-100 h-32 flex items-center justify-center shadow-custom">
              {/* Placeholder for pie chart */}
              <span className="text-gray-500">Pie Chart</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Lighting Control, Devices Control */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lighting Control Card */}
          <div className="bg-gray-100 p-6 border border-gray-100 shadow-custom rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-gray-500">Lighting Control</h3>
              <i className="fas fa-cog text-gray-500"></i>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {/* Lighting Control Items */}
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-lightbulb text-yellow-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Kitchen</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-lightbulb text-yellow-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Bathroom</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-lightbulb text-yellow-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Living</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-lightbulb text-yellow-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Bed 1</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-lightbulb text-yellow-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Bed 2</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-lightbulb text-yellow-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Terrace</p>
                <input type="checkbox" className="mt-2" />
              </div>
            </div>
          </div>

          {/* Devices Control Card */}
          <div className="bg-gray-100 p-6 border border-gray-100 shadow-custom rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-sm text-gray-500">Devices Control</h3>
              <i className="fas fa-cog text-gray-500"></i>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {/* Devices Control Items */}
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-wind text-blue-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">AC (Bed 1)</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-wind text-blue-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">AC (Bed 2)</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-music text-blue-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Music</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-wind text-blue-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">AC (Living)</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-tv text-blue-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">TV (Living)</p>
                <input type="checkbox" className="mt-2" />
              </div>
              <div className="text-center bg-gray-100 p-6 border border-gray-100 shadow-custom">
                <i className="fas fa-door-closed text-blue-500 text-2xl"></i>
                <p className="text-sm text-gray-500 mt-2">Door 1</p>
                <input type="checkbox" className="mt-2" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
