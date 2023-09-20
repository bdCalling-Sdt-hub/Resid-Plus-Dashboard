import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { LeftOutlined } from "@ant-design/icons";
import style from "./ForgetPassword.module.css";
import baseAxios from "../../../Config";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

const { Title, Paragraph, Text, Link } = Typography;

const ForgetPassword = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    baseAxios
      .post("/api/users/forget/password", values)
      .then((response) => {
        console.log(response);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate(`/otp/${values.email}`);
    Swal.fire({
      icon: "success",
      title: "OTP Sent Successfully",
      text: "Please Check Your Email!",
    });
  };

  return (
    <div className={style.signContainer}>
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
          src="https://i.ibb.co/rGy8ML7/Illustration-3.png"
          alt=""
        />
      </div>

      <div className={style.formContainer}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <div
            onClick={(e) => navigate("/signin")}
            className={style.forgetPasswordTextHeader}
          >
            <LeftOutlined size={50} />
            <h2>Forget Password</h2>
          </div>
          <Paragraph style={{ marginBottom: "30px" }}>
            Enter the email address associated with your account. We'll send you
            an OTP to your email.
          </Paragraph>
          <div>
            <Form.Item
              name="email"
              id="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input placeholder="Email" type="email" className={style.input} />
            </Form.Item>
          </div>

          <Form.Item>
            <div className={style.buttonContainer}>
              <Button htmlType="submit" className={style.loginButton}>
                Send OTP
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
