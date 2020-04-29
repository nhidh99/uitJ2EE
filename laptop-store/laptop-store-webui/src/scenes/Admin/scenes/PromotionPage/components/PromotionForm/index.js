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
import ImageInput from "../../../../components/ImageInput";

class PromotionForm extends Component {
    state = {
        errors: [],
        submitted: false,
    };

    componentDidMount() {
        if (this.props.promotion) {
            this.loadPromotion();
        }
    }

    loadPromotion = () => {
        const promotion = this.props.promotion;
        const preview = document.getElementById("image-preview");
        preview.style.display = "inline-block";
        preview.src = `/api/images/200/promotions/${promotion["id"]}/${promotion["alt"]}.jpg`;
    };

    validateInputs = () => {
        const errors = getInputErrors();
        this.setState({ errors: errors });
        return errors.length === 0;
    };

    submit = () => {
        if (this.validateInputs()) {
            this.setState({ submitted: true });
            this.postPromotion();
        }
    };

    postPromotion = async () => {
        const response = await fetch(`/api/promotions/${this.props.promotion?.id ?? ""}`, {
            method: this.props.promotion ? "PUT" : "POST",
            headers: { "Content-Type": "multipart/form-data; charset=utf-8" },
            body: buildFormData(),
        });

        if (response.ok) {
            window.location.reload();
        }
    };

    render() {
        const { errors, submitted } = this.state;
        const { promotion } = this.props;

        return (
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
                            <td className={styles.imageLabel}>Hình ảnh:</td>
                            <td>
                                <ImageInput
                                    imgWidth={100}
                                    imgHeight={100}
                                    defaultSrc={
                                        promotion
                                            ? `/api/images/200/promotions/${promotion["id"]}/${promotion["alt"]}.jpg`
                                            : null
                                    }
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
                        disabled={submitted}
                    >
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
        name: name.trim().replace(/  +/g, " "),
        image: files.length !== 0 ? files[0] : null,
        quantity: quantityStr ? parseInt(quantityStr.replace(/,/g, "")) : -1,
        price: parseInt(priceStr.replace(/,/g, "")),
    };
    const output = new FormData();
    Object.keys(data).forEach((key) => output.append(key, data[key]));
    return output;
};

export default PromotionForm;
