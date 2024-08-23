import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
      
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/register" element={<FormRegistration />} />
        <Route path="*" element={<NotFound />} />

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
            {/* Add more admin-specific routes here */}
          </Route>
        </Route>

        {/* User Routes */}
        <Route element={<UserPrivateRoutes />}>
          <Route element={<DashboardLayoutTrader />}>
            <Route path="/trader/dashboard" element={<Home />} />
            <Route path="/trader/dashboard/profile" element={<Profile />} />
            <Route path="/trader/dashboard/packages" element={<PackagesList/>} />
            <Route path="/trader/dashboard/accounts" element={<Accounts/>} />
            <Route path="/trader/dashboard/wallet" element={<Wallet/>} />
            
            {/* Add more admin-specific routes here */}
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
