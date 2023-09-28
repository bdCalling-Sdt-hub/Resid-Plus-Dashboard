import { Col, Divider, Pagination, Row } from "antd";
import React from "react";
import "./Notification.css";
import { use } from "i18next";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsData } from "../../../ReduxSlices/NotificationsSlice";
import SingleNotification from "./SingleNotification";

function Notification() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const data = useSelector((state) => state.NotificationsData.AllNotifications);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(NotificationsData());
  }, []);

  return (
    <div
      style={{
        border: "1px solid #A7A7A7",
        padding: "40px",
        borderRadius: "10px",
      }}
    >
      <Row>
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "30px",
            background: "black;",
          }}
        >
          All Notifications
        </h2>

        {data?.allNotification?.map((singleNotifications) => {
          return (
            <SingleNotification singleNotifications={singleNotifications} />
          );
        })}
      </Row>
      <Row>
        <Col lg={{ span: 12 }} style={{ marginBottom: "20px" }}>
          <p style={{ color: "#333333" }}>Showing 1-10 OF 250</p>
        </Col>
        <Col lg={{ span: 8, offset: 4 }}>
          <Pagination
            defaultCurrent={1}
            total={20}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Notification;
