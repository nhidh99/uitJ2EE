import React, { Component, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaLock } from "react-icons/fa";
import { getCookie } from "../../../../../../services/helper/cookie";

class PasswordPage extends Component {

    updatePassword = async () => {
        const oldPassword = document.getElementById("oldPassword").value;
        const newPassword = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if(confirmPassword != newPassword) {
            alert("Vui lòng xác nhận lại mật khẩu");
            return;
        }

        const response = await fetch("/api/users/me/password", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: newPassword
            }),
        });

        if (response.ok) {
            alert('Đã lưu thông tin mới thành công')
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
                    alert('You have to login to access this page.');
                    window.location.href = "/auth/login";
                    break;
                case 400: 
                    alert('Mật khẩu cũ không đúng');
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
                        <FaLock />
                        &nbsp;&nbsp;ĐỔI MẬT KHẨU
                    </label>
                    <Button type="submit" className={styles.submit} color="primary" onClick={this.updatePassword}>
                        Đổi mật khẩu
                    </Button>
                </div>

                <table className={styles.table}>
                    <tr>
                        <td className={styles.labelCol}>
                            <Label className={styles.label} for="oldPassword">
                                Nhập mật khẩu:
                            </Label>
                        </td>
                        <td className={styles.inputCol}>
                            <Input
                                type="password"
                                name="oldPassword"
                                id="oldPassword"
                                placeholder="Mật khẩu hiện tại"
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="newPassword">
                                Mật khẩu mới:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="password"
                                name="newPassword"
                                id="newPassword"
                                placeholder="Mật khẩu mới"
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="confirmPassword">
                                Xác nhận MK:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Nhập lại mật khẩu mới"
                                className={styles.input}
                            />
                        </td>
                    </tr>
                </table>
            </Fragment>
        );
    }
}
export default PasswordPage;
