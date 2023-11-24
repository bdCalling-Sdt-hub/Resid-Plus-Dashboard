import { Button, Col, Divider, Modal, Pagination, Row } from "antd";
import React from "react";
import "./Notification.css";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { NotificationsData } from "../../../ReduxSlices/NotificationsSlice";
import SingleNotification from "./SingleNotification";
import baseAxios from "../../../../Config";
import ShowingPegination from "../../../Components/ShowingPegination/ShowingPegination";
import styles from "./Notification.module.css";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

function Notification() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "",
  });
  const pageSize = 10;
  const dispatch = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const data = useSelector((state) => state.NotificationsData.AllNotifications);
  const [page, setPage] = useState();
  const dataPagination = useSelector(
    (state) => state.NotificationsData.pagination
  );
  const [modalData, setModalData] = useState({});
  console.log("modalData", modalData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // console.log(data);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log("pegination data", dataPagination);

  const navigate = useNavigate();

  const [notificationsDetails, setNotificationsDetails] = useState([]);
  const [notifications, setNotifications] = useState([]);



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
        setModalData(res.data.data);
        setIsModalOpen(true);
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

      {modalData.type === "residence" ? (
        <>
          <Modal
            open={isModalOpen}
            width={1000}
            onCancel={handleCancel}
            centered
            footer={[]}
          >
            <div ref={componentRef} className={styles.modalContainer}>
              <h1>Residence information</h1>
              <hr />
              <div className={styles.userModalTitle}>
                <img
                  className={styles.modalImage}
                  src={modalData?.attributes?.photo[0]?.publicFileUrl}
                  alt=""
                />
                <div className={styles.userTitle}>
                  <div>
                    <div className={styles.statusContainer}>
                      <h1>{modalData?.attributes?.residenceName}</h1>{" "}
                      {modalData?.attributes?.status ? (
                        <span className={styles?.active}>Active</span>
                      ) : (
                        <span className={styles?.reserved}>Reserved</span>
                      )}
                    </div>
                    <div>
                      <StarFilled style={{ color: "#FBA91D" }} />
                      <span style={{ marginLeft: "3px" }}>
                        ({modalData?.attributes?.ratings || 0.0})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <div className={styles.userDetails}>
                  <h1>Details</h1>
                  <p>Person/Capacity: {modalData?.attributes?.capacity}</p>
                  <p>Beds: {modalData?.attributes?.beds}</p>
                  <p>Baths: {modalData?.attributes?.baths}</p>
                  <p>
                    Address: {modalData?.attributes?.address},{" "}
                    {modalData?.attributes?.city},{" "}
                    {modalData?.attributes?.municipality}
                  </p>
                  <p>Rent/hr: {modalData?.attributes?.hourlyAmount}</p>
                </div>
                <hr />
                <div className={styles.about}>
                  <h4>About this residence</h4>
                  <p
                    style={{ width: "700px" }}
                    className={styles.aboutResidence}
                  >
                    {modalData?.attributes?.aboutResidence}
                  </p>
                </div>
                <hr />
                <div>
                  <h2>Owner Information</h2>
                  <p>Owner Name: {modalData?.attributes?.ownerName}</p>
                  <h4>Owner About</h4>
                  <p
                    style={{ width: "700px" }}
                    className={styles.aboutResidence}
                  >
                    {modalData?.attributes?.aboutOwner}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={handlePrint} className={styles.modalBtn}>
                Print
              </Button>
              <Button onClick={handlePrint} className={styles.modalBtn1}>
                Download
              </Button>
            </div>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            open={isModalOpen}
            width={1000}
            onCancel={handleCancel}
            centered
            footer={[]}
          >
            <div ref={componentRef} className={styles.modalContainer}>
              <h1 style={{ fontSize: "30px" }}>
                Booking Id: #{modalData?.attributes?.bookingId}
              </h1>
              <p style={{ paddingBottom: "10px", color: "#5A5A5A" }}>
                See all information about Booking ID: #
                {modalData?.attributes?.bookingId}
              </p>
              <hr />
              <div className={styles.userModalTitle}>
                <img
                  className={styles.modalImage}
                  src={
                    modalData?.attributes?.residenceId?.photo[0]?.publicFileUrl
                  }
                  alt=""
                />
                <div className={styles.userTitle}>
                  <div>
                    <div className={styles.statusContainer}>
                      <h1>
                        {modalData?.attributes?.residenceId?.residenceName}
                      </h1>{" "}
                      {data.status === "completed" ? (
                        <span className={styles.active}>Completed</span>
                      ) : data.status === "reserved" ? (
                        <span className={styles.reserved}>Reserved</span>
                      ) : data.status === "cancelled" ? (
                        <span className={styles.cancel}>Canceled</span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <StarFilled style={{ color: "#FBA91D" }} />
                      <span style={{ marginLeft: "3px" }}>
                        ({modalData?.attributes?.ratings || 0})
                      </span>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <p>
                        <HiOutlineLocationMarker></HiOutlineLocationMarker>{" "}
                        {modalData?.attributes?.residenceId?.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <div className={styles.userDetails}>
                  <h1>Booking Information</h1>
                  <p>Booking ID: #{modalData?.attributes?.bookingId}</p>
                  <p>
                    Booking Date:{" "}
                    {modalData?.attributes?.createdAt?.slice(0, 10)}
                  </p>
                  <p>User Name: {modalData?.attributes?.userId?.fullName}</p>
                  <p>Total Persons: {modalData?.attributes?.numberOfGuests}</p>
                  <p>Total Amount: ${modalData?.attributes?.totalAmount}</p>
                </div>

                <hr />
                <div style={{ paddingBottom: "15px" }}>
                  <h2>Owner Information</h2>
                  <p>Owner Name: {modalData?.attributes?.hostId?.fullName}</p>
                  <p>
                    Owner Contact: {modalData?.attributes?.hostId?.phoneNumber}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <Button onClick={handlePrint} className={styles.modalBtn}>
                Print
              </Button>
              <Button onClick={handlePrint} className={styles.modalBtn1}>
                Download
              </Button>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
}

export default Notification;
