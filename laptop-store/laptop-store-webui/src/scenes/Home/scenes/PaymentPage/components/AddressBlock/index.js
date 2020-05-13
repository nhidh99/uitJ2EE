import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Input } from "reactstrap";

class AddressBlock extends Component {
    render() {
        return (
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Chọn địa chỉ:</td>
                        <td className={styles.inputCol}>
                            <Input type="select" name="address" id="address">
                                <option>
                                    Địa chỉ: Khu phố bình đức 1, Lái Thiêu, Thuận An, Bình Dương
                                </option>
                                <option>Địa chỉ 2: abcedf</option>
                            </Input>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Người nhận:</td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                id="fullName"
                                value="Vương Thịnh Đạt"
                                readOnly="true"
                            ></Input>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Điện thoại:</td>
                        <td className={styles.inputCol}>
                            <Input
                                type="text"
                                id="telephone"
                                value="0782369351"
                                readOnly="true"
                            ></Input>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default AddressBlock;
