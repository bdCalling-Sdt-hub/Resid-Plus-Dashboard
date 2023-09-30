import { Col, Row } from "antd";
import React, { useEffect} from "react";
import LoginActivityTable from "./LoginActivityTable";
import { useDispatch } from "react-redux";
import { LoginActivitys } from "../../../ReduxSlices/LoginActivitySlice";

const LoginActivity = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoginActivitys());
  }, []);

  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <LoginActivityTable />
        </Col>
      </Row>
    </div>
  );
};

export default LoginActivity;
