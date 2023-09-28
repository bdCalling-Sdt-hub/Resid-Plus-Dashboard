import { Col, Divider, Pagination, Row } from "antd";
import React from "react";
import "./Notification.css";
import { use } from "i18next";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsData } from "../../../ReduxSlices/NotificationsSlice";

function Notification() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const data = useSelector((state) => state.NotificationsData.AllNotifications);
  console.log(data);

  const [notifications, setNotifications] = useState([]);

  // useEffect(() =>{
  //      // Connect to server using socket.io-client
  //      var socket = io("http://192.168.10.18:9000");
  //      socket.on("connect", () => {

  //          // Emit events or listen for events here
  //          socket.on('admin-notification', (data) => {
  //              console.log(data)
  //               setNotifications(data.allNotification)
  //          })
  //      });
  // },[])

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(NotificationsData());
  }, []);

  return (
    <div>
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

        {data?.allNotification.map((singleNotifications) => {
          return (
            <Col key={singleNotifications._id} lg={{ span: 24 }}>
              <div
                className="single-notification"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="user-image" style={{ marginRight: "50px" }}>
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "100%",
                      border: "2px solid gray",
                    }}
                    src={singleNotifications?.image?.publicFileUrl}
                  />
                </div>
                <div className="">
                  <p>{singleNotifications?.message}</p>
                  <p style={{ color: "gray", marginTop: "10px" }}>1hr ago</p>
                </div>
              </div>

              <Divider />
            </Col>
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
