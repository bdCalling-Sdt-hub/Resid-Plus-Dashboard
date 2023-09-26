import { Col, Row, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Booking.module.css";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BookingData } from "../../../ReduxSlices/BookingSlice";
import BookingCard from "../Booking/BookingCard";
import { HashLoader } from "react-spinners";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ShowingPegination from "../../../Components/ShowingPegination/ShowingPegination";
const monthFormat = "YYYY/MM";

const Booking = () => {
  const [checkingMonth, setCheckingMonth] = useState("");
  const dispatch = useDispatch();
  const pageSize = 2;

  const {} = useSelector((state) => state.BookingData);
  const data = useSelector((state) => state.BookingData?.bookings?.bookings);
  const status = useSelector((state) => state.BookingData?.bookings?.status);
  const pagination = useSelector((state) => state.BookingData.pagination);
  const isLoading = useSelector((state) => state.BookingData.Loading);

  useEffect(() => {
    let data = {
      search: checkingMonth,
      page: 1,
    };

    if (checkingMonth == "") {
      dispatch(BookingData(data));
    }
  }, [checkingMonth]);

  const bookingDataGetByPagination = (page) => {
    console.log("booking info", page);
    let data = {
      search: checkingMonth,
      page: page,
    };
    if (!checkingMonth) {
      dispatch(BookingData(data));
    }
  };

  const bookingDataGetBySearch = (value) => {
    // Convert the selected date to the desired format (e.g., YYYY-MM)
    const selectedDate = value.format("YYYY-MM");

    setCheckingMonth(selectedDate);
    let data = {
      search: selectedDate, // Use the selectedDate instead of checkingMonth
      page: 1,
    };
    if (selectedDate) {
      dispatch(BookingData(data));
    }
  };

  const customFormat = (value) => `custom format: ${value.format(monthFormat)}`;

  return (
    <>
      {!isLoading ? (
        <div style={{ padding: "0px 10px" }}>
          <h1 style={{ fontSize: "30px", marginBottom: "20px" }}>
            Booking Status
          </h1>
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

          <h2
            style={{
              fontSize: "25px",
              margin: "30px 0px",
              fontWeight: "normal",
            }}
          >
            Booking History
          </h2>

          <div>
            <div className={styles.UserCardContainer}>
              <div className={styles.filterContainer}>
                <h3 className={styles.cardTitle}>
                  Booking List /{" "}
                  {checkingMonth
                    ? new Date(checkingMonth).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                      })
                    : "Select Month"}
                </h3>
                <DatePicker
                  placeholder="Select Month"
                  onChange={bookingDataGetBySearch} // Call the function on change
                  allowClear={false} // Disable the clear button
                  picker="month"
                  format="MMMM"
                />
              </div>
              {data?.map((item) => (
                <BookingCard key={item.id} data={item} />
              ))}
              <Row className={styles.Pagination}>
                <Col>
                  <p style={{ color: "#333333" }}>
                    <ShowingPegination pagination={pagination} />
                  </p>
                </Col>
                <Col>
                  <Pagination
                    pageSize={pageSize}
                    onChange={bookingDataGetByPagination}
                    defaultCurrent={1}
                    total={pagination?.totalDocuments}
                    showQuickJumper={false}
                    showSizeChanger={false}
                  />
                </Col>
              </Row>
            </div>
          </div>

          {/* <BookingHistoryTable /> */}
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
};

export default Booking;
