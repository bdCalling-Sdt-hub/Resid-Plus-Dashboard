import { Col, Row, Pagination, Spin } from "antd";
import React from "react";
import "./Residence.css";
import ResidenceCard from "./ResidenceCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./ResidenceInformation.module.css";
import { HashLoader } from "react-spinners";
import { useTranslation } from "react-i18next";
import { ResidenceInformationData } from "../../../ReduxSlices/ResidenceInformationSlice";
import { use } from "i18next";
import baseAxios from "../../../../Config";
import ShowingPegination from "../../../Components/ShowingPegination/ShowingPegination";

function CarInformation() {
  const pageSize = 5;
  const [reload, setReload] = useState(1);
  const dispatch = useDispatch();
  const [residenceStatus, setResidenceStatus] = useState({});
  const [t, i18n] = useTranslation("global");
  const data = useSelector(
    (state) => state.ResidenceInformationData.ResidenceInfoList
  );
  const dataPagination = useSelector(
    (state) => state.ResidenceInformationData.pagination
  );
  const statusData = useSelector(
    (state) => state.ResidenceInformationData.status
  );

  const isLoading = useSelector(
    (state) => state.ResidenceInformationData.Loading
  );

  console.log("gfuy", isLoading);

  useEffect(() => {
    let token = localStorage.getItem("token");
    baseAxios
      .get(`/api/residence/dashboard/status`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setResidenceStatus(res.data.data.attributes);
      });
  }, [setResidenceStatus]);

  useEffect(() => {
    let data = {
      page: 1,
    };

    dispatch(ResidenceInformationData(data));
  }, [reload]);

  const userDataGetByPagination = (page) => {
    let data = {
      page: page,
    };
    dispatch(ResidenceInformationData(data));
  };

  return (
    <>
      {!isLoading ? (
        <div style={{ padding: "0 10px" }}>
          <Row>
            <h3
              style={{
                fontSize: "30px",
                marginBottom: "20px",
                fontWeight: "600",
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
              md={{ span: 8 }}
              lg={{ span: 8 }}
            >
              <div style={{ background: "#333333" }} className="car-card total">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    Total Residence
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
                  {dataPagination.totalDocuments}
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
              <div className="car-card active">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                    Active
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
                  {statusData?.active}
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
              <div className="car-card reserved">
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
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
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
                  {statusData?.reserved}
                </h3>
              </div>
            </Col>
          </Row>

          <Row>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              Residence Details
            </h2>
          </Row>

          <Row>
            <div className={styles.UserCardContainer}>
              {data.map((item) => (
                <ResidenceCard key={item._id} data={item} />
              ))}
              <Row className={styles.Pagination}>
                <Col>
                  <p style={{ color: "#333333" }}>
                    {" "}
                    <ShowingPegination pagination={dataPagination} />
                  </p>
                </Col>
                <Col>
                  <Pagination
                    pageSize={pageSize}
                    defaultCurrent={dataPagination.currentPage}
                    onChange={userDataGetByPagination}
                    total={dataPagination.totalDocuments}
                    showQuickJumper={false}
                    showSizeChanger={false}
                  />
                </Col>
              </Row>
            </div>
          </Row>
        </div>
      ) : (
        <HashLoader
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30%",
          }}
          color="#1f1c1c"
          size={50}
        />
      )}
    </>
  );
}

export default CarInformation;
