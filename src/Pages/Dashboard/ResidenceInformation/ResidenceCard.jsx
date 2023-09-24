import { Button, Modal } from "antd";
import styles from "./ResidenceInformation.module.css";
import React, { useState } from "react";
import { StarFilled } from "@ant-design/icons";

function ResidenceCard({ data }) {
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
        <img
          className={styles.cardLogo}
          src={data?.photo[0]?.publicFileUrl}
          alt=""
        />
      </div>
      <div className={styles.cardDescription}>
        <div>
          <div className={styles.statusContainer}>
            <h1>{data.residenceName}</h1>{" "}
            {data.status == "active" ? (
              <span className={styles.active}>Active</span>
            ) : (
              <span className={styles.reserved}>Reserved</span>
            )}
          </div>
          <div>
            <StarFilled style={{ color: "#FBA91D" }} />
            <span style={{ marginLeft: "3px" }}>({data.rating || 0.0})</span>
          </div>
        </div>
        <div>
          <p>Person/Capacity: {data.capacity}</p>
          <p>Beds: {data.beds}</p>
          <p>Baths: {data.baths}</p>
          <p>Rent/hr: {data.hourlyAmount}</p>
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
          <h1>Residence information</h1>
          <hr />
          <div className={styles.userModalTitle}>
            <img
              className={styles.modalImage}
              src={data?.photo[0]?.publicFileUrl}
              alt=""
            />
            <div className={styles.userTitle}>
              <div>
                <div className={styles.statusContainer}>
                  <h1>{data.residenceName}</h1>{" "}
                  {data.status ? (
                    <span className={styles.active}>Active</span>
                  ) : (
                    <span className={styles.reserved}>Reserved</span>
                  )}
                </div>
                <div>
                  <StarFilled style={{ color: "#FBA91D" }} />
                  <span style={{ marginLeft: "3px" }}>
                    ({data.rating || 0.0})
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div>
            <div className={styles.userDetails}>
              <h1>Details</h1>
              <p>Person/Capacity: {data.capacity}</p>
              <p>Beds: {data.beds}</p>
              <p>Baths: {data.baths}</p>
              <p>
                Address: {data.address}, {data.city}, {data.municipality}
              </p>
              <p>Rent/hr: {data.hourlyAmount}</p>
            </div>
            <hr />
            <div className={styles.about}>
              <h4>About this residence</h4>
              <p style={{ width: "700px" }} className={styles.aboutResidence}>
                {data.aboutResidence}
              </p>
            </div>
            <hr />
            <div>
              <h2>Owner Information</h2>
              <p>Owner Name: {data.ownerName}</p>
              <h4>About this residence</h4>
              <p style={{ width: "700px" }} className={styles.aboutResidence}>
                {data.aboutResidence}
              </p>
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

export default ResidenceCard;
