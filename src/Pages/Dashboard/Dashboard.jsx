/* eslint-disable no-unused-vars */
import { CarOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, Layout, Menu, Select, theme } from "antd";
import { Divider } from "antd";
import { MdPeopleOutline } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BiBookmarkAltPlus } from "react-icons/bi";
import { GoPeople } from "./../../../node_modules/react-icons/go/index.esm";
import { IoIosNotificationsOutline } from "react-icons/io";
import { RiUserSearchLine } from "react-icons/ri";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import residLogo from "../../Images/resid-logo.png";
import Styles from "./Dashboard.module.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsData } from "../../ReduxSlices/NotificationsSlice";
import { io } from "socket.io-client";
import baseAxios from "../../../Config";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const Dashboard = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.lang);

  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const dataApi = useSelector(
    (state) => state.NotificationsData.AllNotifications
  );

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to server using socket.io-client
    var socket = io("http://192.168.10.18:3000");
    socket.on("connect", () => {
      // Emit events or listen for events here
      socket.on("admin-notification", (data) => {
        console.log(data);
        setNotifications(data);
      });
    });
    dispatch(NotificationsData());
    socket.off("admin-notification", data);
  }, []);

  const data = notifications?.allNotification
    ? notifications?.allNotification
    : dataApi.allNotification;

  console.log(data);
  function getTimeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0) {
      return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else {
      return "just now";
    }
  }

  console.log(data?.notViewed);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [t, i18n] = useTranslation("global");

  const handleSelectLanguage = (value) => {
    setSelectedLanguage(value);
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem("lang", value);
  };

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  const logout = () => {
    Swal.fire({
      title: "Do you want to Logout from here?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("yourInfo");

        navigate("/signin");
      } else if (result.isDenied) {
        Swal.fire("Ok", "", "info");
      }
    });
  };

  const notificationUpdateHandler = (id) => {
    console.log(id);
    let token = localStorage.getItem("token");
    baseAxios
      .patch(
        `/api/notifications/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate("/notification");
      })
      .catch((err) => console.log(err));
  };

  console.log(data);

  const items = data?.slice(0, 5).map((item, index) => {
    return {
      key: index,
      label: (
        <div
          onClick={(e) => notificationUpdateHandler(item._id)}
          className={
            item?.viewStatus ? Styles.everyNotify : Styles.everyNotifyUnView
          }
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            style={{
              backgroundColor: "#d9cffb",
              borderRadius: "100%",
              padding: "5px",
              marginRight: "15px",
            }}
            width="30"
            height="30"
            src={item?.image?.publicFileUrl}
            alt="person-male--v2"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>{item?.message}</p>
            <span style={{ color: "#d2d2d2" }}>
              {getTimeAgo(item.createdAt)}
            </span>
          </div>
        </div>
      ),
    };
  });

  const profileItems = [
    {
      key: 1,
      label: (
        <Link
          to="/setting/personal-information"
          style={{ height: "50px" }}
          rel="noreferrer"
        >
          <div
            className={Styles.everyNotify}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              style={{ marginRight: "20px" }}
              width="30"
              height="30"
              src="https://img.icons8.com/windows/32/gender-neutral-user.png"
              alt="gender-neutral-user"
            />
            <div className="" style={{ marginTop: "" }}>
              <p>Profile</p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link to="/notification" style={{}} rel="noreferrer">
          <div
            className={Styles.everyNotify}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              style={{ marginRight: "20px" }}
              width="30"
              height="30"
              src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
              alt="appointment-reminders--v1"
            />
            <div className="" style={{ marginTop: "" }}>
              <p>Notification</p>
            </div>
          </div>
        </Link>
      ),
    },
    {
      key: 3,
      label: (
        <div
          onClick={logout}
          style={{ border: "none", backgroundColor: "transparent" }}
          rel="noreferrer"
        >
          <div
            className={Styles.everyNotify}
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              style={{ marginRight: "20px" }}
              width="25"
              height="25"
              src="https://img.icons8.com/ios/50/exit--v1.png"
              alt="exit--v1"
            />
            <div className="" style={{ marginTop: "" }}>
              <p>Logout</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const menu = (
    <Menu>
      <Menu.Item disabled>
        <h2
          style={{
            color: "black",
            fontWeight: "500",
            borderBottom: "1px solid #e6e7f4",
            paddingBottom: "20px",
          }}
        >
          Notifications
        </h2>
      </Menu.Item>
      {items?.map((item) => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
      <div
        className=""
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "15px",
        }}
      >
        <Button
          onClick={(e) => navigate("/notification")}
          className="btn"
          block
        >
          See All
        </Button>
      </div>
    </Menu>
  );

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="313px"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          position: "fixed",
          height: "100vh",
          zIndex: 2,
          backgroundColor:
            "linear-gradient(180deg, #787878 0%, #434343 0.01%, #000 100%)",
        }}
      >
        <div className="demo-logo-vertical" />
        <div
          onClick={() => navigate("/")}
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
            marginBottom: "40px",
            cursor: "pointer",
          }}
        >
          <img
            src={residLogo}
            height={collapsed ? "40px" : "76px"}
            width={collapsed ? "40px" : "66px"}
          />
        </div>

        <Menu
          style={{
            padding: collapsed ? "0px" : "20px",
            border: "none",
            backgroundColor: "#001529",
            color: "white",
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          <Menu.Item
            key="1"
            icon={<RxDashboard style={{ fontSize: "14px" }} />}
          >
            <Link to="/" style={{ fontSize: "16px" }}>
              {t("dashboard")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="31"
            icon={<BiBookmarkAltPlus style={{ fontSize: "14px" }} />}
          >
            <Link to="/booking" style={{ fontSize: "16px" }}>
              {t("booking")}
            </Link>
          </Menu.Item>

          <Divider />

          <Menu.Item
            key="100"
            icon={<MdPeopleOutline style={{ fontSize: "14px" }} />}
          >
            <Link to="/admin-info" style={{ fontSize: "16px" }}>
              {t("adminInfo")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="5"
            icon={<MdPeopleOutline style={{ fontSize: "14px" }} />}
          >
            <Link to="/user-info" style={{ fontSize: "16px" }}>
              {t("userInfo")}
            </Link>
          </Menu.Item>

          <Menu.Item key="39" icon={<GoPeople style={{ fontSize: "14px" }} />}>
            <Link to="/host-info" style={{ fontSize: "16px" }}>
              {t("hostInfo")}
            </Link>
          </Menu.Item>

          <Menu.Item
            key="7"
            icon={<CarOutlined style={{ fontSize: "14px" }} />}
          >
            <Link to="/residence-info" style={{ fontSize: "16px" }}>
              {t("residenceInfo")}
            </Link>
          </Menu.Item>

          <Divider />

          <SubMenu
            style={{ fontSize: "16px", color: "white" }}
            key="8"
            icon={
              <RiUserSearchLine style={{ fontSize: "14px", color: "white" }} />
            }
            title={t("kyc.title")}
          >
            <Menu.Item key="41">
              <Link to="/user-kyc">{t("kyc.subTitle1")}</Link>
            </Menu.Item>
            <Menu.Item key="42">
              <Link to="/host-kyc">{t("kyc.subTitle2")}</Link>
            </Menu.Item>
            <Menu.Item key="43">
              <Link to="/residence-kyc">{t("kyc.subTitle3")}</Link>
            </Menu.Item>
          </SubMenu>

          <Menu.Item
            key="9"
            icon={
              <SettingOutlined style={{ fontSize: "14px", color: "white" }} />
            }
          >
            <Link to="/setting" style={{ fontSize: "16px", color: "white" }}>
              {t("setting.title")}
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100vw",
            height: "80px",
            zIndex: 1,
            padding: 0,
            background: "#FDFBFB",
            display: "flex",
            justifyContent: "space-between",
            paddingRight: "60px",
          }}
        >
          <div className="" style={{ display: "flex", alignItems: "center" }}>
            <Button
              type="text"
              icon={collapsed ? <MenuOutlined /> : <MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                marginLeft: collapsed ? "125px" : "360px",
                fontSize: "16px",
                width: 45,
                height: 45,
                marginRight: "10px",
              }}
            />
            <h2>
              {location.pathname === "/" ? (
                "Dashboard"
              ) : location.pathname === "/booking" ? (
                "Bookings"
              ) : location.pathname === "/user-info" ? (
                "User Information"
              ) : location.pathname === "/host-info" ? (
                "Host Information"
              ) : location.pathname === "/residence-info" ? (
                "Residence"
              ) : location.pathname === "/setting" ? (
                "Settings"
              ) : location.pathname === "/setting/personal-information" ? (
                "Settings"
              ) : location.pathname === "/setting/login-activity" ? (
                "Settings"
              ) : location.pathname === "/setting/suspended-list" ? (
                "Settings"
              ) : location.pathname === "/setting/banned-list" ? (
                "Settings"
              ) : location.pathname === "/setting/privacy-policy" ? (
                "Settings"
              ) : location.pathname === "/setting/terms-condition" ? (
                "Settings"
              ) : location.pathname === "/setting/about-us" ? (
                "Settings"
              ) : location.pathname === "/user-kyc" ? (
                "KYC Form"
              ) : location.pathname === "/host-kyc" ? (
                "KYC Form"
              ) : location.pathname === "/residence-kyc" ? (
                "KYC Form"
              ) : location.pathname === "/notification" ? (
                "Notification"
              ) : (
                <></>
              )}
            </h2>
          </div>

          <div
            className={Styles.notificatonProfileSection}
            style={{ display: "flex", alignItems: "center", lineHeight: 0 }}
          >
            <div className="" style={{ marginRight: "40px" }}>
              <Select
                value={selectedLanguage}
                style={{ width: 150 }}
                onChange={handleSelectLanguage}
                placeholder="Select Language"
                defaultValue="en"
              >
                <Option value="en">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://cdn.britannica.com/29/22529-004-ED1907BE/Union-Flag-Cross-St-Andrew-of-George.jpg"
                      alt="English"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    English
                  </div>
                </Option>
                <Option value="fr">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    France
                  </div>
                </Option>
                <Option value="es">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src="https://e0.pxfuel.com/wallpapers/630/608/desktop-wallpaper-spain-flag-in-collection.jpg"
                      style={{ marginRight: 8, width: 16, height: 16 }}
                    />
                    Spanish
                  </div>
                </Option>
              </Select>
            </div>

            <div className={Styles.notificaton} style={{ marginRight: "30px" }}>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <Badge
                  count={
                    notifications?.notViewed
                      ? notifications?.notViewed
                      : dataApi?.notViewed
                  }
                  color="#333333"
                >
                  <IoIosNotificationsOutline
                    className="cursor-pointer"
                    fontSize={35}
                    color="#333333"
                  />
                </Badge>
              </Dropdown>
            </div>

            <div className={Styles.profile}>
              <Dropdown
                menu={{
                  items: profileItems,
                }}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  width="40"
                  height="40"
                  src={userFromLocalStorage?.image?.publicFileUrl}
                  alt="person-male--v2"
                />
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            marginTop: "80px",
            marginBottom: "50px",
            marginLeft: collapsed ? "90px" : "320px",
            marginRight: "60px",
            background: "white",

            padding: 50,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
