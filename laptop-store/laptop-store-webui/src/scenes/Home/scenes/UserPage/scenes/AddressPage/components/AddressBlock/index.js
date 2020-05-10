import React, { Component } from 'react';
import { Button, ButtonGroup } from "reactstrap";
import { FaTrash, FaPen } from "react-icons/fa";
import {Link} from 'react-router-dom';
import styles from './styles.module.scss';
import AddressDelete from '../AddressDelete';
class AddressBlock extends Component {

    render() {
        const address = this.props.address;
        return (
            <div className={styles.addressBlock}>
                <ButtonGroup className={styles.actions}>
                    <AddressDelete address = {address} />
                    <Link to=
                        {{
                            pathname: '/user/address/edit/' + address['id'],
                            state: {
                                address: this.props.address,
                            }
                        }}>
                        <Button color="primary">
                            <FaPen />
                        </Button>
                    </Link>

                </ButtonGroup>

                <b>Người nhận: </b>
                <label>{address['receiver_name']}</label>
                <br />

                <b>Địa chỉ: </b>
                <label>{address['address_num'] + ' ' + address['street'] + ' ' + address['ward'] + ' ' + address['district'] + ' ' + address['city']}</label>
                <br />

                <b>Điện thoại: </b>
                <label>{address['phone']}</label>
            </div>
        );
    }
}

export default AddressBlock;