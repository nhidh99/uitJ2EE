import React, { Component, Fragment } from "react";
import { Input, InputGroup, InputGroupAddon, InputGroupText, Button } from "reactstrap";
import styles from "./styles.module.scss";
import NumberFormat from "react-number-format";
import {
    MAXIMUM_UNIT_PRICE,
    MAXIMUM_QUANTITY,
    MINIMUM_PROMOTION_IMAGE_WIDTH,
    MINIMUM_PROMOTION_IMAGE_HEIGHT,
} from "../../../../../../constants";

class PromotionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: this.props?.promotionId ?? false,
            promotion: null,
            errors: [],
        };
    }

    componentDidMount() {
        if (this.props.promotionId) {
            this.loadPromotion();
        }
    }

    loadPromotion = async () => {
        const promotionId = this.props.promotionId;
        const response = await fetch(`/api/promotions/${promotionId}`, {
            method: "GET",
        });
        if (response.ok) {
            const promotion = await response.json();
            this.setState({ promotion: promotion, loading: false }, () => {
                const preview = document.getElementById("image-preview");
                preview.style.display = "inline-block";
                preview.src = `/api/images/promotions/${promotion["id"]}/${promotion["alt"]}`;
            });
        }
    };

    validateInputs = () => {
        const errors = getInputErrors();
        this.setState({ errors: errors });
        return errors.length === 0;
    };

    submit = async () => {
        if (this.validateInputs() === false) return;
        const response = await fetch(`/api/promotions/${this.props?.promotionId ?? ""}`, {
            method: this.props.promotionId ? "PUT" : "POST",
            headers: {
                "Content-Type": "multipart/form-data; charset=utf-8",
            },
            body: buildFormData(),
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    render() {
        const { loading, promotion, errors } = this.state;
        return loading ? null : (
            <Fragment>
                {errors.length !== 0
                    ? errors.map((err) => <label className={styles.err}>- {err}</label>)
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
                                    defaultValue={promotion?.name ?? null}
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
                                        const { formattedValue, floatValue } = values;
                                        return (
                                            formattedValue === "" || floatValue <= MAXIMUM_QUANTITY
                                        );
                                    }}
                                    defaultValue={promotion?.quantity ?? null}
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
                                        id="price"
                                        placeholder="Trị giá"
                                        isAllowed={(values) => {
                                            const { formattedValue, floatValue } = values;
                                            return (
                                                formattedValue === "" ||
                                                floatValue <= MAXIMUM_UNIT_PRICE
                                            );
                                        }}
                                        defaultValue={promotion?.price ?? null}
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
                                    onChange={() => previewImage(promotion)}
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
                    <Button color="success" onClick={this.submit} className={styles.button}>
                        Xác nhận
                    </Button>

                    <Button color="secondary" onClick={this.props.toggle} className={styles.button}>
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
        price: document.getElementById("price"),
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
        () => inputs["name"].value.length >= 6 && inputs["name"].value.length <= 80
    );

    validate(
        "Số lượng phải để trống hoặc là một số",
        () =>
            inputs["quantity"].value.length === 0 ||
            !isNaN(parseInt(inputs["quantity"].value.replace(",", "")))
    );

    validate(
        "Trị giá khuyến mãi phải là một số",
        () => !isNaN(parseInt(inputs["price"].value.replace(",", "")))
    );

    validate("Hình ảnh khuyến mãi có kích thước tối thiểu 400x400", () => {
        const preview = document.getElementById("image-preview");
        const files = inputs["image"].files;
        return (
            (files.length === 0 && preview.getAttribute("src")) ||
            (files.length > 0 &&
                files[0].name.match(/\.(jpe?g|png|gif|bmp)$/i) &&
                preview.naturalWidth >= MINIMUM_PROMOTION_IMAGE_WIDTH &&
                preview.naturalHeight >= MINIMUM_PROMOTION_IMAGE_HEIGHT)
        );
    });
    return errors;
};

const buildFormData = () => {
    const name = document.getElementById("name").value;
    const files = document.getElementById("image").files;
    const quantityStr = document.getElementById("quantity").value;
    const priceStr = document.getElementById("price").value;

    const data = {
        name: name,
        image: files.length !== 0 ? files[0] : null,
        quantity: quantityStr ? parseInt(quantityStr.replace(",", "")) : -1,
        price: parseInt(priceStr.replace(",", "")),
    };
    const output = new FormData();
    Object.keys(data).forEach((key) => output.append(key, data[key]));
    return output;
};

const previewImage = (promotion) => {
    const input = document.getElementById("image");
    const preview = document.getElementById("image-preview");
    const initSrc = promotion
        ? `/api/images/promotions/${promotion["id"]}/${promotion["alt"]}`
        : null;

    if (input.files.length > 0) {
        preview.src = window.URL.createObjectURL(input.files[0]);
        preview.style.display = "inline-block";
    } else if (initSrc) {
        preview.src = initSrc;
    } else {
        preview.removeAttribute("src");
        preview.style.display = "none";
    }
};

export default PromotionForm;
