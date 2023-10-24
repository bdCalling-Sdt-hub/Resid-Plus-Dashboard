

import { Button, Col } from "antd";
import React from "react";
import Swal from "sweetalert2";

const BannedCard = () => {
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
          src="https://i.ibb.co/8cVj49n/alex-suprun-ZHv-M3-XIOHo-E-unsplash-1.jpg"
          alt=""
        />
        <h2 style={{ color: "black", marginBottom: "5px" }}>Sahinur silam</h2>
        <p>ulululu@gmai.com</p>
        <p style={{ margin: "8px 0" }}>+88454545454521</p>
        <div>
          <Button
            //   onClick={handleBlockCancel}
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
