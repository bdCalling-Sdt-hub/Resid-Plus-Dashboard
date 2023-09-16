import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import logo from "../../Images/Logo.png";
import style from "./UpdatePass.module.css";
import { LeftOutlined } from "@ant-design/icons";

const UpdatePass = () => {
  const [err, setErr] = useState("");
  const onFinish = (values) => {
    const { password, confirmPassword } = values;

    if (password.length < 8) {
      setErr("Password must be 8 character");
      return;
    }
    if (password !== confirmPassword) {
      setErr("Please enter the same password!");
      return;
    }
    if (!password || !confirmPassword) {
      setErr("Please give your changes password");
      return;
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      setErr("Ensure string has one special case letter.");
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setErr("Ensure string has two uppercase letters.");
      return;
    }
    if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
      setErr("Ensure string has three lowercase letters.");
      return;
    }
    if (!/(?=.*[0-9].*[0-9])/.test(password)) {
      setErr("Ensure string has two digits");
      return;
    }
  };

  return (
    <div className={style.updateContainer}>
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
          src="https://i.ibb.co/FHDwr1r/Group-2.png"
          alt=""
        />
      </div>

      <div className={style.formContainer}>
        <div
          onClick={(e) => navigate("/forget-password")}
          className={style.UpdateTextHeader}
        >
          <LeftOutlined size={50} />
          <h2>Update Password</h2>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <div>
            <Form.Item
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "New password",
                },
              ]}
            >
              <Input.Password
                placeholder="New password"
                className={style.passwordInput}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Confirm Password",
                },
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                className={style.passwordInput}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <div
              onClick={(e) => navigate("/")}
              className={style.buttonContainer}
            >
              <Button htmlType="submit" className={style.updateButton}>
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePass;
