import { Button, Col, Radio, Input, Row, DatePicker } from "antd";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { PlusOutlined } from "@ant-design/icons";
const dateFormat = "YYYY-MM-DD";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";

const { RangePicker } = DatePicker;

const { TextArea } = Input;
import styles from "./AdminInfo.module.css";
import baseAxios from "../../../../Config";

function AddAdmin() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handleAddAdmin = () => {
    setLoading(true);
    console.log("Add Admin");

    const data = {
      fullName: fullName,
      email: email,
      dateOfBirth: dateOfBirth,
      phoneNumber: phoneNumber,
      address: address,
    };
console.log(data);
    baseAxios
      .post("api/users/add-user", data, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle success
        console.log("User added successfully");
        Swal.fire({
          icon: "success",
          title: response?.data?.message,
          showConfirmButton: true,
        });
        setLoading(false);
        navigate("/admin-info");

        // setReload((prev) => prev + 1);
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to add user", error);
        Swal.fire({
          icon: "error",
          title: error?.response?.data?.message,
          showConfirmButton: true,
        });
      });
  
  };

  return (
    <>
      {loading ? (
        <HashLoader
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30%",
          }}
          color="#1f1c1c"
          size={50}
        />
      ) : (
        <div>
          <h2 className={styles.hostTitle}>New Admin Addition Form</h2>

          <div className={styles.formContainer}>
            <Row style={{ marginBottom: "15px" }}>
              <Col span={24}>
                <label htmlFor="">Name</label>
                <Input
                  onChange={(e) => setFullName(e.target.value)}
                  defaultValue={fullName}
                  style={{ height: "45px", marginTop: "5px" }}
                  placeholder="Enter your name"
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "15px" }}>
              <Col span={24}>
                <label htmlFor="">Email</label>
                <Input
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={email}
                  style={{ height: "45px", marginTop: "5px" }}
                  placeholder="Enter your email"
                />
              </Col>
            </Row>

            <Row gutter={15} style={{ marginBottom: "15px" }}>
              <Col span={12}>
                <label htmlFor="">Date of Birth</label>
                <DatePicker
                  onChange={(date, dateString) => setDateOfBirth(dateString)}
                  style={{ height: "45px", width: "100%", marginTop: "5px" }}
                  defaultValue={dayjs("2023-08-27", dateFormat)}
                />
              </Col>
              <Col span={12}>
                <label htmlFor="">Phone Number</label>
                <Input
                  placeholder="Enter your phone number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  defaultValue={phoneNumber}
                  style={{ height: "45px", marginTop: "5px" }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: "15px" }}>
              <Col span={24}>
                <label htmlFor="">Address</label>
                <TextArea
                  style={{ marginTop: "5px" }}
                  onChange={(e) => setAddress(e.target.value)}
                  defaultValue={address}
                  placeholder="Enter your address"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Button
                  type="primary"
                  onClick={handleAddAdmin}
                  style={{
                    display: "block",
                    margin: "0 auto",
                    width: "100%",
                    height: "45px",
                    fontSize: "20px",
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}

export default AddAdmin;
