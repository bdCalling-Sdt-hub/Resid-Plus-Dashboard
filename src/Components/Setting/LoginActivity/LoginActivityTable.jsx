import { Table } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import baseAxios from "../../../../Config";

const LoginActivityTable = () => {
  const { loginActivity } = useSelector((state) => state.LoginActivity);

  function formatDateString(inputDateString) {
    const inputDate = new Date(inputDateString);

    if (isNaN(inputDate)) {
      return "Invalid Date";
    }

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = inputDate.getDate();
    const month = months[inputDate.getMonth()];
    const year = inputDate.getFullYear();

    let hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    if (hours > 12) {
      hours -= 12;
    }

    return `${day} ${month}, ${year}-${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}${ampm}`;
  }

  const handelSignOut = (id) => {
    let token = localStorage.getItem("token");
    baseAxios.delete(`/api/activities/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
  };

  const columns = [
    {
      title: "BROWSER",
      dataIndex: "browser",
      key: "browser",
    },
    {
      title: "DEVICE",
      dataIndex: "operatingSystem",
      key: "operatingSystem",
      responsive: ["md"],
    },
    {
      title: "TIME",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          {formatDateString(record.createdAt)}
        </div>
      ),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      responsive: ["lg"],
      render: (_, record) => (
        <div style={{ textAlign: "center" }}>
          <button
            onClick={(e) => handelSignOut(record._id)}
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

  return (
    <div>
      <Table
        columns={columns}
        dataSource={loginActivity?.data?.attributes?.activitys}
      />
    </div>
  );
};

export default LoginActivityTable;
