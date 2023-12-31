import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import logo from "../../Images/Logo.png";
import style from "./UpdatePass.module.css";
import { LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import baseAxios from "../../../Config";
import Swal from "sweetalert2";

const UpdatePass = () => {
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  let { email } = useParams();

  const onFinish = (values) => {
    const { password, confirmPassword } = values;

    // if (password.length < 8) {
    //   setErr("Password must be 8 character");
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   setErr("Please enter the same password!");
    //   return;
    // }
    // if (!password || !confirmPassword) {
    //   setErr("Please give your changes password");
    //   return;
    // }
    // if (!/(?=.*[!@#$&*])/.test(password)) {
    //   setErr("Ensure string has one special case letter.");
    //   return;
    // }
    // if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
    //   setErr("Ensure string has two uppercase letters.");
    //   return;
    // }
    // if (!/(?=.*[a-z].*[a-z].*[a-z])/.test(password)) {
    //   setErr("Ensure string has three lowercase letters.");
    //   return;
    // }
    // if (!/(?=.*[0-9].*[0-9])/.test(password)) {
    //   setErr("Ensure string has two digits");
    //   return;
    // }
    if (password === confirmPassword) {
      baseAxios
        .post("/api/users/reset/password", { email, password })
        .then((response) => {
          // sweet alert for success and error set
          Swal.fire({
            icon: "success",
            title: "Password Updated Successfully",
            // text: "Please Check Your Email!",
          });
          navigate(`/signin`);
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password is not updated",
          });
        });
    }else{
      setErr("Password and Confirm Password not match");
      Swal.fire({
        icon: "error",
        title: "Password and Confirm Password not match"
      });
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
          onFinish={onFinish}
        >
          <div>
            <Form.Item
              name="password"
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
            <div className={style.buttonContainer}>
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
