import React, { Component, Fragment } from "react";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button,
} from "reactstrap";
import styles from "./styles.module.scss";
import NumberFormat from "react-number-format";
import {
    MAXIMUM_UNIT_PRICE,
    MAXIMUM_QUANTITY,
} from "../../../../../../constants";

class PromotionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
        };
    }

    validateInputs = () => {
        const errors = getInputErrors();
        this.setState({ errors: errors });
        return errors.length === 0;
    };

    submit = () => {
        if (this.validateInputs() === false) return;
        const url = "/api/promotions";
        const data = buildFormData();
        for (const d of data.values()) {
            console.log(d);
        }

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data; charset=utf-8",
            },
            body: data,
        });
    };

    render() {
        const { errors } = this.state;
        return (
            <Fragment>
                {errors.length !== 0
                    ? errors.map((err) => (
                          <label className={styles.err}>- {err}</label>
                      ))
                    : null}

                <table borderless className={styles.table}>
                    <tbody>
                        <tr>
                            <td className={styles.labelCol}>Khuyến mãi:</td>
                            <td>
                                <Input
                                    type="text"
                                    id="name"
                                    placeholder="Tên khuyến mãi"
                                    maxLength={80}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.labelCol}>Số lượng:</td>
                            <td>
                                <NumberFormat
                                    className={"form-control"}
                                    thousandSeparator={true}
                                    decimalSeparator={false}
                                    allowNegative={false}
                                    allowLeadingZeros={false}
                                    id="quantity"
                                    placeholder="Số lượng (để trống nếu không cần lưu số lượng tồn)"
                                    isAllowed={(values) => {
                                        const {
                                            formattedValue,
                                            floatValue,
                                        } = values;
                                        return (
                                            formattedValue === "" ||
                                            floatValue <= MAXIMUM_QUANTITY
                                        );
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.labelCol}>Trị giá:</td>
                            <td>
                                <InputGroup>
                                    <NumberFormat
                                        className={"form-control"}
                                        thousandSeparator={true}
                                        decimalSeparator={false}
                                        allowNegative={false}
                                        allowLeadingZeros={false}
                                        id="unit-price"
                                        placeholder="Trị giá"
                                        isAllowed={(values) => {
                                            const {
                                                formattedValue,
                                                floatValue,
                                            } = values;
                                            return (
                                                formattedValue === "" ||
                                                floatValue <= MAXIMUM_UNIT_PRICE
                                            );
                                        }}
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

                <div className={styles.buttons}>
                    <Button
                        color="success"
                        onClick={this.submit}
                        className={styles.button}
                    >
                        Xác nhận
                    </Button>

                    <Button
                        color="secondary"
                        onClick={this.props.toggle}
                        className={styles.button}
                    >
                        Đóng
                    </Button>
                </div>
            </Fragment>
        );
    }
}

const getInputErrors = () => {
    const errors = [];

    const inputs = {
        name: document.getElementById("name"),
        quantity: document.getElementById("quantity"),
        price: document.getElementById("unit-price"),
        image: document.getElementById("image"),
    };

    const validate = (message, condition) => {
        try {
            if (!condition()) {
                errors.push(message);
            }
        } catch (err) {
            errors.push(message);
        }
    };

    validate(
        "Tên khuyến mãi từ 6 - 80 kí tự",
        () =>
            inputs["name"].value.length >= 6 &&
            inputs["name"].value.length <= 80
    );

    validate(
        "Số lượng phải để trống hoặc là số",
        () =>
            inputs["quantity"].value.length === 0 ||
            !isNaN(parseInt(inputs["quantity"].value))
    );

    validate(
        "Trị giá khuyến mãi phải là số",
        () => !isNaN(parseInt(inputs["price"].value))
    );

    validate(
        "Hình ảnh khuyến mãi là file hình ảnh tối thiểu 30KB",
        () => {
            const file = inputs["image"].files[0];
            return (
                file.name.match(/\.(jpe?g|png|gif|bmp)$/i) &&
                file.size / 1024 >= 30
            );
        }
    );
    return errors;
};

const buildFormData = () => {
    const data = {
        name: document.getElementById("name").value,
        quantity: parseInt(document.getElementById("quantity").value),
        price: parseInt(document.getElementById("unit-price").value),
        image: document.getElementById("image").files[0],
    };
    const output = new FormData();
    Object.keys(data).forEach((key) => output.append(key, data[key]));
    return output;
};

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
