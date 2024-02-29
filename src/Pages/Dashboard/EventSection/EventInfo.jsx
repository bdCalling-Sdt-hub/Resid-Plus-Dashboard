import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Col, Row, Pagination, Spin, Card, Empty, Menu, Dropdown, Modal } from "antd";
import { PlusOutlined, MoreOutlined } from "@ant-design/icons";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";

const { Meta } = Card;

function EventInfo() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, []);

  console.log(selectedEvent?.role)
  const fetchData = (page) => {
    setIsLoading(true);
    baseAxios
      .get(`api/events?page=${page}&limit=8`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data.attributes);
        setData(res.data.data.attributes.adminEvent);
        setPagination(res.data.data.attributes.pagination);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (eventId) => {
    // Implement delete logic here
    console.log("Deleting event with id:", eventId);
    baseAxios
      .delete(`api/events/${eventId}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: res.data.message,
        }).then(() => fetchData(pagination.currentPage));
      })
      .catch((err) => console.log(err));
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setSelectedEvent(null);
    setModalVisible(false);
  };

  const handlePaginationChange = (page) => {
    fetchData(page);
  };

  const renderEvents = () => {
    return data.map((event) => (
      <Col key={event._id} xs={24} sm={12} md={12} lg={6} xl={6}>
        <Card
          hoverable
          style={{ marginBottom: 20 }}
          cover={<img alt={event.title} src={event?.image?.publicFileUrl} height={"160px"} width={"260px"}/>}
          actions={[
            <Dropdown overlay={
              <Menu>
                <Menu.Item key="view" onClick={() => handleViewDetails(event)}>View Details</Menu.Item>
                <Menu.Item key="delete" onClick={() => handleDelete(event._id)}>Delete</Menu.Item>
              </Menu>
            } trigger={['click']}>
              <MoreOutlined key="more" />
            </Dropdown>
          ]}
        >
          <Meta title={event.title} description={`Expiry Date: ${formatExpiryDate(event.expiaryDate)}`} />
        </Card>
      </Col>
    ));
  };

  const formatExpiryDate = (expiryDate) => {
    const date = new Date(expiryDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div style={{ padding: "0 10px" }}>
      {!isLoading ? (
        <div>
          <Row justify="space-between" align="middle" style={{ marginBottom: 10 }}>
            <Col>
              <h2 style={{ margin: 0 }}>Events Section</h2>
            </Col>
            <Col>
              <Link to="/add-event">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Event
                </Button>
              </Link>
            </Col>
          </Row>
          {data.length > 0 ? (
            <>
              <Row gutter={[16, 16]}>{renderEvents()}</Row>
              <Row justify="end">
                <Col>
                  <Pagination
                    pageSize={8} // Show 8 events per page
                    defaultCurrent={pagination.currentPage}
                    onChange={handlePaginationChange}
                    total={pagination.totalDocuments}
                    showQuickJumper={false}
                    showSizeChanger={false}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <Empty description="No events found" />
          )}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30%" }}>
          <Spin size="large" />
        </div>
      )}
      {selectedEvent && (
        <Modal
        open={modalVisible}
        onCancel={handleModalClose}
        footer={"Expiry Date: " + formatExpiryDate(selectedEvent.expiaryDate)}
      >
        {/* Display event details here */}
        <div style={{ textAlign: "center" }}>
          <img
            src={selectedEvent?.image?.publicFileUrl}
            alt={selectedEvent.title}
            height={"300px"}
            style={{ display: "block", margin: "auto", borderRadius: "20px", paddingTop: "30px"}}
          />
        </div>
        <h3 style={{ marginTop: "20px", textAlign: "center" }}>
          {selectedEvent.title}
        </h3>
        <h3 style={{ marginTop: "20px", textAlign: "center" }}>
        Sent To: {selectedEvent.role.map((role, index) => (
      <span key={index}>{role === 'host' ? 'Host' : 'User'} </span>
    ))}
        </h3>
        {/* Add more details as needed */}
      </Modal>
      
      )}
    </div>
  );
}

export default EventInfo;
