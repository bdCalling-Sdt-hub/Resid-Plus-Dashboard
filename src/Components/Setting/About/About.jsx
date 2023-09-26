import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { Button, Col, Row } from "antd";

import "./About.css";
import { useEffect } from "react";
import baseAxios from "../../../../Config";
import Swal from "sweetalert2";

const About = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const AboutDataSave = () => {
    let token = localStorage.getItem("token");
    baseAxios
      .post(
        "/api/about-us",
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
      .get("/api/about-us", {
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
            onClick={AboutDataSave}
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

export default About;
