import { Col, Row,Pagination } from "antd";
import React from "react";
import styles from "./Booking.module.css";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import BookingHistoryTable from "./BookingHistoryTable";
import { Form, Select } from "antd";

const data = [
  {
    id: "1",
    name: "John Brown",
    email: "test@gmail.com",
    phone: "01700000000",
    address: "New York No. 1 Lake Park",
    joinDate: "2021-08-15",
    image: "https://i.ibb.co/txjPMvX/Max-R-Headshot-1.jpg",
    BookingCompleted: 5,
  },
  {
    id: "2",
    name: "John Brown",
    email: "test@gmail.com",
    phone: "01700000000",
    address: "New York No. 1 Lake Park",
    joinDate: "2021-08-15",
    image: "https://i.ibb.co/txjPMvX/Max-R-Headshot-1.jpg",
    BookingCompleted: 45,
  },
  {
    id: "3",
    name: "John Brown",
    email: "test@gmail.com",
    phone: "01700000000",
    address: "New York No. 1 Lake Park",
    joinDate: "2021-08-15",
    image: "https://i.ibb.co/txjPMvX/Max-R-Headshot-1.jpg",
    BookingCompleted: 8,
  },
  {
    id: "4",
    name: "John Brown",
    email: "test@gmail.com",
    phone: "01700000000",
    address: "New York No. 1 Lake Park",
    joinDate: "2021-08-15",
    image: "https://i.ibb.co/txjPMvX/Max-R-Headshot-1.jpg",
    BookingCompleted: 98,
  },
  {
    id: "5",
    name: "John Brown",
    email: "test@gmail.com",
    phone: "01700000000",
    address: "New York No. 1 Lake Park",
    joinDate: "2021-08-15",
    image: "https://i.ibb.co/txjPMvX/Max-R-Headshot-1.jpg",
    BookingCompleted: 1,
  },
];

const Booking = () => (
  <div style={{ padding: "0px 10px" }}>
    <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>Bookings</h2>
    <Row gutter={16} style={{ marginTop: "20px" }}>
      <Col
        className="gutter-row"
        style={{ marginBottom: "10px" }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
      >
        <div className="completed-card">
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "100",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Completed
          </h1>
          <h3
            style={{
              fontSize: "1.5rem",
              letterSpacing: ".2rem",
              marginBottom: "15px",
            }}
          >
            250
          </h3>
        </div>
      </Col>
      <Col
        className="gutter-row"
        style={{ marginBottom: "10px" }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
      >
        <div className="reserved-card">
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "100",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Reserved
          </h1>
          <h3
            style={{
              fontSize: "1.5rem",
              letterSpacing: "1px",
              marginBottom: "15px",
            }}
          >
            250
          </h3>
        </div>
      </Col>
      <Col
        className="gutter-row"
        style={{ marginBottom: "10px" }}
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 8 }}
      >
        <div className="canceled-card">
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "100",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Canceled
          </h1>
          <h3
            style={{
              fontSize: "1.5rem",
              letterSpacing: "1px",
              marginBottom: "15px",
            }}
          >
            $ 250
          </h3>
        </div>
      </Col>
    </Row>

    <h2 style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}>
      Booking History
    </h2>

    <div>
      <div className={styles.UserCardContainer}>
        <div className={styles.filterContainer}>
          <h3 className={styles.cardTitle}>Booking List/ August, 2023</h3>
          <Form.Item label="" className={styles.filterLabel}>
            <Select placeholder="Monthly Booking">
              <Option value="male">Augest/2023</Option>
              <Option value="female">September/2023</Option>
              <Option value="other">October/2023</Option>
            </Select>
          </Form.Item>
        </div>
        {data.map((item) => (
          <BookingHistoryTable key={item.id} data={item} />
        ))}
        <Row className={styles.Pagination}>
          <Col>
            <h1 style={{ fontSize: "20px", color: "#333333" }}>
              Showing 1-10 OF 250
            </h1>
          </Col>
          <Col>
            <Pagination
              defaultCurrent={1}
              total={5000}
              showQuickJumper={false}
              showSizeChanger={false}
            />
          </Col>
        </Row>
      </div>
    </div>

    {/* <BookingHistoryTable /> */}
  </div>
);

export default Booking;
