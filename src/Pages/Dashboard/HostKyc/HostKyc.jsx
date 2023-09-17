import { Button, Col, Radio, Input, Row, DatePicker } from "antd";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { PlusOutlined } from "@ant-design/icons";
const dateFormat = "YYYY-MM-DD";

const { RangePicker } = DatePicker;

const { TextArea } = Input;
import styles from "./HostKyc.module.css";

function HostKyc() {
  const [value, setValue] = useState("");

  return (
    <div>
      <h2 className={styles.hostTitle}>Host KYC Form</h2>

      <div className={styles.formContainer}>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Name</label>
            <Input
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Enter your name"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Email</label>
            <Input
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Enter your email"
            />
          </Col>
        </Row>
        <div className={styles.margeBtn}>
          <Row style={{ marginBottom: "15px" }}>
            <label htmlFor="">Date of Birth</label>

            <DatePicker
              style={{ height: "45px", marginTop: "5px", width: "100%" }}
              defaultValue={dayjs("2015/01/01", dateFormat)}
              format={dateFormat}
            />
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <label htmlFor="">Phone Number</label>
            <Input
              type="number"
              style={{ height: "45px", marginTop: "5px", width: "100%" }}
              placeholder="Enter your number"
            />
          </Row>
        </div>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Address</label>
            <TextArea
              style={{ marginTop: "5px" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter your address"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Password</label>
            <Input.Password
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Password"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Confirm Password</label>
            <Input.Password
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Confirm Password"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HostKyc;
