import { Button, Form, Input, Typography } from "antd";
import React from "react";
import logo from "../../Images/Logo.png";
import style from "./Otp.module.css";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";


const { Title, Paragraph, Text, Link } = Typography;

const Otp = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const navigate = useNavigate();

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
          <Input.Group
            style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
          >
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
            <Input className={style.otpInput} />
          </Input.Group>

          <div className={style.rememberAndPass}>
            <Text>Don't received code?</Text>

            <a
              className="login-form-forgot"
              style={{ color: "#333333" }}
              href=""
            >
              Resend
            </a>
          </div>

          <Form.Item>
            <div className={style.buttonContainer}>
              <Button   onClick={(e) => navigate("/")} htmlType="submit" className={style.verifyButton}>
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
