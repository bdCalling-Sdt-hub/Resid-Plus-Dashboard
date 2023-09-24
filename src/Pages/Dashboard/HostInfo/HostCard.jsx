import { Button, Modal } from "antd";
import React, { useState } from "react";
import styles from "./Host.module.css";
import { useTranslation } from "react-i18next";

function HostCard({ data }) {
  const [t, i18n] = useTranslation("global");
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

  const inputDateString = data.createdAt;

  const inputDate = new Date(inputDateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[inputDate.getMonth()];
  const day = inputDate.getDate();
  const year = inputDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;

  return (
    <div className={styles.CardContainer}>
      <div>
        <img
          className={styles.cardLogo}
          src={data.image || "https://i.ibb.co/YZbtRDR/Max-R-Headshot-1.jpg"}
          alt=""
        />
      </div>
      <div className={styles.cardDescription}>
        <h1>{data.fullName}</h1>
        <div>
          <p>
            {" "}
            {t("host.email")}: {data.email}
          </p>
          <p>
            {" "}
            {t("host.JoiningDate")}: {formattedDate}
          </p>
          <p>
            {" "}
            {t("host.contact")}: {data.phoneNumber}
          </p>
          <p>
            {" "}
            {t("host.address")}: {data.address}
          </p>
        </div>
        <Button onClick={showModal} className={styles.searchBtn}>
          {t("host.viewDetails")}
        </Button>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} centered footer={[]}>
        <div className={styles.modalContainer}>
          <h1> {t("host.modalInfo")}</h1>
          <hr />
          <div className={styles.userModalTitle}>
            <img
              className={styles.modalImage}
              src={
                data.image || "https://i.ibb.co/YZbtRDR/Max-R-Headshot-1.jpg"
              }
              alt=""
            />
            <div className={styles.userTitle}>
              <h1>{data.name}</h1>
              <p>
                {" "}
                {t("host.bookComplete")}: {data.BookingCompleted || 0}
              </p>
            </div>
          </div>
          <hr />
          <div>
            <div className={styles.userDetails}>
              <h1> {t("host.modalDetails")}</h1>
              <p>
                {" "}
                {t("host.email")}: {data.email}
              </p>
              <p>
                {" "}
                {t("host.JoiningDate")}: {formattedDate}
              </p>
              <p>
                {" "}
                {t("host.contact")}: {data.phoneNumber}
              </p>
              <p>
                {" "}
                {t("host.address")}: {data.address}
              </p>
            </div>
            <div>
              <Button className={styles.modalBtn}>{t("user.printBtn")}</Button>
              <Button className={styles.modalBtn1}>
                {" "}
                {t("user.downloadBtn")}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HostCard;
