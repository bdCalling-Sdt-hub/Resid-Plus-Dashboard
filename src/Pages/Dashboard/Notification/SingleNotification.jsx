import React from "react";
import { Col } from "antd";

function SingleNotification({ singleNotifications,notificationUpdateHandler }) {
  function getTimeAgo(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);

    const secondsAgo = Math.floor((now - date) / 1000);
    const minutesAgo = Math.floor(secondsAgo / 60);
    const hoursAgo = Math.floor(minutesAgo / 60);
    const daysAgo = Math.floor(hoursAgo / 24);
    const yearsAgo = Math.floor(daysAgo / 365);

    if (yearsAgo > 0) {
      return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
    } else if (daysAgo > 0) {
      return daysAgo === 1 ? "1 day ago" : `${daysAgo} days ago`;
    } else if (hoursAgo > 0) {
      return hoursAgo === 1 ? "1 hour ago" : `${hoursAgo} hours ago`;
    } else if (minutesAgo > 0) {
      return minutesAgo === 1 ? "1 minute ago" : `${minutesAgo} minutes ago`;
    } else {
      return "just now";
    }
  }

  return (
    <Col onClick={e =>notificationUpdateHandler(singleNotifications._id)} key={singleNotifications._id} lg={{ span: 24 }}>
      <div
        className={`${
          singleNotifications.viewStatus
            ? "single-notification"
            : "single-notificationTrue"
        } `}
      >
        <div
          className={`single-notificationContainer`}
          style={{ display: "flex", alignItems: "center" }}
        >
          <div className="user-image" style={{ marginRight: "50px" }}>
            <img
              style={{
                height: "70px",
                width: "70px",
                borderRadius: "100%",
                border: "2px solid gray",
              }}
              src={singleNotifications?.image?.publicFileUrl}
            />
          </div>
          <div className="">
            <p
              className={`${
                singleNotifications.viewStatus
                  ? "notification"
                  : "notificationp"
              } `}
            >
              {singleNotifications?.message}
            </p>
            <p style={{ color: "gray", marginTop: "10px" }}>
              {getTimeAgo(singleNotifications.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Col>
  );
}

export default SingleNotification;
