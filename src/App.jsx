import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Booking from "./Pages/Dashboard/Booking/Booking";
import HostInfo from "./Pages/Dashboard/HostInfo/HostInfo";
import Notification from "./Pages/Dashboard/Notification/Notification";
import UserInfo from "./Pages/Dashboard/UserInfo/UserInfo";
import AdminInfo from "./Pages/Dashboard/AdminSection/AdminInfo";
import AddAdmin from "./Pages/Dashboard/AdminSection/AddAdmin";
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
import AdminRoute from "./Components/PrivateRoute/AdminRoute";
import AdminResidence from "./Pages/Dashboard/AdminResidence/AdminResidence";
import Pending from "./Pages/Dashboard/AdminResidence/Pending";
import ReUpload from "./Pages/Dashboard/AdminResidence/ReUpload";
import Accepted from "./Pages/Dashboard/AdminResidence/Accepted";


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
              <Route
                path="/booking"
                element={
                  <AdminRoute>
                    <Booking />
                  </AdminRoute>
                }
              />
              <Route
                path="/host-info"
                element={
                  <AdminRoute>
                    <HostInfo />
                  </AdminRoute>
                }
              />
              <Route
                path="/user-info"
                element={
                  <AdminRoute>
                    <UserInfo />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin-info"
                element={
                  <AdminRoute>
                    <AdminInfo />
                  </AdminRoute>
                }
              />
              <Route
                path="/add-admin"
                element={
                  <AdminRoute>
                    <AddAdmin />
                  </AdminRoute>
                }
              />
              <Route
                path="/residence-info"
                element={
                  <AdminRoute>
                    <ResidenceInformation />
                  </AdminRoute>
                }
              />
              <Route
                path="/host-kyc"
                element={
                  <AdminRoute>
                    <HostKyc />
                  </AdminRoute>
                }
              />
              <Route
                path="/user-kyc"
                element={
                  <AdminRoute>
                    <UserKyc />
                  </AdminRoute>
                }
              />
              <Route
                path="/residence-kyc"
                element={
                  <AdminRoute>
                    <ResidenceKYC />
                  </AdminRoute>
                }
              />
              <Route
                path="/setting"
                element={
                  <AdminRoute>
                    <Setting />{" "}
                  </AdminRoute>
                }
              ></Route>
              <Route path="/setting/:dynamic" element={<SettingPage />} />
              {/* Here Start Admin part */}
              <Route path="/adminResidence" element={<AdminResidence />}></Route>
              <Route path="/pending" element={<Pending />}></Route>
              <Route path="/re-upload" element={<ReUpload />}></Route>
              <Route path="/accepted" element={<Accepted />}></Route>

            </Route>

            <Route path="/signin" element={<Signin />} />
            <Route path="/forget-password" element={<ForgetPassword />} />
            <Route path="/otp/:email" element={<Otp />} />
            <Route path="/update-password/:email" element={<UpdatePass />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
