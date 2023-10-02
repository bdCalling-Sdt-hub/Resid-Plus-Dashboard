import { Button, Col, DatePicker, Image, Input, Row, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import baseAxios from "../../../../Config";

const PersonalInfo = () => {
  const userFromLocalStorage = JSON.parse(localStorage.getItem("yourInfo"));
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: userFromLocalStorage.image?.publicFileUrl,
    },
  ]);
  const [profileEdit, setProfileEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState(userFromLocalStorage.fullName);
  const [email, setEmail] = useState(userFromLocalStorage.email);
  const [image, setImage] = useState();
  const [phoneNumber, setPhoneNumber] = useState(
    userFromLocalStorage.phoneNumber
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    userFromLocalStorage.dateOfBirth
  );
  const [address, setAddress] = useState(userFromLocalStorage.address);

  const handleDatePickerChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // console.log(fullName, +" , " + email, +" , " + phoneNumber, +" , " + address);
  // console.log(userFromLocalStorage);

  const handleChange = () => {
    setProfileEdit(true);
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setImage(newFileList[0].originFileObj);
    // console.log(newFileList[0].originFileObj);
  };

  console.log(image);
  const handleSubmit = () => {
    const formData = new FormData();

    // Append individual fields to the FormData object
    formData.append("fullName", fullName);
    formData.append("phoneNumber", phoneNumber);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("address", address);

    // Append the image file if you have it (assuming 'image' is a File object)
    if (image) {
      formData.append("image", image);
    }

    console.log("form data", formData);

    baseAxios
      .put(`/api/users`, formData, {
        headers: {
          // Do not set Content-Type here; Axios will set it automatically for FormData
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        // here localsotrage is updated
        localStorage.setItem(
          "yourInfo",
          JSON.stringify(res.data.data.attributes)
        );
        setProfileEdit(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {!profileEdit ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #d9d9d9",
              paddingBottom: "30px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                width={200}
                style={{ borderRadius: "6px" }}
                src={userFromLocalStorage.image?.publicFileUrl}
              />
              <div style={{width:"400px"}}>
                <h2>{userFromLocalStorage.fullName}</h2>
              </div>
            </div>
            <div>
              <Button
                onClick={handleChange}
                style={{
                  background:
                    "linear-gradient(180deg, #787878 0%, #434343 0.01%, #000 100%)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LiaEditSolid fontSize={16} />
                Edit
              </Button>
            </div>
          </div>

          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Name</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.fullName}
                readOnly
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Email</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.email}
                readOnly
              />
            </Col>
          </Row>

          <Row gutter={15} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <label htmlFor="">Phone Number</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.phoneNumber}
                readOnly
              />
            </Col>
            <Col span={12}>
              <label htmlFor="">Date of Birth</label>
              <DatePicker
                style={{ height: "45px", width: "100%" }}
                defaultValue={dayjs(
                  userFromLocalStorage.dateOfBirth,
                  "DD-MM-YY"
                )}
                disabled
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Address</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.address}
                readOnly
              />
            </Col>
          </Row>
        </>
      ) : (
        <>
          <div>
            <div
              style={{
                display: "flex",
                gap: "20px",
                borderBottom: "1px solid #d9d9d9",
                paddingBottom: "30px",
                marginBottom: "20px",
              }}
            >
              <ImgCrop rotationSlider >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleFileChange}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>

              <div>
                <h2>{userFromLocalStorage?.fullName}</h2>
              </div>
            </div>
          </div>

          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Name</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Email</label>
              <Input
                disabled
                type="email"
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Row>

          <Row gutter={15} style={{ marginBottom: "15px" }}>
            <Col span={12}>
              <label htmlFor="">Phone Number</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <label htmlFor="">Date of Birth</label>
              <DatePicker
                onChange={handleDatePickerChange}
                style={{ height: "45px", width: "100%" }}
                defaultValue={dayjs(
                  userFromLocalStorage.dateOfBirth,
                  "DD-MM-YY"
                )}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "15px" }}>
            <Col span={24}>
              <label htmlFor="">Address</label>
              <Input
                style={{ height: "45px" }}
                defaultValue={userFromLocalStorage.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Col>
          </Row>
          <Button type="submit" onClick={handleSubmit} className="btn" block>
            Save
          </Button>
        </>
      )}
    </>
  );
};

export default PersonalInfo;
