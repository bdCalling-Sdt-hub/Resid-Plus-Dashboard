import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button, Col, Row } from "antd";
import Swal from "sweetalert2";
import { useEffect } from "react";
import baseAxios from "../../../../Config";

const TermsAndCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const TermsAndConditionDataSave = () => {
    let token = localStorage.getItem("token");
    baseAxios
      .post(
        "/api/terms-and-conditions",
        { content: content },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        Swal.fire("Good job!", res.data.message, "success");
      })
      .catch((err) => {
        Swal.fire("Oops!", err.response.data.message, "error");
      });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    baseAxios
      .get("/api/terms-and-conditions", {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setContent(res.data.data.attributes.content);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Row>
        <Col lg={{ span: 24 }}>
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => {
              setContent(newContent);
            }}
          />

          <Button
            onClick={TermsAndConditionDataSave}
            block
            style={{
              marginTop: "30px",
              height: "50px",
            }}
            className="btn"
          >
            save
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default TermsAndCondition;
