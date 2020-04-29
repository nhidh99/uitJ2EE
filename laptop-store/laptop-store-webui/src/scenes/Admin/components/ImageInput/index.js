import React, { Fragment } from "react";
import { Input } from "reactstrap";
import styles from "./styles.module.scss";

const ImageInput = (props) => {
    const { defaultSrc, imgWidth, imgHeight } = props;
    return (
        <Fragment>
            <Input
                type="file"
                accept="image/*"
                id="image"
                onChange={() => previewImage(defaultSrc)}
            />
            <img
                id="image-preview"
                alt="Xem trước ảnh khuyến mãi"
                src={defaultSrc === null ? "" : defaultSrc}
                width={imgWidth}
                height={imgHeight}
                className={styles.imgPreview}
            />
        </Fragment>
    );
};

const previewImage = (defaultSrc) => {
    const input = document.getElementById("image");
    const preview = document.getElementById("image-preview");

    if (input.files.length > 0) {
        preview.src = window.URL.createObjectURL(input.files[0]);
        preview.style.display = "inline-block";
    } else if (defaultSrc) {
        preview.src = defaultSrc;
    } else {
        preview.removeAttribute("src");
        preview.style.display = "none";
    }
};

export default ImageInput;
