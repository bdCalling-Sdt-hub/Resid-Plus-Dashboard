import React, { useEffect, useState } from "react";
import SuspendedCard from "./SuspendedCard";
import { Row } from "antd";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";

const SuspendedList = () => {
  const [reload, setReload] = useState(1);
  const [suspendedUser, setSuspendedUser] = useState([]);
  console.log(suspendedUser);
  const token = localStorage.getItem("token");

  useEffect(() => {
    baseAxios.get("api/users?&userAccountStatus=suspended&userType=all", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Handle success
        console.log("Suspended users fetched successfully", response);

        setSuspendedUser(response.data.data.attributes.users);
      })
      .catch((error) => {
        // Handle error
        console.error("Failed to fetch suspended users", error);
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
        {/* {blockUser?.map((blUser) => ( */}
        {/* <SuspendedCard key={blUser._id} data={blUser} setReload={setReload} /> */}

        {suspendedUser?.map((user) => (
          <SuspendedCard
            key={user._id}
            user={user}
            setReload={setReload}
          />
        ))}
      </Row>
    </div>
  );
};

export default SuspendedList;
