import React, { Component, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaInfoCircle } from "react-icons/fa";
import { getCookie } from "../../../../../../services/helper/cookie";

class InfoPage extends Component {

    state = {
        loading: true,
        user: []
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("/api/user", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            }
        });

        if (response.ok) {
            const user = await response.json();
            console.log(user);
            this.setState({
                user: user,
                loading: false,
            });
        }
        else {
            const status = parseInt(response.status);
                switch (status) {
                    case 403:
                        this.setState({
                            error: "Not permission",
                            loading: false
                        });
                        break;
                    case 401: 
                        alert('You have to login to access this page.')
                        window.location.href = "/auth/login";
                        break;
                    default:
                        this.setState({
                            error: "Server error",
                            loading: false
                        });
                }
        }
    };

    render() {
        return (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaInfoCircle />
                        &nbsp;&nbsp;THÔNG TIN TÀI KHOẢN
                    </label>
                    <Button type="submit" className={styles.submit} color="success">
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
                                value={this.state.user['name']}
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
                                value={this.state.user['phone']}
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
                                value={this.state.user['email']}
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label}>Giới tính:</Label>
                        </td>
                        <td>
                            <Label className={styles.radioInput}>
                                <Input type="radio" name="gender" value="Nam" />
                                Nam
                            </Label>
                            <Label className={styles.radioInput}>
                                <Input type="radio" name="gender" value="Nữ" />
                                Nữ
                            </Label>
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
