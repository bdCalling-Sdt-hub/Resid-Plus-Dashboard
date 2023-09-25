import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import "./DashboardHome.css";
import DailyRentChart from "./dailyRentChart";
import { useDispatch, useSelector } from "react-redux";
import { DashboardHomeData } from "../../../ReduxSlices/DashboardHomeSlice";

function DashboardHome() {
  const onChange = (pageNumber) => {
    console.log("Page: ", pageNumber);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(DashboardHomeData());
  }, []);

  const data = useSelector((state) => state.DashboardHomeData?.bookings?.monthlyCounts)
  const status = useSelector((state) => state.DashboardHomeData?.bookings?.status)
  console.log(status)

  return (
    <div>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>Booking Status</h1>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
          <div className='completed-card'>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "100", marginTop: "30px", marginBottom: "30px" }}><LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Completed</h1>
            <h3 style={{ fontSize: "1.5rem", letterSpacing: ".2rem", marginBottom: "15px" }}>{status?.completed}</h3>
          </div>
        </Col>
        <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
          <div className='reserved-card'>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "100", marginTop: "30px", marginBottom: "30px" }}><LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Reserved</h1>
            <h3 style={{ fontSize: "1.5rem", letterSpacing: "1px", marginBottom: "15px" }}>{status?.reserved}</h3>
          </div>
        </Col>
        <Col className="gutter-row" style={{ marginBottom: "10px" }} xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 8 }} lg={{ span: 8 }}>
          <div className='canceled-card'>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "100", marginTop: "30px", marginBottom: "30px" }}><LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Canceled</h1>
            <h3 style={{ fontSize: "1.5rem", letterSpacing: "1px", marginBottom: "15px" }}>{status?.cancelled}</h3>
          </div>
        </Col>
      </Row>


      <Row style={{ marginTop: "20px" }} gutter={24}>
        <Col lg={{ span: 24 }}>
          <DailyRentChart
            data={data} />
        </Col>
        {/* <Col lg={{ span: 12 }}>
          <div
            className=""
            style={{
              border: "3px solid #000b90",
              padding: "30px",
              borderRadius: "15px",
              backgroundColor: "#fff",
            }}
          >
            <h1 style={{ color: "#000b90" }}>Most using car</h1>
            <MostRentCarChart />
          </div>
        </Col> */}
      </Row>

      {/* <Row>
        <h2
          style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}
        >
          Recent Earnings
        </h2>
      </Row>
      <InvoiceTable /> */}
    </div>
  );
}

export default DashboardHome;
