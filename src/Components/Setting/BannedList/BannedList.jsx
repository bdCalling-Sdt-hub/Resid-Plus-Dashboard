import React, { useState } from "react";
import { Row } from "antd";
import BannedCard from "./BannedCard";

const BannedList = () => {
  const [reload, setReload] = useState(1);
  return (
    <div style={{ background: "white", padding: "30px", borderRadius: "10px" }}>
      <Row gutter={[16, 16]}>
        {/* {blockUser?.map((blUser) => ( */}
        {/* <SuspendedCard key={blUser._id} data={blUser} setReload={setReload} /> */}
        <BannedCard />
        {/* ))} */}
      </Row>
    </div>
  );
};

export default BannedList;
