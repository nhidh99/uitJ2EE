import React, { Component } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import styles from "./styles.module.scss";

class PromotionForm extends Component {
    render() {
        return (
            <table borderless className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Khuyến mãi:</td>
                        <td>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Tên khuyến mãi"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Số lượng:</td>
                        <td>
                            <Input
                                type="text"
                                id="quantity"
                                placeholder="Số lượng (để trống nếu không cần lưu số lượng tồn)"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Trị giá:</td>
                        <td>
                            <InputGroup>
                                <Input
                                    type="text"
                                    id="unit-price"
                                    placeholder="Trị giá"
                                />
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>đ</InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Hình ảnh:</td>
                        <td>
                            <Input
                                type="file"
                                accept="image/*"
                                id="image"
                                placeholder="Chọn hình ảnh"
                                onChange={previewImage}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}></td>
                        <td>
                            <img
                                id="image-preview"
                                alt="Xem trước ảnh khuyến mãi"
                                className={styles.imgPreview}
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const previewImage = () => {
    const input = document.getElementById("image");
    const preview = document.getElementById("image-preview");

    if (input.files.length > 0) {
        preview.src = window.URL.createObjectURL(input.files[0]);
        preview.style.display = "block";
    } else {
        preview.src = null;
        preview.style.display = "none";
    }
};

export default PromotionForm;
