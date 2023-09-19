import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Pagination } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./UserInfo.module.css";
import UserCard from "./UserCard";

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

function UserInfo() {
  const [t, i18n] = useTranslation("global");
  return (
    <div style={{ padding: "0 10px" }}>
      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          {t("user.search")}
        </h2>
        <Col lg={{ span: 24 }}>
          <div className={styles.SearchOption}>
            <Input
              size="large"
              style={{ border: "1px solid #787878" }}
              placeholder={t("user.placeholderSearch")}
              prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
            />
            <Button className="btn"> {t("user.searchBtn")}</Button>
          </div>
        </Col>
      </Row>

      <Row>
        <h2
          style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
        >
          {t("user.title")}
        </h2>
      </Row>
      <Row>
        <div className={styles.UserCardContainer}>
          {data.map((item) => (
            <UserCard key={item.id} data={item} />
          ))}
          <Row className={styles.Pagination}>
            <Col>
              <p style={{ color: "#333333" }}>Showing 1-10 OF 250</p>
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
      </Row>
    </div>
  );
}

export default UserInfo;
