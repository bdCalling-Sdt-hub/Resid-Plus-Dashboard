import React from "react";
import styles from "./ResidenceKYC.module.css";

function AddProductImage({ handleImageUpload, images, deleteHandler }) {
  return (
    <div className={styles.imageContainer}>
        <div className={styles.firstImage}>
            <img src="" alt="" />
        </div>
        <div></div>
        <div></div>
    </div>
  );
}

export default AddProductImage;
