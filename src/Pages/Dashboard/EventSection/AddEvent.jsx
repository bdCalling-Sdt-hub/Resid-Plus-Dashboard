import React, { useState } from 'react';
import { Button, Col, Input, Row, DatePicker, Checkbox, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import styles from './AdminInfo.module.css';
import baseAxios from '../../../../Config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

function AddEvent() {
  const [form] = Form.useForm();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const onFinish = (values) => {
    // Format expiry date
    const expiryDate = `${values.expiryDate.$y}-${values.expiryDate.$M + 1}-${values.expiryDate.$D}`;

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('image', image); // Append the entire file to FormData
    formData.append('expiaryDate', expiryDate); // corrected the key name
    values.role.forEach((role, index) => {
      formData.append(`role`, role);
    });

    baseAxios
      .post('/api/events', formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: res.data.message,
        }).then(() => {
          navigate('/events');
          window.location.reload();
        });
      })
      .catch((err) => console.log(err));

    form.resetFields(); // Reset form fields after submission
    setImage(null); // Reset image state
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected file as the image state
  };

  return (
    <div>
      <h2 className={styles.hostTitle}>Add Event</h2>

      <div className={styles.formContainer}>
        <Form
          form={form}
          name="addEventForm"
          onFinish={onFinish}
          initialValues={{
            role: [],
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the title',
                  },
                ]}
              >
                <Input style={{ height: '45px' }} placeholder="Enter the title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  {
                    required: true,
                    message: 'Please upload an image',
                  },
                ]}
              >
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Role"
                name="role"
                rules={[
                  {
                    required: true,
                    message: 'Please select at least one role',
                    type: 'array',
                  },
                ]}
              >
                <Checkbox.Group>
                  <Checkbox value="user">User</Checkbox>
                  <Checkbox value="host">Host</Checkbox>
                </Checkbox.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[
                  {
                    required: true,
                    message: 'Please select the expiry date',
                  },
                ]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%', height: '45px', fontSize: '20px' }}>
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default AddEvent;
