import { Col, Row, Pagination } from "antd";
import React from "react";
import "./Residence.css";
import ResidenceCard from "./ResidenceCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./ResidenceInformation.module.css";
import { useTranslation } from "react-i18next";
import { ResidenceInformationData } from "../../../ReduxSlices/ResidenceInformationSlice";
import { use } from "i18next";
import baseAxios from "../../../../Config";

function CarInformation() {
  const pageSize = 3;
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

  console.log(statusData);

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
    if (searchData == "") {
      dispatch(ResidenceInformationData(data));
      console.log("without search");
    }
  };

  return (
    <div style={{ padding: "0 10px" }}>
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
            {dataPagination.totalDocuments}
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
              {statusData?.active}
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
              {statusData?.reserved}
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
              <p style={{ color: "#333333" }}>Showing 1-10 OF {dataPagination.totalDocuments}</p>
            </Col>
            <Col>
              <Pagination
                pageSize={pageSize}
                defaultCurrent={1}
                onChange={userDataGetByPagination}
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

export default CarInformation;
