import { Button, Form, Input } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import logo from "../../Images/Logo.png";
import style from "./Signin.module.css";

const Signin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const navigate = useNavigate();

  const handleForget = () => {
    navigate("/forget-password");
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
          src="https://i.ibb.co/YjBqNfm/illustration-1.png"
          alt=""
        />
      </div>

      <div className={style.formContainer}>
        <h2 className={style.formHeader}>Welcome</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <h3 className={style.expertSignIn}>Expert Sign In</h3>
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

          <div>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "password",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                className={style.passwordInput}
              />
            </Form.Item>
          </div>
          <div className={style.ForgotBtn}>
            <a
              className="login-form-forgot"
              style={{ color: "#333333" }}
              href=""
              onClick={handleForget}
            >
              Forgot password
            </a>
          </div>

          <Form.Item>
            <div className={style.buttonContainer}>
              <Button htmlType="submit" className={style.loginButton}>
                Sign In
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
