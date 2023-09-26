import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Pagination, Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./UserInfo.module.css";
import UserCard from "./UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";
import { UserInformationData } from "../../../ReduxSlices/UserInformationSlice";
import ShowingPegination from "../../../Components/ShowingPegination/ShowingPegination";

function UserInfo() {
  const [searchData, setSearchData] = useState("");
  const pageSize = 3;
  const [reload, setReload] = useState(1);
  const data = useSelector((state) => state.UserInformationData.UserInfoList);
  const dataPagination = useSelector(
    (state) => state.UserInformationData.pagination
  );
  const isLoading = useSelector((state) => state.UserInformationData.Loading);

  // console.log(dataPagination);

  const dispatch = useDispatch();

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    let data = {
      search: searchData,
      page: 1,
    };
    if (searchData === "") {
      dispatch(UserInformationData(data));
    }
  }, [searchData, reload]);

  const userDataGetByPagination = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData == "") {
      dispatch(UserInformationData(data));
      console.log("without search");
    }
  };

  const userDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData != "") {
      dispatch(UserInformationData(data));
      console.log("with search");
    }
  };

  // const userInfoList = useSelector((state) => state.UserInformationData.UserInfoList);
  // console.log(userInfoList);

  return (
    <>
      {!isLoading ? (
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
                  onChange={(e) => setSearchData(e.target.value)}
                  value={searchData}
                  size="large"
                  style={{ border: "1px solid #787878" }}
                  placeholder={t("user.placeholderSearch")}
                  prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
                />
                <Button onClick={userDataGetBySearch} className="btn">
                  {" "}
                  {t("user.searchBtn")}
                </Button>
              </div>
            </Col>
          </Row>

          <Row>
            <h2
              style={{
                fontSize: "25px",
                margin: "30px 0px",
                fontWeight: "normal",
              }}
            >
              {t("user.title")}
            </h2>
          </Row>
          <Row>
            <div className={styles.UserCardContainer}>
              {data.map((item) => (
                <UserCard key={item._id} data={item} />
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
                    defaultCurrent={1}
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

export default UserInfo;
