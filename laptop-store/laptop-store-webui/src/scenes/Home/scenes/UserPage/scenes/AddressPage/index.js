import React, { Component, Fragment } from "react";
import { Button, ButtonGroup } from "reactstrap";
import { FaBook, FaTrash, FaPen } from "react-icons/fa";
import styles from "./styles.module.scss";

class AddressPage extends Component {
    render() {
        return (
            <Fragment>
                <div className={styles.title}>
                    <label className={styles.header}>
                        <FaBook />
                        &nbsp;&nbsp;SỔ ĐỊA CHỈ
                    </label>
                    <Button color="success" className={styles.submit}>
                        Thêm địa chỉ
                    </Button>
                </div>

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
                    <label>ĐINH HOÀNG NHI</label>
                    <br />

                    <b>Địa chỉ: </b>
                    <label>KTX Khu B ĐHQG Phường Đông Hòa Thị xã Dĩ An Bình Dương</label>
                    <br />

                    <b>Điện thoại: </b>
                    <label>0336251885</label>
                </div>

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
                    <label>ĐINH HOÀNG NHI</label>
                    <br />

                    <b>Địa chỉ: </b>
                    <label>KTX Khu B ĐHQG Phường Đông Hòa Thị xã Dĩ An Bình Dương</label>
                    <br />

                    <b>Điện thoại: </b>
                    <label>0336251885</label>
                </div>

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
                    <label>ĐINH HOÀNG NHI</label>
                    <br />

                    <b>Địa chỉ: </b>
                    <label>KTX Khu B ĐHQG Phường Đông Hòa Thị xã Dĩ An Bình Dương</label>
                    <br />

                    <b>Điện thoại: </b>
                    <label>0336251885</label>
                </div>
            </Fragment>
        );
    }
}
export default AddressPage;
