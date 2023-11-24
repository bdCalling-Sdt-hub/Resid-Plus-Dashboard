import { Button, Col } from "antd";
import React from "react";
import Swal from "sweetalert2";
import baseAxios from "../../../../Config";

const BannedCard = ({ user, setReload }) => {
  const token = localStorage.getItem("token");

  const handleAccept = () => {
    console.log("accept");
    baseAxios
      .patch(
        `api/users/update-status/${user._id}?requestType=accept`,
        { status: "accepted" },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showConfirmButton: true,
        });
        setReload((prev) => prev + 1);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      });
  };

  const style = {
    cardStyle: {
      background: "#e8e6e6 ",
      padding: "15px",
      textAlign: "center",
      borderRadius: "10px",
    },
    cardBtn: {
      color: "white",
    },
  };

  return (
    <Col span={8}>
      <div style={style.cardStyle}>
        <img
          style={{ width: "130px", borderRadius: "50%" }}
          src={user?.image?.publicFileUrl}
          alt=""
        />
        <h2 style={{ color: "black", marginBottom: "5px" }}> {user.fullName}</h2>
        <p>{user?.email}</p>
        <p style={{ margin: "8px 0" }}>{user?.phoneNumber}</p>
        <div>
          <Button
            onClick={handleAccept}
            className={style.cardBtn}
            style={{
              background: "green",
              ...style.cardBtn,
              marginRight: "10px",
            }}
          >
            Un-Banned
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default BannedCard;
