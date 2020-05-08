import React, { Component, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaLock } from "react-icons/fa";

class PasswordPage extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaLock />
                        &nbsp;&nbsp;ĐỔI MẬT KHẨU
                    </label>
                    <Button type="submit" className={styles.submit} color="primary">
                        Đổi mật khẩu
                    </Button>
                </div>

                <table className={styles.table}>
                    <tr>
                        <td className={styles.labelCol}>
                            <Label className={styles.label} for="fullName">
                                Nhập mật khẩu:
                            </Label>
                        </td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Mật khẩu hiện tại"
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="telephone">
                                Mật khẩu mới:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="text"
                                name="telephone"
                                id="telephone"
                                placeholder="Mật khẩu mới"
                                className={styles.input}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Label className={styles.label} for="email">
                                Xác nhận MK:
                            </Label>
                        </td>
                        <td>
                            <Input
                                type="email"
                                name="email"
                                id="email"
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
