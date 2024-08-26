import React, { useEffect, useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import UserPrivateRoutes from "./BaseFiles/UserPrivateRoutes";
import NotFound from "./pages/NotFound";
import FormRegistration from "./components/users/Register";
import Login from "./components/users/Login";
import AdminPrivateRoute from "./BaseFiles/AdminPrivateRoutes";
import AdminLogin from "./components/admin/AdminLogin";
import DashboardLayout from "./layouts/Admin";
import Users from "./pages/admin/Users";
import RiskRules from "./components/admin/riskrules/RiskRules";
import Packages from "./components/admin/packages/Packages";
import UserInfo from "./pages/admin/UserInfo";
import Profile from "./components/users/pages/Profile";
import Home from "./components/users/pages/Home";
import DashboardLayoutTrader from "./components/users/Dashboard";
import PackagesList from "./components/users/pages/PackagesList";
import Platforms from "./components/admin/platforms/Platforms";
import BrokerList from "./components/admin/brokers/BrokerList";
import Brokers from "./components/admin/brokers/Brokers";
import Accounts from "./components/users/pages/Accounts";
import Wallet from "./components/users/pages/Wallet";
import Notifications from "./components/admin/notifications/Notifications";
import NotificationCenter from "./components/users/pages/Notifications";
import { BASEURL } from './baseurl';
import Maintainence from './pages/Maintainence';
import ShutdownForm from './components/Server';
import TransactionList from './components/admin/transactions/TransactionsList';
import Achievers from './components/admin/levels/Achievers';
function App() {
  const [isServerDown, setIsServerDown] = useState(false);

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(`${BASEURL}/api/v1/auth/status`);
        const data = await response.json();
        setIsServerDown(data.shutdown?.status || false);
      } catch (error) {
        console.error('Error fetching server status:', error);
        setIsServerDown(true); // Consider the server down if the request fails
      }
    };

    checkServerStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/register" element={<FormRegistration />} />
       {!isServerDown && <Route path="*" element={<NotFound />} />}

        {/* Admin Routes */}
        <Route element={<AdminPrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<Users />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/risk-rules" element={<RiskRules />} />
            <Route path="/admin/packages" element={<Packages />} />
            <Route path="/admin/platforms" element={<Platforms />} />
            <Route path="/admin/brokers" element={<Brokers />} />
            <Route path="/admin/user/:id" element={<UserInfo />} />
            <Route path="/admin/notifications" element={<Notifications />} />
            <Route path="/admin/server" element={<ShutdownForm />} />
            <Route path="/admin/transactions" element={<TransactionList />} />
            <Route path="/admin/achievers" element={<Achievers />} />
            {/* Add more admin-specific routes here */}
          </Route>
        </Route>

        {/* User Routes */}
        {isServerDown ? (
          <Route path="*" element={<Maintainence />} /> // Redirect users to login or a suitable page
        ) : (
          <Route element={<UserPrivateRoutes />}>
            <Route element={<DashboardLayoutTrader />}>
              <Route path="/trader/dashboard" element={<Home />} />
              <Route path="/trader/dashboard/profile" element={<Profile />} />
              <Route path="/trader/dashboard/packages" element={<PackagesList />} />
              <Route path="/trader/dashboard/accounts" element={<Accounts />} />
              <Route path="/trader/dashboard/wallet" element={<Wallet />} />
              <Route path="/trader/dashboard/notifications" element={<NotificationCenter />} />
              {/* Add more user-specific routes here */}
            </Route>
          </Route>
        )}
      </Routes>
    </Router>
  );
}

export default App;
