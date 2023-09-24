import { Button, Modal } from "antd";
import styles from "./UserInfo.module.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function UserCard({ data }) {
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
          src={
            data.image?.publicFileUrl ||
            "https://i.ibb.co/cbDmQzv/photo-1535713875002-d1d0cf377fde.jpg"
          }
          alt=""
        />
      </div>
      <div className={styles.cardDescription}>
        <h1>{data.fullName}</h1>
        <div>
          <p>
            {" "}
            {t("user.email")}: {data.email}
          </p>
          <p>
            {" "}
            {t("user.JoiningDate")}: {formattedDate}
          </p>
          <p>
            {" "}
            {t("user.contact")}: {data.phoneNumber}
          </p>
          <p>
            {" "}
            {t("user.address")}: {data.address}
          </p>
        </div>
        <Button onClick={showModal} className={styles.searchBtn}>
          {t("user.viewDetails")}
        </Button>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} centered footer={[]}>
        <div className={styles.modalContainer}>
          <h1> {t("user.modalInfo")}</h1>
          <hr />
          <div className={styles.userModalTitle}>
            <img
              className={styles.modalImage}
              src={
                data.image ||
                "https://i.ibb.co/cbDmQzv/photo-1535713875002-d1d0cf377fde.jpg"
              }
              alt=""
            />
            <div className={styles.userTitle}>
              <h1>{data.fullName}</h1>
              <p>
                {" "}
                {t("user.bookComplete")}: {data.BookingCompleted || 0}
              </p>
            </div>
          </div>
          <hr />
          <div>
            <div className={styles.userDetails}>
              <h1> {t("user.modalDetails")}</h1>
              <p>
                {" "}
                {t("user.email")}: {data.email}
              </p>
              <p>
                {" "}
                {t("user.JoiningDate")}: {formattedDate}
              </p>
              <p>
                {" "}
                {t("user.contact")}: {data.phoneNumber}
              </p>
              <p>
                {" "}
                {t("user.address")}: {data.address}
              </p>
            </div>
            <div>
              <Button className={styles.modalBtn}> {t("user.printBtn")}</Button>
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

export default UserCard;
