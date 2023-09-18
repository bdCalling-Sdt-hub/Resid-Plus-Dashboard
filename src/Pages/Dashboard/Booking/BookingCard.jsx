import { Button, Modal } from "antd";
import React, { useState } from "react";
import { StarFilled } from "@ant-design/icons";
import styles from "./Booking.module.css";

function BookingCard({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        <img className={styles.cardLogo} src={data.image} alt="" />
      </div>
      <div className={styles.cardDescription}>
        <div>
          <div className={styles.statusContainer}>
            <h1>{data.productName}</h1>{" "}
            {data.status === "A" ? (
              <span className={styles.active}>Completed</span>
            ) : data.status === "B" ? (
              <span className={styles.reserved}>Reserved</span>
            ) : data.status === "C" ? (
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
          <p>Booking Date: {data.bookingDate}</p>
          <p>User Name: {data.userName}</p>
          <p>Total Persons: {data.totalPersons}</p>
          <p>Owner Name: {data.ownerName}</p>
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
            <img className={styles.modalImage} src={data.image} alt="" />
            <div className={styles.userTitle}>
              <div>
                <div className={styles.statusContainer}>
                  <h1>{data.productName}</h1>{" "}
                  {data.status === "A" ? (
                    <span className={styles.active}>Completed</span>
                  ) : data.status === "B" ? (
                    <span className={styles.reserved}>Reserved</span>
                  ) : data.status === "C" ? (
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
            </div>
          </div>
          <hr />
          <div>
            <div className={styles.userDetails}>
              <h1>Booking Information</h1>
              <p>Booking ID: #{data.bookingId}</p>
              <p>Booking Date: {data.bookingDate}</p>
              <p>User Name: {data.userName}</p>
              <p>Total Persons: {data.totalPersons}</p>
              <p>Total Amount: ${data.price}</p>
            </div>

            <hr />
            <div style={{paddingBottom:"15px"}}>
              <h2>Owner Information</h2>
              <p>Owner Name: {data.ownerName}</p>
              <p>Owner Contact: {data.ownerContact}</p>
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
}

export default BookingCard;
