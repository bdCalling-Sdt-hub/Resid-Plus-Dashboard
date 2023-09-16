import { Button, Col, Input, Row } from "antd";
import React from "react";
import img from "../../../Images/Photo.png";

const HostRequest = () => {
  const style = {
    cardStyle: {
      background: "#E6E7F4",
      padding: "15px",
      textAlign: "center",
      borderRadius: "10px",
    },
    cardBtn: {
      color: "white",
    },
  };
  const items = [
    [
      {
        id: 1,
        name: "Fahim",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 2,
        name: "Kate",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 3,
        name: "Berlin",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 4,
        name: "Tokyo",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 5,
        name: "Nairobi",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 6,
        name: "Denver",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 7,
        name: "Hulk",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 8,
        name: "Harry",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 9,
        name: "Jack",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 10,
        name: "Sparrow",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 11,
        name: "Professor",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
      {
        id: 12,
        name: "M",
        email: "fahim25@gmail.com",
        contact: "05454154154",
        img: { img },
      },
    ],
  ];
  return (
    <div style={{ padding: "0px 60px" }}>
      <h2
        style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "normal" }}
      >
        Host Request
      </h2>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Input style={{ height: "44px" }} />
        <Button
          style={{
            background: "#000B90",
            color: "white",
            height: 45,
            width: "180px",
          }}
        >
          Search
        </Button>
      </div>

      <h2
        style={{
          fontSize: "25px",
          marginTop: "50px",
          marginBottom: "20px",
          fontWeight: "normal",
        }}
      >
        Show all host request
      </h2>
      <div
        style={{ background: "white", padding: "30px", borderRadius: "10px" }}
      >
        <Row gutter={[16, 16]}>
          {[...Array(12).keys()].map((item) => {
            return (
              <>
                <Col span={6}>
                  <div style={style.cardStyle}>
                    <img src={img} alt="" />
                    <h2 style={{ color: "#000B90", marginBottom: "5px" }}>
                      Jack Sparrow
                    </h2>
                    <p>jacks20@gmail.com</p>
                    <p style={{ margin: "8px 0" }}>+8478448548</p>
                    <div>
                      <Button
                        className={style.cardBtn}
                        style={{
                          background: "#D7263D",
                          ...style.cardBtn,
                          marginRight: "10px",
                        }}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{ background: "#000B90", ...style.cardBtn }}
                      >
                        Approve
                      </Button>
                    </div>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default HostRequest;
