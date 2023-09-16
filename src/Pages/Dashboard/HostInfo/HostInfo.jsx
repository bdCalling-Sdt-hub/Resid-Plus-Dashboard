import { Button, Input } from "antd";
import React from "react";
import HostInfoTable from "./HostInfoTable";

const HostInfo = () => (
  <div style={{ padding: "0px 60px" }}>
    <h2
      style={{ fontSize: "25px", marginBottom: "10px", fontWeight: "normal" }}
    >
      All Host Info
    </h2>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <Input style={{ height: "44px" }} />
      <Button
        style={{
          background: "#000B90",
          color: "white",
          height: 45,
          width: "180px",
        }}
      >
        Search
      </Button>
    </div>

    <h2
      style={{
        fontSize: "25px",
        marginTop: "50px",
        marginBottom: "20px",
        fontWeight: "normal",
      }}
    >
      All Host List With Their Information
    </h2>
    <HostInfoTable />
  </div>
);

export default HostInfo;
