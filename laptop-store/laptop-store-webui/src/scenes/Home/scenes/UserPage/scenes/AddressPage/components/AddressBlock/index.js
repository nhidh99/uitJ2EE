import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaPen } from "react-icons/fa";
import styles from "./styles.module.scss";
import AddressDelete from "../AddressDelete";
import { withRouter } from "react-router-dom";

class AddressBlock extends Component {
    redirectToEdit = (address) => {
        this.props.history.push({
            pathname: "/user/address/edit",
            state: { address: address },
        });
    };

    render() {
        const address = this.props.address;

        return (
            <div className={styles.addressBlock}>
                <ButtonGroup className={styles.actions}>
                    <AddressDelete address={address} />
                    <Button color="primary" onClick={() => this.redirectToEdit(address)}>
                        <FaPen />
                    </Button>
                </ButtonGroup>

                <label>
                    <b>Người nhận: </b>
                    {address["receiver_name"]}
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
    }
}

export default withRouter(AddressBlock);
