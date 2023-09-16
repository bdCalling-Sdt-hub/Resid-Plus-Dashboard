import { Button, Modal } from "antd";
import styles from "./UserInfo.module.css";
import React, { useState } from "react";

function UserCard({ data }) {
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
        <h1></h1>
        <div>
          <p>Email: {data.email}</p>
          <p>Joining Date: {data.joinDate}</p>
          <p>Contact: {data.phone}</p>
          <p>Address: {data.address}</p>
        </div>
        <Button onClick={showModal} className={styles.searchBtn}>
          View Details
        </Button>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} centered footer={[]}>
        <div className={styles.modalContainer}>
          <h1>User information</h1>
          <hr />
          <div className={styles.userModalTitle}>
            <img className={styles.modalImage} src={data.image} alt="" />
            <div className={styles.userTitle}>
              <h1>{data.name}</h1>
              <p>Booking Completed: {data.BookingCompleted}</p>
            </div>
          </div>
          <hr />
          <div>
            <div className={styles.userDetails}>
              <h1>Details</h1>
              <p>Email: {data.email}</p>
              <p>Joining Date: {data.joinDate}</p>
              <p>Contact: {data.phone}</p>
              <p>Address: {data.address}</p>
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

export default UserCard;
