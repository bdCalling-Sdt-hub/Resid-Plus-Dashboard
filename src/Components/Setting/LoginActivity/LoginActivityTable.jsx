import { Button, Drawer, Table, Typography } from "antd";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import DrawerPage from "../../../Components/DrawerPage/DrawerPage";
const { Title, Text } = Typography;

const data = [
  {
    browser: "Kate Winslate",
    device: "kate@gmail.com",
    joiningDate: "22/05/2023",
    ine: 20,
  },
  {
    browser: "Kate Winslate",
    device: "kate@gmail.com",
    joiningDate: "22/05/2023",
    ine: 20,
  },
];

const LoginActivityTable = () => {
  const columns = [
    {
      title: "BROWSER",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "DEVICE",
      dataIndex: "device",
      key: "device",
      responsive: ["md"],
    },
    {
      title: "TIME",
      dataIndex: "joiningDate",
      key: "joiningDate",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              background: "linear-gradient(180deg, #FF2340 0%, #AC0016 100%)",
              borderRadius: "5px",
              cursor: "pointer",
              border: "none",
              padding: "8px 12px",
              color: "white",
            }}
          >
            Sign Out
          </button>
        </div>
      ),
    },
  ];

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [hostData, setHostData] = useState(null);

  const showDrawer = (record) => {
    setIsDrawerVisible(true);
    setHostData(record);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setHostData(null);
  };

  return (
    <div>
      <Table columns={columns} dataSource={data} />
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography>
              <Title level={5} strong>
                Invoice# Trip No.{hostData?.tripNo}
              </Title>
              <Text>See all information about the trip no. 68656</Text>
            </Typography>
            <Button type="text" onClick={closeDrawer}>
              <IoMdClose fontSize={25} />
            </Button>
          </div>
        }
        closable={false}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={600}
      >
        {hostData && <DrawerPage hostData={hostData} />}
      </Drawer>
    </div>
  );
};

export default LoginActivityTable;
