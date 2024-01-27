import React, { useEffect, useRef, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Switch,
  Button,
  Modal,
} from "antd";
import baseAxios from "../../../../Config";
import styles from "./PromoCode.module.css";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function PromoCode() {
  const componentRef = useRef();
  const token = localStorage.getItem("token");
  const [show, setShow] = React.useState(true);
  const [promoCode, setPromoCode] = React.useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [reload, setReload] = useState(1);

  const [updateTitle, setUpdateTitle] = useState();
  const [updateCouponCode, setUpdateCouponCode] = useState();
  const [updateDiscountPercentage, setUpdateDiscountPercentage] = useState();
  const [updateExpiryDate, setUpdateExpiryDate] = useState();
  const [updateIsActive, setUpdateIsActive] = useState();

  console.log(modalData);

  const [title, setTitle] = useState();
  const [couponCode, setCouponCode] = useState();
  const [discountPercentage, setDiscountPercentage] = useState();
  const [expiryDate, setExpiryDate] = useState();
  const [isActive, setIsActive] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);

    // Reset modal-related states
    setUpdateTitle("");
    setUpdateCouponCode("");
    setUpdateDiscountPercentage("");
    setUpdateExpiryDate("");
    setUpdateIsActive(false);
  };
  // console.log(promoCode);

  const onFinish = (values) => {
    values.expiryDate = values.expiryDate.format("YYYY-MM-DD");
    console.log("Received values:", values);

    baseAxios
      .post("api/promo-codes", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setShow(!show);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdate = (values) => {
    const updatedValues = {
      title: updateTitle,
      couponCode: updateCouponCode,
      discountPercentage: updateDiscountPercentage,
      expiryDate: updateExpiryDate,
      isActive: updateIsActive,
    };

    console.log(updatedValues);
    baseAxios
      .put(`api/promo-codes/${modalData._id}`, updatedValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // Handle the response data here
        setIsModalOpen(false); // Close the modal after successful update
        // setShow(!show); // Optionally, you can update the state to refresh the promo code list
      })
      .catch((err) => {
        console.log(err);
        // Handle the error here
      });
  };
  const handleDelete = (id) => {
    baseAxios
      .delete(`api/promo-codes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setReload((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function convertDateFormat(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formattedDate;
  }

  function convertDate(inputDate) {
    // Convert the string to a Date object
    const dateObj = new Date(inputDate);

    // Extract year and month from the Date object
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getUTCMonth() + 1; // Month starts from 0, so adding 1 to match format

    // Create the desired output date string in the format "yyyy-mm-dd"
    const outputDate = `${year - 2}-${
      month < 10 ? "0" : ""
    }${month}-${dateObj.getUTCDate()}`;

    return outputDate;
  }

  const viewPromoCode = (record) => {
    console.log(record?._id);
    setUpdateTitle(record.title);
    setUpdateCouponCode(record.couponCode);
    setUpdateDiscountPercentage(record.discountPercentage);
    setUpdateExpiryDate(convertDate(record.expiryDate));
    setUpdateIsActive(record.isActive);
    // setShow(!show);
    setIsModalOpen(true);
    setModalData(record);
  };

  useEffect(() => {
    baseAxios
      .get("api/promo-codes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setPromoCode(res.data.data.attributes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [show, isModalOpen,reload]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Coupon Code",
      dataIndex: "couponCode",
      key: "couponCode",
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (_, record) => (
        <>
          <p>{record.discountPercentage}%</p>
        </>
      ),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (_, record) => (
        <>
          <p>{convertDateFormat(record.expiryDate)}</p>
        </>
      ),
    },
    {
      title: "Status",
      key: "isActive",
      dataIndex: "isActive",
      render: (_, record) => (
        <>
          {record.isActive ? (
            <Tag color="green" key={record._id}>
              Active
            </Tag>
          ) : (
            <Tag color="red" key={record._id}>
              Inactive
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "view",
      dataIndex: "view",
      render: (_, record) => (
        <div style={{ display: "flex",gap:"10px" }}>
          <FaEye
            onClick={(e) => {
              viewPromoCode(record);
            }}
            style={{ cursor: "pointer" }}
            size={22}
          />
          <MdDelete
            onClick={(e) => {
              handleDelete(record._id);
            }}
            style={{ cursor: "pointer" }}
            size={22}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {show ? (
        <div>
          <div className={styles.promoCode}>
            <h1>Promo Code List</h1>
            <button onClick={() => setShow(!show)} className={styles.btn}>
              Add Promo Code
            </button>
          </div>
          <Table columns={columns} dataSource={promoCode} />
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShow(!show)}
            style={{ marginBottom: "10px" }}
            className={styles.btn}
          >
            Back to promo code list
          </button>
          <Form
            name="couponForm"
            initialValues={{ isActive: true }} // Set default value for isActive field
            onFinish={onFinish}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 12 }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title!" }]}
            >
              <Input placeholder="Enter your title" />
            </Form.Item>

            <Form.Item
              label="Coupon Code"
              name="couponCode"
              rules={[
                { required: true, message: "Please enter the coupon code!" },
                {
                  type: "string",
                  min: 3,
                  message: "Coupon code must be at least 3 characters!",
                },
                // You can add more validation rules here as needed
              ]}
            >
              <Input placeholder="Enter your coupon code" />
            </Form.Item>

            <Form.Item
              label="Discount Percentage"
              name="discountPercentage"
              rules={[
                {
                  required: true,
                  message: "Please enter the discount percentage!",
                },
                {
                  type: "number",
                  min: 1,
                  max: 100,
                  message: "Percentage must be between 1 and 100!",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter the discount percentage!"
                min={1}
                max={100}
              />
            </Form.Item>

            <Form.Item
              label="Expiry Date"
              name="expiryDate"
              rules={[
                { required: true, message: "Please select the expiry date!" },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item label="Active" name="isActive" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" className="btn" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}

      <Modal open={isModalOpen} onCancel={handleCancel} centered footer={[]}>
        <div ref={componentRef} className={styles.modalContainer}>
          <h1> Update Promo Code</h1>
          <hr className={styles.modalHr} />
          <div className={styles.btnContainer}>
            <p style={{ fontSize: "16px" }}>Title</p>
            <input
              placeholder="Enter your title"
              name="title"
              className={styles.input}
              onChange={(e) => setUpdateTitle(e.target.value)}
              type="text"
              defaultValue={modalData?.title}
            />
          </div>
          <div>
            <p style={{ fontSize: "16px" }}>Coupon Code</p>
            <input
              onChange={(e) => setUpdateCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              name="couponCode"
              className={styles.input}
              defaultValue={modalData?.couponCode}
              type="text"
            />
          </div>
          <div>
            <p style={{ fontSize: "16px" }}>Discount Percentage</p>
            <input
              onChange={(e) => setUpdateDiscountPercentage(e.target.value)}
              name="discountPercentage"
              placeholder="Enter your Discount Percentage"
              defaultValue={modalData?.discountPercentage}
              className={styles.input}
              type="number"
            />
          </div>
          <div>
            <p style={{ fontSize: "16px" }}>Expiry Date</p>
            <input
              name="expiryDate"
              onChange={(e) => setUpdateExpiryDate(e.target.value)}
              className={styles.input}
              // defaultValue={convertDateFormat(modalData?.expiryDate)}
              defaultValue={convertDate(modalData?.expiryDate)}
              type="date"
            />
          </div>

          <div style={{ display: "flex" }}>
            <span style={{ fontSize: "16px", marginRight: "10px" }}>
              Active
            </span>
            <input
              onChange={(e) => setUpdateIsActive(e.target.checked)}
              defaultChecked={modalData?.isActive}
              name="isActive"
              className=""
              type="checkbox"
            />
          </div>

          <div>
            <div onClick={handleUpdate} className={styles.updateBtn}>
              Promo Update
            </div>
          </div>
        </div>
        <div></div>
      </Modal>
    </div>
  );
}

export default PromoCode;
