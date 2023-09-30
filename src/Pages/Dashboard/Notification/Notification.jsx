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
import baseAxios from "../../../../Config";
import { useNavigate } from "react-router-dom";

function Notification() {
  const dispatch = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const data = useSelector((state) => state.NotificationsData.AllNotifications);

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Connect to server using socket.io-client
    var socket = io("http://192.168.10.18:9000");
    socket.on("connect", () => {
      // Emit events or listen for events here
      socket.on("admin-notification", (data) => {
        console.log(data);
        setNotifications(data);
      });
    });
  }, []);

  console.log(notifications);

  const notificationUpdateHandler = (id) => {
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
        // navigate("/booking");
      })
      .catch((err) => console.log(err));
  };



  useEffect(() => {
    dispatch(NotificationsData());
  }, []);

  const comomnData = notifications?.allNotification
    ? notifications?.allNotification
    : data?.allNotification;

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

        {comomnData?.map((singleNotifications) => {
          return (
            <SingleNotification
              notificationUpdateHandler={notificationUpdateHandler}
              singleNotifications={singleNotifications}
            />
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
