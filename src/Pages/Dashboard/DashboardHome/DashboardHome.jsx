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

  const data = useSelector(
    (state) => state.DashboardHomeData?.bookings?.monthlyCounts
  );
  const status = useSelector(
    (state) => state.DashboardHomeData?.bookings?.status
  );
  const isLoading = useSelector((state) => state.DashboardHomeData.Loading);
  console.log(status);

  return (
    <div>
      <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>Booking Status</h1>
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
        >
          <div className="completed-card">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginTop: "30px",
                  marginBottom: "30px",
                  alignItems: "center",
                  marginLeft: "8px",
                }}
              >
                Completed
              </h1>
            </div>
            <h3
              style={{
                fontSize: "40px",
                fontWeight: "700",
                letterSpacing: ".2rem",
                marginBottom: "15px",
              }}
            >
              {status?.completed}
            </h3>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
        >
          <div className="reserved-card">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginTop: "30px",
                  marginBottom: "30px",
                  marginLeft: "8px",
                }}
              >
                Reserved
              </h1>
            </div>

            <h3
              style={{
                fontSize: "40px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              {status?.reserved}
            </h3>
          </div>
        </Col>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 8 }}
          lg={{ span: 8 }}
        >
          <div className="canceled-card">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h1
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  marginTop: "30px",
                  marginBottom: "30px",
                  marginLeft: "8px",
                }}
              >
                Canceled
              </h1>
            </div>

            <h3
              style={{
                  fontSize: "40px",
                fontWeight: "700",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              {status?.cancelled}
            </h3>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }} gutter={24}>
        <Col lg={{ span: 24 }}>
          <DailyRentChart data={data} />
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
