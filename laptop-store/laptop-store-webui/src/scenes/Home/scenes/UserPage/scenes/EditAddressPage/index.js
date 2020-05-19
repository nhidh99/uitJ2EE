import React, { Component, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import { FaBook } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";

class EditAddressPage extends Component {
    state = {
        errors: [],
    };

    buildAddressBody = () => {
        const receiverName = document.getElementById("receiverName").value;
        const phone = document.getElementById("phone").value;
        const city = document.getElementById("city").value;
        const district = document.getElementById("district").value;
        const ward = document.getElementById("ward").value;
        const street = document.getElementById("street").value;
        const addressNum = document.getElementById("addressNum").value;

        return {
            receiverName: receiverName,
            receiverPhone: phone,
            city: city,
            district: district,
            ward: ward,
            street: street,
            addressNum: addressNum,
        };
    };

    validateInputs = (inputs) => {
        const errors = [];
        const validate = (message, condition) => (condition() ? null : errors.push(message));
        validate("Họ và tên không được để trống hoặc chứa chữ số", () =>
            inputs["receiverName"].match(/^[a-zA-Z\s\p{L}]{3,30}$/gu)
        );
        validate("Số điện thoại từ 6 - 12 chữ số", () => inputs["receiverPhone"].match(/^\d{6,12}$/));
        validate("Tỉnh/Thành phố không được để trống", () => inputs["city"].length > 0);
        validate("Quận huyện không được để trống", () => inputs["district"].length > 0);
        validate("Phường xã không được để trống", () => inputs["ward"].length > 0);
        validate("Đường không được để trống", () => inputs["street"].length > 0);
        validate("Số nhà không được để trống", () => inputs["addressNum"].length > 0);
        return errors;
    };


    createAddress = async () => {
        const body = this.buildAddressBody();
        const errors = this.validateInputs(body);

        if (errors.length > 0) {
            this.setState({ errors: errors });
            return;
        }

        const url =
            "/api/addresses/" +
            (this.props.location.state?.address
                ? this.props.location.state.address["id"]
                : "");

        const response = await fetch(url, {
            method: this.props.location.state?.address ? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            alert("success");
            window.location.href = "/user/address";
        }
        const status = parseInt(response.status);
        switch (status) {
            case 201:
                alert("insert thành công");
                window.location.href = "/user/address";
                break;
            case 403:
                this.setState({
                    error: "Not permission",
                    loading: false,
                });
                break;
            case 401:
                alert("You have to login to access this page.");
                window.location.href = "/auth/login";
                break;
            default:
                this.setState({
                    error: "Server error",
                    loading: false,
                });
        }
    }

    render() {
        const address = this.props.location.state?.address;
        const { errors } = this.state;
        return (
            <Fragment>
                <header className={styles.header}>
                    <FaBook />
                    &nbsp;&nbsp;{address ? "SỬA ĐỊA CHỈ" : "TẠO ĐỊA CHỈ"}
                    <Button color="success" onClick={this.createAddress} className={styles.button}>
                        Lưu địa chỉ
                    </Button>
                </header>
        {errors.length > 0 ? (
            <p>
            {errors.map((error) => (
                    <label className={styles.error}>{error}.</label>
        ))}
        </p>
        ) : null}
                <table className={styles.form}>
                    <tbody>
                        <tr>
                            <td className={styles.labelCol}>
                                <Label>Họ và tên:</Label>
                            </td>
                            <td className={styles.inputCol}>
                                <Input
                                    type="text"
                                    name="receiverName"
                                    id="receiverName"
                                    placeholder="Nhập họ và tên"
                                    defaultValue={address != null ? address["receiver_name"] : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label className={styles.labelCol}>Điện thoại:</Label>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Nhập số điện thoại"
                                    defaultValue={
                                        address != null ? address["receiver_phone"] : null
                                    }
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label className={styles.labelCol}>Tỉnh/Thành:</Label>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Nhập tỉnh/ thành phố"
                                    defaultValue={address != null ? address["city"] : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label className={styles.labelCol}>Quận huyện:</Label>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="district"
                                    id="district"
                                    placeholder="Nhập quận huyện"
                                    defaultValue={address != null ? address["district"] : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label className={styles.labelCol}>Phường xã:</Label>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="ward"
                                    id="ward"
                                    placeholder="Nhập phường xã"
                                    defaultValue={address != null ? address["ward"] : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label className={styles.labelCol}>Đường:</Label>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="street"
                                    id="street"
                                    placeholder="Nhập tên đường"
                                    defaultValue={address != null ? address["street"] : null}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Label className={styles.labelCol}>Địa chỉ:</Label>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    name="addressNum"
                                    id="addressNum"
                                    rows="3"
                                    placeholder="Nhập địa chỉ (hẻm, số nhà)"
                                    defaultValue={address != null ? address["address_num"] : null}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Fragment>
        );
    }
}
export default EditAddressPage;
