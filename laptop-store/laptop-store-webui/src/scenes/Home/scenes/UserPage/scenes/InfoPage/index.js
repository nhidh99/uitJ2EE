import React, { Component, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaInfoCircle } from "react-icons/fa";
import { getCookie } from "../../../../../../services/helper/cookie";

class InfoPage extends Component {
    state = {
        loading: true,
        user: null,
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("/api/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
        });

        if (response.ok) {
            const user = await response.json();
            this.setState({ user: user, loading: false });
            const date = document.getElementById("birthday");
            const birthday = user["birthday"];
            date.valueAsDate = new Date(
                birthday["year"],
                birthday["monthValue"] - 1,
                birthday["dayOfMonth"],
                -new Date().getTimezoneOffset() / 60
            );
        } else {
            const status = parseInt(response.status);
            switch (status) {
                case 403:
                    this.setState({
                        error: "Not permission",
                        loading: false,
                    });
                    break;
                case 401:
                    window.location.href = "/auth/login";
                    break;
                default:
                    break;
            }
        }
    };

    updateUser = async () => {
        const name = document.getElementById("fullName").value;
        const telephone = document.getElementById("telephone").value;
        const email = document.getElementById("email").value;
        const gender = document.getElementById("gender").value;
        const birthday = document.getElementById("birthday").value;

        const response = await fetch("/api/users/me", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify({
                name: name,
                phone: telephone,
                email: email,
                gender: gender,
                birthday: new Date(birthday).getTime(),
            }),
        });

        if (response.ok) {
            alert("Đã lưu thông tin mới thành công");
        } else {
            const status = parseInt(response.status);
            switch (status) {
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
    };

    render() {
        const { user, loading } = this.state;

        return loading ? null : (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaInfoCircle />
                        &nbsp;&nbsp;THÔNG TIN TÀI KHOẢN
                    </label>
                    <Button
                        type="submit"
                        className={styles.submit}
                        color="success"
                        onClick={this.updateUser}
                    >
                        Lưu
                    </Button>
                </div>
                <table className={styles.table}>
                    <tr>
                        <td className={styles.labelCol}>
                            <Label className={styles.label} for="fullName">
                                Họ và tên:
                            </Label>
                        </td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Nhập họ và tên"
                                defaultValue={user?.["name"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="telephone">
                                Điện thoại:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="telephone"
                                id="telephone"
                                placeholder="Nhập số điện thoại"
                                defaultValue={user?.["phone"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="email">
                                Email:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Nhập email"
                                defaultValue={user?.["email"]}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label}>Giới tính:</Label>
                        </td>
                        <td>
                            <Input
                                type="select"
                                id="gender"
                                defaultValue={user?.["gender"]}
                                className={styles.input}
                            >
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </Input>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="birthday">
                                Ngày sinh:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="date"
                                name="birthday"
                                id="birthday"
                                placeholder="Nhập ngày sinh"
                                className={styles.input}
                            />
                        </td>
                    </tr>
                </table>
            </Fragment>
        );
    }
}
export default InfoPage;
