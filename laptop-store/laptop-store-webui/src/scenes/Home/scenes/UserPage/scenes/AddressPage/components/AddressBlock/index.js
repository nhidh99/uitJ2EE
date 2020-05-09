import React, { Component } from 'react';
import { Button, ButtonGroup } from "reactstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import styles from './styles.module.scss';
class AddressBlock extends Component {
    state = {
        receiverName: '',
        address: '',
        telephone: '',
    };

    render() {
        return (
            <div className={styles.addressBlock}>
                    <ButtonGroup className={styles.actions}>
                        <Button color="danger">
                            <FaTrash />
                        </Button>
                        <Button color="primary">
                            <FaPen />
                        </Button>
                    </ButtonGroup>

                    <b>Người nhận: </b>
                    <label>{this.props.receiverName}</label>
                    <br />

                    <b>Địa chỉ: </b>
                    <label>{this.props.address}</label>
                    <br />

                    <b>Điện thoại: </b>
                    <label>{this.props.telephone}</label>
                </div>
        );
    }
}

export default AddressBlock;