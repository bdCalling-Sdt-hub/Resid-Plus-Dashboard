import React, { useEffect, useState } from "react";
import { Row } from "antd";
import BannedCard from "./BannedCard";
import baseAxios from "../../../../Config";

const BannedList = () => {
  const [reload, setReload] = useState(1);
  const token = localStorage.getItem("token");
  const [banUser, setBanUser] = useState([]);
  console.log(banUser);
  useEffect(() => {
    baseAxios.get("api/users?&userAccountStatus=banned&userType=all", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle success

        setBanUser(response.data.data.attributes.users);
      })
      .catch((error) => {
        // Handle error
        Swal.fire({
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: true,
        });
      });
  }, [reload]);

  return (
    <div style={{ background: "white", padding: "30px", borderRadius: "10px" }}>
      <Row gutter={[16, 16]}>
        {}
        {banUser?.map((user) => (
          <BannedCard key={user._id} user={user} setReload={setReload} />
        ))}
      </Row>
    </div>
  );
};

export default BannedList;
