import React, { Component } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import AddressDelete from "../AddressDelete";

class AddressBlock extends Component {
    render() {
        const address = this.props.address;

        return (
            <div className={styles.addressBlock}>
                <ButtonGroup className={styles.actions}>
                    <AddressDelete address={address} />
                    <Link
                        to={{
                            pathname: "/user/address/edit",
                            state: {
                                address: address,
                            },
                        }}
                    >
                        <Button color="primary">
                            <FaPen />
                        </Button>
                    </Link>
                </ButtonGroup>

                <label>
                    <b>Người nhận: </b>
                    {address["receiver_name"]}
                </label>
                <br />

                <label>
                    <b>Điện thoại: </b>
                    {address["phone"]}
                </label>
                <br />

                <label>
                    <b>Địa chỉ: </b>
                    {address["address_num"] +
                        " " +
                        address["street"] +
                        " " +
                        address["ward"] +
                        " " +
                        address["district"] +
                        " " +
                        address["city"]}
                </label>
            </div>
        );
    }
}

export default AddressBlock;
