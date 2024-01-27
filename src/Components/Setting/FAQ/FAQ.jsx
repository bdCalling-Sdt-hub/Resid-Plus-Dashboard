import React, { useEffect, useState } from "react";
import { Input } from "antd";
const { TextArea } = Input;
import styles from "./FAQ.module.css";
import baseAxios from "../../../../Config";

function FAQ() {
  const [faqs, setFaqs] = useState();
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [deleteFAQData, setDeleteFAQData] = useState(false);
  const [editFAQData, setEditFAQData] = useState(false);
  const token = localStorage.getItem("token");
  const [reload, setReload] = useState(1);

  useEffect(() => {
    baseAxios
      .get("/api/faqs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setFaqs(response.data.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteFAQData,editFAQData,reload]);

  const addFAQ = () => {
    if (newQuestion && newAnswer) {
      const newFAQ = { question: newQuestion, answer: newAnswer };

      baseAxios
        .post("/api/faqs", newFAQ, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          setReload((prev) => prev + 1);
        })
        .catch((error) => {
          console.log(error);
        });

      setNewQuestion("");
      setNewAnswer("");
    }
    setEditFAQData(!editFAQData)
  };

  const deleteFAQ = (index) => {
    console.log(index);
    baseAxios
      .delete(`/api/faqs/${index}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setReload((prev) => prev + 1);
      })
      .catch((error) => {
        console.log(error);
      });
      setDeleteFAQData(!deleteFAQData)
  };

  return (
    <>
      <div
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f4f4f4",
          padding: "20px",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Frequently Asked Questions</h1>
        {faqs?.map((faq, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "18px", margin: "0", color: "#333" }}>
              {faq.question}
            </h2>
            <p style={{ fontSize: "14px", margin: "5px 0 0 0" }}>
              {faq.answer}
            </p>
            <div style={{ display: "flex", gap: "5px" }}>
              {/* <button className={styles.btn}>Edit</button> */}
              <button
                onClick={(e) => deleteFAQ(faq._id)}
                className={styles.btn}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="New Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "14px",
              marginRight: "10px",
              width: "300px",
            }}
          />
          <input
            type="text"
            placeholder="New Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            style={{
              padding: "8px",
              fontSize: "14px",
              marginRight: "10px",
              width: "300px",
            }}
          />
          <button onClick={addFAQ} className={styles.btn}>
            Add FAQ
          </button>
        </div>
      </div>
    </>
  );
}

export default FAQ;
