import { Button, Modal } from "antd";
import React, { useState } from "react";
import styles from "./Host.module.css";
import { useTranslation } from "react-i18next";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";

function HostCard({ data, setReload }) {
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
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
        <div style={{ display: "flex", columnGap: "10px" }}>
          {" "}
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
          <h1> {t("host.modalInfo")}</h1>
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
          </div>
        </div>
        <div>
          <Button onClick={handlePrint} className={styles.modalBtn}>
            {t("user.printBtn")}
          </Button>
          <Button onClick={handlePrint} className={styles.modalBtn1}>
            {t("user.downloadBtn")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default HostCard;
