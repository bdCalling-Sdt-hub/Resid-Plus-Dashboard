import { Button, Col, Input, Row } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import HostCard from "./HostCard";
import styles from "./Host.module.css";

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

const HostInfo = () => (
  <div style={{ padding: "0 10px" }}>
    <Row>
      <h2
        style={{
          fontSize: "25px",
          marginBottom: "10px",
          fontWeight: "normal",
        }}
      >
        Search Host
      </h2>
      <Col lg={{ span: 24 }}>
        <div className="" style={{ display: "flex", gap: "15px" }}>
          <Input
            size="large"
            style={{ border: "1px solid #787878" }}
            placeholder="Search by name/email/phone"
            prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
          />
          <Button className="btn">Search</Button>
        </div>
      </Col>
    </Row>

    <Row>
      <h2
        style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
      >
        Host List
      </h2>
    </Row>
    <Row>
      <div className={styles.UserCardContainer}>
        {data.map((item) => (
          <HostCard key={item.id} data={item} />
        ))}
      </div>
    </Row>
  </div>
);

export default HostInfo;
