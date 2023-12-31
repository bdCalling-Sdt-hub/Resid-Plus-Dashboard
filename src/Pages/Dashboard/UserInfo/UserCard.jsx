import { Button, Modal } from "antd";
import styles from "./UserInfo.module.css";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";

function UserCard({ data, setReload }) {
  const componentRef = useRef();
  const token = localStorage.getItem("token");
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "",
  });
  const [t, i18n] = useTranslation("global");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
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

  const handleSuspend = () => {
    console.log("Suspend");
    baseAxios
      .patch(
        `api/users/update-status/${data._id}?requestType=suspend`,
        { status: "suspended" },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("User suspended successfully");
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: true,
        });
        setReload((prev) => prev + 1);
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to suspend user", error);
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      });
  };
  const handleBan = () => {
    console.log("Ban");
    baseAxios
      .patch(
        `api/users/update-status/${data._id}?requestType=ban`,
        {
          status: "banned",
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Handle success
        console.log("User banned successfully");
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: true,
        });
        setReload((prev) => prev + 1);
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to ban user", error);
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      });
  };

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
          <p>Role: {data.role}</p>
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
        <div style={{ display: "flex", columnGap: "10px" }}>
          <Button onClick={showModal} className={styles.cardBtn}>
            {t("host.viewDetails")}
          </Button>
          <Button onClick={handleSuspend} className={styles.suspendedBtn}>
            Suspended
          </Button>
          <Button onClick={handleBan} className={styles.bannedBtn}>
            Banned
          </Button>
        </div>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} centered footer={[]}>
        <div ref={componentRef} className={styles.modalContainer}>
          <h1> {t("user.modalInfo")}</h1>
          <hr />
          <div className={styles.userModalTitle}>
            <img
              className={styles.modalImage}
              src={
                data.image?.publicFileUrl ||
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
          </div>
        </div>
        <div>
          <Button onClick={handlePrint} className={styles.modalBtn}>
            {" "}
            {t("user.printBtn")}
          </Button>
          <Button onClick={handlePrint} className={styles.modalBtn1}>
            {" "}
            {t("user.downloadBtn")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default UserCard;
