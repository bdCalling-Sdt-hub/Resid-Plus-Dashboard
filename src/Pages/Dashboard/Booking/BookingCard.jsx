import { Button, Modal } from "antd";
import React, { useState } from "react";
import { StarFilled } from "@ant-design/icons";
import { HiOutlineLocationMarker } from 'react-icons/hi';
import styles from "./Booking.module.css";
import baseAxios from "../../../../Config";

const BookingCard = ({ data }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(data)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.CardContainer}>
      <div>
        <img className={styles.cardLogo} src={data?.residenceId?.photo[0]?.publicFileUrl} alt="" />
      </div>
      <div className={styles.cardDescription}>
        <div>
          <div className={styles.statusContainer}>
            <h1>{data.residenceId?.residenceName}</h1>{" "}
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
            <span style={{ marginLeft: "3px" }}>({data.rating})</span>
          </div>
        </div>
        <div>
          <p>Booking ID: #{data.bookingId}</p>
          <p>Booking Date: {data.createdAt?.slice(0, 10)}</p>
          <p>User Name: {data?.userId?.fullName}</p>
          <p>Total Persons: {data.numberOfGuests}</p>
          <p>Owner Name: {data.hostId.fullName}</p>
        </div>
        <Button onClick={showModal} className={styles.ViewDetailsBtn}>
          View Details
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        width={1000}
        onCancel={handleCancel}
        centered
        footer={[]}
      >
        <div className={styles.modalContainer}>
          <h1 style={{ fontSize: "30px" }}>Booking Id: #{data.bookingId}</h1>
          <p style={{ paddingBottom: "10px", color: "#5A5A5A" }}>
            See all information about Booking ID: #{data.bookingId}
          </p>
          <hr />
          <div className={styles.userModalTitle}>
            <img className={styles.modalImage} src={data?.residenceId?.photo[0]?.publicFileUrl} alt="" />
            <div className={styles.userTitle}>
              <div>
                <div className={styles.statusContainer}>
                  <h1>{data.residenceId?.residenceName}</h1>{" "}
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
                  <span style={{ marginLeft: "3px" }}>({data.rating})</span>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <p><HiOutlineLocationMarker></HiOutlineLocationMarker> {data.residenceId?.address}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div className={styles.userDetails}>
              <h1>Booking Information</h1>
              <p>Booking ID: #{data.bookingId}</p>
              <p>Booking Date: {data.createdAt?.slice(0, 10)}</p>
              <p>User Name: {data?.userId?.fullName}</p>
              <p>Total Persons: {data.numberOfGuests}</p>
              <p>Total Amount: ${data.totalAmount}</p>
            </div>

            <hr />
            <div style={{ paddingBottom: "15px" }}>
              <h2>Owner Information</h2>
              <p>Owner Name: {data.hostId.fullName}</p>
              <p>Owner Contact: {data.hostId.phoneNumber}</p>
            </div>
            <div>
              <Button className={styles.modalBtn}>Print</Button>
              <Button className={styles.modalBtn1}>Download</Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingCard;

