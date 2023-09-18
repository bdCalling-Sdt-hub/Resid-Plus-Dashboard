import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Booking from "./Pages/Dashboard/Booking/Booking";
import HostInfo from "./Pages/Dashboard/HostInfo/HostInfo";
import Notification from "./Pages/Dashboard/Notification/Notification";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import Otp from "./Pages/Otp/Otp";
import Signin from "./Pages/Signin/Signin";
import UpdatePass from "./Pages/UpdatePass/UpdatePass";
import NotFound from "./404";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ResidenceInformation from "./Pages/Dashboard/ResidenceInformation/ResidenceInformation";
import HostKyc from "./Pages/Dashboard/HostKyc/HostKyc";
import Setting from "./Pages/Dashboard/Setting/Setting";
import SettingPage from "./Pages/Dashboard/Setting/SettingPage/SettingPage";
import UserKyc from "./Pages/Dashboard/UserKyc/UserKyc";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResidenceKYC from "./Pages/Dashboard/ResidenceKYC/ResidenceKYC";

function App() {
  return (
    <>
      <div className="maincontainer">
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/" element={<DashboardHome />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/host-info" element={<HostInfo />} />
              <Route path="/user-info" element={<UserInfo />} />
              <Route
                path="/residence-info"
                element={<ResidenceInformation />}
              />
              <Route path="/host-kyc" element={<HostKyc />} />
              <Route path="/user-kyc" element={<UserKyc />} />
              <Route path="/residence-kyc" element={<ResidenceKYC />} />
              <Route path="/setting" element={<Setting />}></Route>
              <Route path="/setting/:dynamic" element={<SettingPage />} />
            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp" element={<Otp />} />
            <Route path="/update-password" element={<UpdatePass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
