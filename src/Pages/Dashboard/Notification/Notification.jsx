import { Col, Divider, Pagination, Row } from "antd";
import React from "react";
import "./Notification.css";

function Notification() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));

  return (
    <div>
      <Row>
        <h2
          style={{
            fontSize: "30px",
            marginBottom: "30px",
            background: "black;",
          }}
        >
          All Notifications
        </h2>

        {[...Array(5).keys()].map((_, index) => {
          return (
            <Col lg={{ span: 24 }}>
              <div
                className="single-notification"
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="user-image" style={{ marginRight: "50px" }}>
                  <img
                    style={{
                      height: "70px",
                      width: "70px",
                      borderRadius: "100%",
                      border: "2px solid gray",
                    }}
                    src={userFromLocalStorage?.image?.publicFileUrl}
                  />
                </div>
                <div className="">
                  <p>
                    <span>Sanchez haro manuel</span> start a new trip at 5pm.
                    Trip No.56. Trip started from Mexico city.....
                  </p>
                  <p style={{ color: "gray", marginTop: "10px" }}>1hr ago</p>
                </div>
              </div>

              <Divider />
            </Col>
          );
        })}
      </Row>
      <Row>
        <Col lg={{ span: 12 }} style={{ marginBottom: "20px" }}>
          <p style={{ color: "#333333" }}>Showing 1-10 OF 250</p>
        </Col>
        <Col lg={{ span: 8, offset: 4 }}>
          <Pagination
            defaultCurrent={1}
            total={20}
            showQuickJumper={false}
            showSizeChanger={false}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Notification;
