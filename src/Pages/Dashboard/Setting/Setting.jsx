import { Button, Form, Input, Modal, Switch, Typography } from "antd";
import React, { useState } from "react";
import { LiaAngleRightSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";
import OTPInput from "react-otp-input";
import styles from "./Setting.module.css";

const { Paragraph, Title, Text } = Typography;

const Setting = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openChangePassModel, setOpenChangePassModel] = useState(false);
  const [verify, setVerify] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));

  const style = {
    formContainer: {
      background:
        "linear-gradient(180deg, #FDFBFB 0%, #FFF 0.01%, #F4F4F4 100%)",
      padding: "30px",
      borderRadius: "10px",
    },
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginBottom: "10px",
      color: "black",
    },
    notification: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: "45px",
      marginTop: "10px",
      backgroundColor: "#ffffff",
      border: "1px solid #d9d9d9",
      boxShadow: "0 2px 0 rgba(0, 0, 0, 0.02)",
      borderRadius: "6px",
      padding: "4px 15px",
    },
    input: {
      height: "45px",
    },
    otpInput: {
      width: "50px",
      height: "70px",
    },
  };
  const menuItems = [
    {
      key: "1",
      title: "Personal Information",
      link: "personal-information",
    },
    {
      key: "2",
      title: "Change Password",
      link: "change-password",
    },
    {
      key: "3",
      title: "Login Activity",
      link: "login-activity",
    },
    {
      key: "4",
      title: "Suspended List",
      link: "suspended-list",
    },
    {
      key: "5",
      title: "Banned List",
      link: "banned-list",
    },
    {
      key: "8",
      title: "Privacy Policy",
      link: "privacy-policy",
    },
    {
      key: "9",
      title: "Terms and Condition",
      link: "terms-condition",
    },
    {
      key: "10",
      title: "About Us",
      link: "about-us",
    },
  ];

  const [err, setErr] = useState("");
  const handleUpdated = (values) => {
    const { password, confirmPassword } = values;
  };

  const handleNavigate = (value) => {
    if (value == "renti-percentage") {
      setOpenModal(true);
    } else if (value === "change-password") {
      setOpenChangePassModel(true);
    } else {
      navigate(`/setting/${value}`);
    }
  };

  const handleNotification = (e) => {
    console.log(e);
  };

  const setPercentage = () => {
    setOpenModal(false);
  };

  const handleChangePassword = (values) => {
    let token = localStorage.getItem("token");
    baseAxios
      .patch(
        "/api/users",
        {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setOpenChangePassModel(false);
        Swal.fire({
          icon: "success",
          title: "Password Updated Successfully",
          // text: "Please Check Your Email!",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password is not updated",
        });
      });
  };

  const handelForgetPassword = () => {
    baseAxios
      .post("/api/users/forget/password", { email: userFromLocalStorage.email })
      .then((response) => {
        setVerify(true);
        setOpenChangePassModel(false);
      })
      .catch((error) => {});

    Swal.fire({
      icon: "success",
      title: "OTP Sent Successfully",
      text: `Please Check Your ${userFromLocalStorage.email} This Email!`,
    });
  };

  const handelOtp = () => {
    baseAxios
      .post("/api/users/verify", {
        email: userFromLocalStorage.email,
        oneTimeCode: otp,
      })
      .then((response) => {
        // sweet alert for success and error set
        Swal.fire({
          icon: "success",
          title: "OTP Verified Successfully",
          // text: "Please Check Your Email!",
        });
        setUpdatePassword(true);
        setVerify(false);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "OTP is not verified",
        });
      });
  };

  const handleUpdatePasswrod = () => {
    if (password === confirmPassword) {
      baseAxios
        .post("/api/users/reset/password", {
          email: userFromLocalStorage.email,
          password,
        })
        .then((response) => {
          // sweet alert for success and error set
          setOpenModal(true);
          setUpdatePassword(false);
          Swal.fire({
            icon: "success",
            title: "Password Updated Successfully",
            // text: "Please Check Your Email!",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password is not updated",
          });
        });
    } else {
      setErr("Password and Confirm Password not match");
      Swal.fire({
        icon: "error",
        title: "Password and Confirm Password not match",
      });
    }
  };

  return (
    <div
      style={{
        padding: "0 10px",
        background:
          "linear-gradient(180deg, #FDFBFB 0%, #FFF 0.01%, #F4F4F4 100%) !important",
      }}
    >
      <h2 style={{ fontSize: "30px", marginBottom: "20px", fontWeight: "600" }}>
        Settings
      </h2>
      <div style={{}}>
        {menuItems.map((item) => (
          <Button
            onClick={() => handleNavigate(item.link)}
            key={item.key}
            block
            style={style.btn}
          >
            <span>{item.title}</span>
            <LiaAngleRightSolid fontSize={20} />
          </Button>
        ))}
        <div style={style.notification}>
          <span>Notification</span>
          <Switch
            onChange={(e) => handleNotification(e)}
            checkedChildren="ON"
            unCheckedChildren="OFF"
            defaultChecked
          />
        </div>
        {/* change password*/}
        <Modal
          title={<h2 style={{ marginBottom: "30px" }}>Change password</h2>}
          centered
          open={openChangePassModel}
          onCancel={() => setOpenChangePassModel(false)}
          width={500}
          footer={[]}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleChangePassword}
          >
            <div>
              <label htmlFor="" className={style.label}>
                Current Password
              </label>
              <Form.Item
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your current password!",
                  },
                ]}
              >
                <Input
                  placeholder="Enter Password"
                  type="password"
                  style={style.input}
                />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="">New Password</label>
              <Form.Item
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: "Please input your new Password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
            </div>
            <div>
              <label htmlFor="email" className={style.label}>
                Re-Type Password
              </label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Re-type Password!",
                  },
                ]}
              >
                <Input
                  type="password"
                  placeholder="Enter password"
                  style={style.input}
                />
              </Form.Item>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="text"
                className="login-form-forgot"
                style={{ color: "black" }}
                onClick={handelForgetPassword}
              >
                Forgot password
              </Button>
            </div>

            <Form.Item>
              <Button
                htmlType="submit"
                className="btn"
                style={{
                  marginTop: "20px",
                }}
                block
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* Verify Password */}
        <Modal
          title={<h2 style={{ marginBottom: "30px" }}> Verify OTP</h2>}
          centered
          open={verify}
          onCancel={() => {
            setVerify(false);
          }}
          width={500}
          footer={[]}
        >
          <div>
            <Paragraph style={{ marginBottom: "30px" }}>
              We'll send a verification code to your email. Check your inbox and
              enter the code here.
            </Paragraph>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              containerStyle={styles.otpFormContainer}
              inputStyle={styles.otpInputFild}
              renderSeparator={<span style={{ width: "20px" }}></span>}
              renderInput={(props) => <input {...props} />}
            />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Don't received code?</Text>

              <a
                className="login-form-forgot"
                style={{ color: "black" }}
                href=""
              >
                Resend
              </a>
            </div>

            <Button
              block
              onClick={handelOtp}
              className="btn"
              style={{
                marginTop: "100px",
              }}
            >
              Continue
            </Button>
          </div>
        </Modal>
        {/* Update Password */}
        <Modal
          title={<h2 style={{ marginBottom: "30px" }}> Update Password</h2>}
          centered
          open={updatePassword}
          onCancel={() => {
            setUpdatePassword(false);
          }}
          width={500}
          footer={[]}
        >
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={handleUpdated}
          >
            <div>
              <label htmlFor="">New Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter new password!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="Password"
                  style={style.input}
                />
              </Form.Item>
            </div>

            <div>
              <label htmlFor="">Re-type Password</label>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "Please enter confirm Password!",
                  },
                ]}
              >
                <Input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="text"
                  placeholder="Confirm password"
                  style={style.input}
                />
              </Form.Item>
            </div>

            {/* showing error */}
            <label style={{ color: "red" }}>{err}</label>

            <Form.Item>
              <Button
                onClick={handleUpdatePasswrod}
                className="btn"
                block
                style={{
                  marginTop: "100px",
                }}
              >
                Confirm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default Setting;
