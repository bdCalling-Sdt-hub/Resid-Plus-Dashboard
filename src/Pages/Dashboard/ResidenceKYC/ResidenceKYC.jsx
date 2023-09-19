import {
  Button,
  Col,
  DatePicker,
  Radio,
  Input,
  Row,
  Upload,
  Modal,
} from "antd";
import ImgCrop from "antd-img-crop";
import dayjs from "dayjs";
import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import styles from "./ResidenceKYC.module.css";
import { PlusOutlined } from "@ant-design/icons";
import AddProductImage from "./AddProductImage";
const dateFormat = "YYYY-MM-DD";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const { TextArea } = Input;

function ResidenceKYC() {
  const [value, setValue] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [images, setImageURL] = useState([]);
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleImageUpload = (event) => {
    const imageData = new FormData();
    imageData.set("key", "701a71fc100ddc2599c9438b268fee30");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then((response) => {
        let image = [];
        let newImages = [...images];
        newImages.push(response.data.data.display_url);
        image = newImages;
        setImageURL(image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteHandler = (params) => {
    let newImages = [...images];
    newImages.splice(params, 1);
    setImageURL(newImages);
  };

  return (
    <div>
      <div>
        <h1 className={styles.kycTitle}>Residence KYC Form</h1>
        <>
          <Upload
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>

          <AddProductImage
            images={images}
            handleImageUpload={handleImageUpload}
            deleteHandler={deleteHandler}
          />
        </>
        <Button className="btn" block>
          Upload Photo
        </Button>
      </div>

      <div className={styles.formContainer}>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Capacity/Person</label>
            <Input
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Enter person number"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Beds</label>
            <Input
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Enter your Beds"
            />
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
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">About this residence</label>
            <TextArea
              style={{ marginTop: "5px" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Residence Description"
              autoSize={{ minRows: 3, maxRows: 5 }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">Residence Rent/hr</label>
            <Input
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Enter Amount"
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <div className={styles.radioBtnContainer}>
              <label style={{ marginBottom: "10px" }} htmlFor="">
                Set Residence Category
              </label>
              <Radio.Group name="radiogroup" defaultValue={1}>
                <Radio value={1}>Popular</Radio>
                <Radio value={2}>Trending</Radio>
                <Radio value={3}>Regular</Radio>
              </Radio.Group>
            </div>
          </Col>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <h1>Owner Information</h1>
        </Row>
        <Row style={{ marginBottom: "15px" }}>
          <Col span={24}>
            <label htmlFor="">name</label>
            <Input
              style={{ height: "45px", marginTop: "5px" }}
              placeholder="Enter your name"
            />
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
{/* 
        <Button className="btn" block>
          Save
        </Button> */}
      </div>
    </div>
  );
}

export default ResidenceKYC;
