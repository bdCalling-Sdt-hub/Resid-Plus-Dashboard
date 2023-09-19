/* eslint-disable no-unused-vars */
import { CarOutlined, MenuOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu, Select, theme } from "antd";

import { Divider } from "antd";
import { GiReceiveMoney } from "react-icons/gi";
import { MdCarRental, MdPayment, MdPeopleOutline } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { BiBookmarkAltPlus } from "react-icons/bi";
import { GoPeople } from "./../../../node_modules/react-icons/go/index.esm";

import { RiUserSearchLine } from "react-icons/ri";

import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import rentiLogo from "../../Images/resid-logo.png";
import Styles from "./Dashboard.module.css";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const { Option } = Select;

const profileItems = [
  {
    key: 1,
    label: (
      <Link to="/notification" style={{ height: "50px" }} rel="noreferrer">
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

const items = [...Array(5).keys()].map((item, index) => {
  return {
    key: index,
    label: (
      <Link to="/notification" style={{}} rel="noreferrer">
        <div
          className={Styles.everyNotify}
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
            src="https://img.icons8.com/3d-fluency/94/person-male--v2.png"
            alt="person-male--v2"
          />
          <div className="" style={{ marginTop: "" }}>
            <p>
              <span>Sanchej haro manual </span>started a new trip from mexico.
            </p>
            <span style={{ color: "#d2d2d2" }}>1 hr ago</span>
          </div>
        </div>
      </Link>
    ),
  };
});

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(localStorage.lang);

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

  const menu = (
    <Menu>
      <Menu.Item disabled>
        <h2
          style={{
            color: "#000b90",
            fontWeight: "500",
            borderBottom: "1px solid #e6e7f4",
            paddingBottom: "20px",
          }}
        >
          Notifications
        </h2>
        {/* <span style={{ fontWeight: 'bold', color: '#000' }}>Notifications</span> */}
      </Menu.Item>
      {items.map((item) => (
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
        <Button className="btn" block>
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
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "60px",
            marginBottom: "40px",
          }}
        >
          <img
            src={rentiLogo}
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
            // background: colorBgContainer,
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
            <h2>{t("header.title")}</h2>
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
            <div className={Styles.notificaton}>
              <Dropdown
                overlay={menu}
                placement="bottomRight"
                arrow={{
                  pointAtCenter: true,
                }}
              >
                <img
                  style={{ cursor: "pointer" }}
                  width="30"
                  height="30"
                  src="https://img.icons8.com/ios/50/appointment-reminders--v1.png"
                  alt="appointment-reminders--v1"
                />
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
                  src="https://img.icons8.com/3d-fluency/94/person-male--v2.png"
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
