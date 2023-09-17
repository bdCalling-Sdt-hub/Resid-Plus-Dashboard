import { Col, Row } from "antd";
import React from "react";
import "./Residence.css";
import ResidenceCard from "./ResidenceCard";

const data = [
  {
    id: 1,
    name: "John Brown",
    productName: "BMW",
    status: true,
    capacity: 4,
    beds: 2,
    baths: 5,
    price: 200,
    address: "New York No. 1 Lake Park",
    image: "https://i.ibb.co/F7Fdtzd/Rectangle-32.png",
    aboutResidence:
      "Lorem ipsum dolor sit amet magna tempus  dis volutpat ullamcorper in. Class vivamus commodo nunc suscipit venenatis. Potenti hac  morbi sapien auctor tincidunt mauris. Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "John Brown",
    productName: "Car",
    status: false,
    capacity: 4,
    beds: 2,
    baths: 9,
    price: 200,
    address: "New York No. 1 Lake Park",
    image: "https://i.ibb.co/F7Fdtzd/Rectangle-32.png",
    aboutResidence:
      "Lorem ipsum dolor sit amet magna tempus  dis volutpat ullamcorper in. Class vivamus commodo nunc suscipit venenatis. Potenti hac  morbi sapien auctor tincidunt mauris. Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.",
    rating: 4.5,
  },
  {
    id: 3,
    name: "John Brown",
    productName: "Tesla X2",
    status: false,
    capacity: 4,
    beds: 25,
    baths: 8,
    price: 200,
    address: "New York No. 1 Lake Park",
    image: "https://i.ibb.co/F7Fdtzd/Rectangle-32.png",
    aboutResidence:
      "Lorem ipsum dolor sit amet magna tempus  dis volutpat ullamcorper in. Class vivamus commodo nunc suscipit venenatis. Potenti hac  morbi sapien auctor tincidunt mauris. Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.",
    rating: 4.5,
  },
  {
    id: 4,
    name: "John Brown",
    productName: "Car",
    status: true,
    capacity: 4,
    beds: 2,
    baths: 2,
    price: 200,
    address: "New York No. 1 Lake Park",
    image: "https://i.ibb.co/F7Fdtzd/Rectangle-32.png",
    aboutResidence:
      "Lorem ipsum dolor sit amet magna tempus  dis volutpat ullamcorper in. Class vivamus commodo nunc suscipit venenatis. Potenti hac  morbi sapien auctor tincidunt mauris. Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.Congue tristique parturient tempor mattis felis nisi commodo. Pharetra dignissim augue duis pulvinar  nisl ornare. Proin massa ornare feugiat augue tortor.",
    rating: 4.5,
  },
];

function CarInformation() {
  return (
    <div style={{ padding: "0 60px" }}>
      <Row>
        <h3
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          Residence Information
        </h3>
      </Row>

      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <div className="car-card total">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Total Residence
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: ".2rem",
                marginBottom: "15px",
              }}
            >
              512
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
          <div className="car-card active">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Active
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              112
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
          <div className="car-card reserved">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "300",
                marginTop: "15px",
                marginBottom: "15px",
              }}
            >
              Reserved
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
      </Row>

      <Row>
        <h2
          style={{
            fontSize: "25px",
            marginBottom: "10px",
            fontWeight: "normal",
          }}
        >
          Car Details
        </h2>
      </Row>

      <Row>
        {data.map((item) => (
          <ResidenceCard key={item.id} data={item} />
        ))}
      </Row>
    </div>
  );
}

export default CarInformation;
