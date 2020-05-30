import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Input } from "reactstrap";

class AddressBlock extends Component {
    componentWillReceiveProps() {
        const addresses = this.props.addresses;
        if (addresses.length > 0) {
            this.loadReceiver();
        }
    }

    loadReceiver = () => {
        const addresses = this.props.addresses;
        const index = document.getElementById("address").selectedIndex;
        const name = document.getElementById("receiver-name");
        const phone = document.getElementById("receiver-phone");
        name.value = addresses[index]["receiver_name"];
        phone.value = addresses[index]["receiver_phone"];
    };

    render() {
        const { addresses } = this.props;
        return (
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Chọn địa chỉ:</td>
                        <td className={styles.inputCol}>
                            <Input
                                type="select"
                                name="address"
                                id="address"
                                onChange={this.loadReceiver}
                            >
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
    }
}

export default AddressBlock;
