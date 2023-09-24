import { Col, Row, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Booking.module.css";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { Form, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { BookingData } from "../../../ReduxSlices/BookingSlice";
import BookingCard from "../Booking/BookingCard"
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const Booking = () => {

  const [checkingMonth, setCheckingMonth] = useState("");
  const dispatch = useDispatch();

  console.log("ck", checkingMonth)

  const {
    // bookingCompletedTotalAmount,
    // bookingReservedTotalAmount,
    // totalRejectedAmount,

  } = useSelector((state) => state.BookingData);

  const data = useSelector((state) => state.BookingData.bookings)
  console.log(data)
  const pagination = useSelector((state) => state.BookingData.pagination)
  console.log(pagination)


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


  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
    <div style={{ padding: "0px 10px" }}>
      <h2 style={{ fontSize: "25px", fontWeight: "normal" }}>Bookings</h2>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <div className="completed-card">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "100",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Completed
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: ".2rem",
                marginBottom: "15px",
              }}
            >
              250
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
          <div className="reserved-card">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "100",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Reserved
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
        <Col
          className="gutter-row"
          style={{ marginBottom: "10px" }}
          xs={{ span: 24 }}
          sm={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <div className="canceled-card">
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "100",
                marginTop: "30px",
                marginBottom: "30px",
              }}
            >
              <LiaHandHoldingUsdSolid style={{ fontSize: "24px" }} /> Canceled
            </h1>
            <h3
              style={{
                fontSize: "1.5rem",
                letterSpacing: "1px",
                marginBottom: "15px",
              }}
            >
              $ 250
            </h3>
          </div>
        </Col>
      </Row>

      <h2 style={{ fontSize: "25px", margin: "30px 0px", fontWeight: "normal" }}>
        Booking History
      </h2>

      <div>
        <div className={styles.UserCardContainer}>
          <div className={styles.filterContainer}>
            <h3 className={styles.cardTitle}>Booking List/ August, 2023</h3>
            {/* <Form.Item label="" className={styles.filterLabel}>
              <Select
                placeholder="Monthly Booking"
                onChange={bookingDataGetBySearch}
                value={checkingMonth} >
                <Option value="2023-09">2023-09</Option>
                <Option value="2023-08">2023-08</Option>
                <Option value="October/2023">October/2023</Option>
              </Select>
            </Form.Item> */}
            <DatePicker
              placeholder="Select Month"
              onChange={bookingDataGetBySearch} // Call the function on change
              allowClear={false} // Disable the clear button
              picker="month" disabledDate={disabledDate} />
          </div>
          {data?.map((item) => (
            <BookingCard
              key={item.id}
              data={item} />
          ))}
          <Row className={styles.Pagination}>
            <Col>
              <p style={{ color: "#333333" }}>Showing 1-10 OF 250</p>
            </Col>
            <Col>
              <Pagination
                onChange={bookingDataGetByPagination}
                defaultCurrent={pagination?.totalDocuments}
                total={pagination?.totalPage}
                showQuickJumper={false}
                showSizeChanger={false}
              />
            </Col>
          </Row>
        </div>
      </div>

      {/* <BookingHistoryTable /> */}
    </div>
  );
};

export default Booking;

