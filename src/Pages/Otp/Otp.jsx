import { Button, Form, Input, Typography } from "antd";
import React from "react";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useParams } from "react-router-dom";
import baseAxios from "../../../Config";
import Swal from "sweetalert2";

const { Title, Paragraph, Text, Link } = Typography;

const Otp = () => {
  let { email } = useParams();
  const [otp, setOtp] = useState("");

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const navigate = useNavigate();

  const handelOtp = () => {
    baseAxios
      .post("/api/users/verify", { email, oneTimeCode: otp })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        // sweet alert for success and error set
        Swal.fire({
          icon: "success",
          title: "OTP Verified Successfully",
          // text: "Please Check Your Email!",
        });
        navigate(`/update-password/${email}`);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "OTP is not verified",
        });
      });
  };

  return (
    <div className={style.otpContainer}>
      <div className={style.logoContainer}>
        <div>
          <img
            className={style.logo}
            src="https://i.ibb.co/znBXwxd/Logo-2.png"
            alt="Logo"
          />
        </div>
        <img
          className={style.illustration}
          src="https://i.ibb.co/k1qX15R/Illustration-2.png"
          alt=""
        />
      </div>
      <div className={style.formContainer}>
        <div
          onClick={(e) => navigate("/signin")}
          className={style.otpTextHeader}
        >
          <LeftOutlined size={50} />
          <h2>Verify OTP</h2>
        </div>
        <Paragraph style={{ marginBottom: "30px" }}>
          We'll send a verification code to your email. Check your inbox and
          enter the code here.
        </Paragraph>

        <Form>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            containerStyle={style.otpFormContainer}
            inputStyle={style.otpInputFild}
            renderSeparator={<span style={{ width: "20px" }}></span>}
            renderInput={(props) => <input {...props} />}
          />

          <Form.Item>
            <div className={style.buttonContainer}>
              <Button
                onClick={handelOtp}
                htmlType="submit"
                className={style.verifyButton}
              >
                Verify
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Otp;
