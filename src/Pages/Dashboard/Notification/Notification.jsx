import { Col, Divider, Pagination, Row } from "antd";
import React from "react";
import "./Notification.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsData } from "../../../ReduxSlices/NotificationsSlice";
import SingleNotification from "./SingleNotification";
import baseAxios from "../../../../Config";
import { useNavigate } from "react-router-dom";
import { getAdminNotification } from "../../../lib/Notification";
import ShowingPegination from "../../../Components/ShowingPegination/ShowingPegination";

function Notification() {
  const pageSize = 5;
  const dispatch = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const data = useSelector((state) => state.NotificationsData.AllNotifications);
  const [page, setPage] = useState();
  const dataPagination = useSelector(
    (state) => state.NotificationsData.pagination
  );

  console.log("pegination data", dataPagination);

  const navigate = useNavigate();

  const [notificationsDetails, setNotificationsDetails] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAdminNotification().then((res) => {
      console.log(res);
    });
  }, []);

  console.log(notifications);

  const notificationUpdateHandler = (id) => {
    let data = {
      page: page,
    };
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
        dispatch(NotificationsData(data));
      })
      .catch((err) => console.log(err));
  };

  const notificationsDataGetByPagination = (page) => {
    let data = {
      page: page,
    };
    setPage(page);
    dispatch(NotificationsData(data));
  };

  console.log("notificationsDetails", notificationsDetails);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <div>
          <p style={{ color: "#333333" }}>
            <ShowingPegination pagination={dataPagination} />
          </p>
        </div>
        <div>
          <Pagination
            pageSize={pageSize}
            defaultCurrent={dataPagination?.currentPage}
            total={dataPagination?.totalDocuments}
            onChange={notificationsDataGetByPagination}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Notification;
