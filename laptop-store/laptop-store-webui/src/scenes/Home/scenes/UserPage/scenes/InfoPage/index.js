import React, { Component, Fragment } from "react";
import { Label, Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaInfoCircle } from "react-icons/fa";

class InfoPage extends Component {
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
                                <Input type="radio" value="Nam" />
                                Nam
                            </Label>
                            <Label className={styles.radioInput}>
                                <Input type="radio" value="Nam" />
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
