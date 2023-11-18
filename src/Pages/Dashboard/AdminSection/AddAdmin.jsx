import { Button, Col, Radio, Input, Row, DatePicker } from "antd";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { PlusOutlined } from "@ant-design/icons";
const dateFormat = "YYYY-MM-DD";

const { RangePicker } = DatePicker;

const { TextArea } = Input;
import styles from "./AdminInfo.module.css";

function AddAdmin() {
  const [value, setValue] = useState("");
  const [role, setRole] = useState("admin"); // Default role is set to "admin"

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div>
      <h2 className={styles.hostTitle}>New Admin Addition Form</h2>

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

        <Row gutter={15} style={{ marginBottom: "15px" }}>
          <Col span={12}>
            <label htmlFor="">Date of Birth</label>
            <DatePicker
              style={{ height: "45px", width: "100%", marginTop: "5px" }}
              defaultValue={dayjs("2023-08-27", dateFormat)}
            />
          </Col>
          <Col span={12}>
            <label htmlFor="">Phone Number</label>
            <Input style={{ height: "45px", marginTop: "5px" }} defaultValue={"01646524028"} />
          </Col>
        </Row>
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

        {/* Radio Group for Role */}
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Role</label>
            <br/>
            <Radio.Group onChange={handleRoleChange} value={role}>
              <Radio value="super-admin">Super-admin</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type="primary" onClick={''} style={{display:"block",margin:"0 auto", width:"100%",height:"45px", fontSize:"20px"}}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default AddAdmin;
