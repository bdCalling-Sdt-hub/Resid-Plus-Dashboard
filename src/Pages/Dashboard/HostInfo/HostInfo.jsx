import { Button, Col, Input, Row, Pagination, Spin } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import HostCard from "./HostCard";
import styles from "./Host.module.css";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { HostInformationData } from "../../../ReduxSlices/HostInformationSlice";
import ShowingPegination from "../../../Components/ShowingPegination/ShowingPegination";
import { HashLoader } from "react-spinners";

function HostInfo() {
  const [searchData, setSearchData] = useState("");
  const pageSize = 5;
  const [reload, setReload] = useState(1);
  const dispatch = useDispatch();
  const [t, i18n] = useTranslation("global");
  const data = useSelector((state) => state.HostInformationData.HostInfoList);
  const dataPagination = useSelector(
    (state) => state.HostInformationData.pagination
  );

  const isLoading = useSelector((state) => state.HostInformationData.Loading);
  // console.log(data);

  useEffect(() => {
    let data = {
      search: searchData,
      page: 1,
    };
    if (searchData === "") {
      dispatch(HostInformationData(data));
    }
  }, [searchData, reload]);

  const userDataGetByPagination = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData == "") {
      dispatch(HostInformationData(data));
      console.log("without search");
    }
  };

  const userDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData != "") {
      dispatch(HostInformationData(data));
      console.log("with search");
    }
  };

  return (
    <>
      {!isLoading ? (
        <div style={{ padding: "0 10px" }}>
          <Row>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              {t("host.search")}
            </h2>
            <Col lg={{ span: 24 }}>
              <div className={styles.SearchOption}>
                <Input
                  onChange={(e) => setSearchData(e.target.value)}
                  value={searchData}
                  size="large"
                  style={{ border: "1px solid #787878" }}
                  placeholder={t("host.placeholderSearch")}
                  prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
                />
                <Button onClick={userDataGetBySearch} className="btn">
                  {" "}
                  {t("host.searchBtn")}
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <h2
              style={{
                margin: "30px 0px",
                fontSize: "30px",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              {t("host.title")}
            </h2>
          </Row>
          <Row>
            <div className={styles.UserCardContainer}>
              {data.map((item) => (
                <HostCard setReload={setReload} key={item._id} data={item} />
              ))}

              <Row className={styles.Pagination}>
                <Col>
                  <p style={{ color: "#333333" }}>
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

export default HostInfo;
