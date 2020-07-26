/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import { Input } from "reactstrap";

const AddressBlock = ({addresses}) => {
    useEffect(() => {
        if (addresses.length > 0) {
            loadReceiver();
        }
    }, [addresses]);

    const loadReceiver = () => {
        const index = document.getElementById("address").selectedIndex;
        const name = document.getElementById("receiver-name");
        const phone = document.getElementById("receiver-phone");
        name.value = addresses[index]["receiver_name"];
        phone.value = addresses[index]["receiver_phone"];
    };

    return (
        <table className={styles.table}>
            <tbody>
                <tr>
                    <td className={styles.labelCol}>Chọn địa chỉ:</td>
                    <td className={styles.inputCol}>
                        <Input type="select" name="address" id="address" onChange={loadReceiver}>
                            {addresses.map((address) => (
                                <option value={address["id"]}>
                                    {[
                                        address["address_num"],
                                        address["street"],
                                        address["ward"],
                                        address["district"],
                                        address["city"],
                                    ].join(", ")}
                                </option>
                            ))}
                        </Input>
                    </td>
                </tr>
                <tr>
                    <td className={styles.labelCol}>Người nhận:</td>
                    <td className={styles.inputCol}>
                        <Input type="text" id="receiver-name" readOnly></Input>
                    </td>
                </tr>
                <tr>
                    <td className={styles.labelCol}>Điện thoại:</td>
                    <td className={styles.inputCol}>
                        <Input type="text" id="receiver-phone" readOnly></Input>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default AddressBlock;
