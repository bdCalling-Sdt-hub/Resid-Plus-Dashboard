import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Pagination, Spin } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./AdminInfo.module.css";
import UserCard from "../UserInfo/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { HashLoader } from "react-spinners";
import ShowingPegination from "../../../Components/ShowingPegination/ShowingPegination";
import { Link } from "react-router-dom";
import { AdminInformationData } from "../../../ReduxSlices/AdminInformationSlice";
import AdminCard from "./AdminCard";

function AdminInfo() {
  const [searchData, setSearchData] = useState("");
  const pageSize = 5;
  const [reload, setReload] = useState(1);
  const data = useSelector((state) => state.AdminInformationData.AdminInfoList);
  console.log(data);


  const dataPagination = useSelector(
    (state) => state.AdminInformationData.pagination
  );
  const isLoading = useSelector((state) => state.AdminInformationData.Loading);

  const dispatch = useDispatch();

  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    let data = {
      search: searchData,
      page: 1,
    };
    if (searchData === "") {
      dispatch(AdminInformationData(data));
    }
  }, [searchData, reload]);

  const userDataGetByPagination = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData === "") {
      dispatch(AdminInformationData(data));
    }
  };

  const userDataGetBySearch = (page) => {
    let data = {
      search: searchData,
      page: page,
    };
    if (searchData !== "") {
      dispatch(AdminInformationData(data));
    }
  };

  return (
    <>
      {!isLoading ? (
        <div style={{ padding: "0 10px" }}>
          <Row justify="space-between" align="middle" style={{ marginBottom : "10px"}}>
            <div>
              <h2 className={styles.adminSectionText}>Admin Section</h2>
            </div>
            <div>
              <div>
                {/* Add Admin Button */}
                <Link to="/add-admin">
                  <Button type="primary" className="btn-admin">
                    <PlusOutlined /> Add Admin
                  </Button>
                </Link>
              </div>
            </div>
          </Row>
          <Row style={{ marginBottom : "10px"}}>
            <Col lg={{ span: 24 }}>
              <div className={styles.SearchOption}>
                {/* Search Input */}
                <Input
                  onChange={(e) => setSearchData(e.target.value)}
                  value={searchData}
                  size="large"
                  style={{ border: "1px solid #787878" }}
                  placeholder={t("user.placeholderSearch")}
                  prefix={<SearchOutlined style={{ color: "#cccccc" }} />}
                />
                
                {/* Search Button */}
                <Button onClick={() => userDataGetBySearch(1)} className="btn">
                  {t("user.searchBtn")}
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <div className={styles.UserCardContainer}>
              {data.map((item) => (
                <AdminCard key={item._id} setReload={setReload} data={item} />
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

export default AdminInfo;
