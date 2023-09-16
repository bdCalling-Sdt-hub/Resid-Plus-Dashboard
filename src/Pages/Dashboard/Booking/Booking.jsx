import { Col, Row } from "antd";
import React from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import EarnHistoryTable from "./EarnHistoryTable";
import style from "./Earning.module.css";

const Booking = () => (
  <div style={{ padding: "0px 50px" }}>
    <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>Bookings</h2>
    <Row gutter={16} style={{ marginTop: "20px" }}>
      <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
        <div className='completed-card'>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "100", marginTop: "30px", marginBottom: "30px" }}><LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Completed</h1>
          <h3 style={{ fontSize: "1.5rem", letterSpacing: ".2rem", marginBottom: "15px" }}>250</h3>
        </div>
      </Col>
      <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
        <div className='reserved-card'>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "100", marginTop: "30px", marginBottom: "30px" }}><LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Reserved</h1>
          <h3 style={{ fontSize: "1.5rem", letterSpacing: "1px", marginBottom: "15px" }}>250</h3>
        </div>
      </Col>
      <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
        <div className='canceled-card'>
          <h1 style={{ fontSize: "1.5rem", fontWeight: "100", marginTop: "30px", marginBottom: "30px" }}><LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Canceled</h1>
          <h3 style={{ fontSize: "1.5rem", letterSpacing: "1px", marginBottom: "15px" }}>$ 250</h3>
        </div>
      </Col>
    </Row>
    
    <h2 style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}>
      Transactions History
    </h2>

    <EarnHistoryTable />
  </div>
);

export default Booking;
