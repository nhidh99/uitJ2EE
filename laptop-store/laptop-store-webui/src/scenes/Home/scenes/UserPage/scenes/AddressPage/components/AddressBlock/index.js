import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaPen, FaCheckCircle } from "react-icons/fa";
import styles from "./styles.module.scss";
import AddressDelete from "../AddressDelete";
import { withRouter } from "react-router-dom";

const AddressBlock = (props) => {
    const { address, isDefault, history } = props;

    const redirectToEdit = (addressId) => {
        history.push(`/user/address/${addressId}`);
    }

    return (
        <div className={styles.addressBlock}>
            <ButtonGroup className={styles.actions}>
                <AddressDelete address={address} />
                <Button color="primary" onClick={() => redirectToEdit(address["id"])}>
                    <FaPen />
                </Button>
            </ButtonGroup>

            <label>
                <b>Người nhận: </b>
                {address["receiver_name"]}
                {isDefault ? (
                    <span className={styles.default}>
                        <FaCheckCircle className={styles.logo} />
                        Địa chỉ mặc định
                    </span>
                ) : null}
            </label>
            <br />

            <label>
                <b>Điện thoại: </b>
                {address["receiver_phone"]}
            </label>
            <br />

            <label>
                <b>Địa chỉ: </b>
                {[
                    address["address_num"],
                    address["street"],
                    address["ward"],
                    address["district"],
                    address["city"],
                ].join(", ")}
            </label>
        </div>
    );
};

export default withRouter(AddressBlock);
