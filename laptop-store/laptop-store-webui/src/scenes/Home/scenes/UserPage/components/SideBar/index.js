import React, { Component, Fragment } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import {
    FaBook,
    FaMapMarkerAlt,
    FaBell,
    FaUser,
    FaBoxes,
    FaShoppingCart,
    FaInfoCircle,
    FaLock,
} from "react-icons/fa";
import styles from "./styles.module.scss";
class SideBar extends Component {
    render() {
        return (
            <Fragment>
                <ListGroup>
                    <ListGroupItem color="secondary">
                        <FaUser className={styles.icon} />
                        <b>Tài khoản</b>
                    </ListGroupItem>

                    <ListGroupItem tag="a" href="/user/info">
                        <FaInfoCircle className={styles.icon} />
                        Thông tin tài khoản
                    </ListGroupItem>

                    <ListGroupItem tag="a" href="/user/notifications">
                        <FaBell className={styles.icon} />
                        Thông báo của tôi
                    </ListGroupItem>

                    <ListGroupItem tag="a" href="/user/address">
                        <FaMapMarkerAlt className={styles.icon} />
                        Sổ địa chỉ
                    </ListGroupItem>

                    <ListGroupItem tag="a" href="/user/password">
                        <FaLock className={styles.icon} />
                        Đổi mật khẩu
                    </ListGroupItem>
                </ListGroup>

                <br />

                <ListGroup>
                    <ListGroupItem color="secondary">
                        <FaBook className={styles.icon} />
                        <b>Danh mục</b>
                    </ListGroupItem>

                    <ListGroupItem tag="a" href="/user/order">
                        <FaBoxes className={styles.icon} />
                        Đơn hàng
                    </ListGroupItem>

                    <ListGroupItem tag="a" href="/cart">
                        <FaShoppingCart className={styles.icon} />
                        Giỏ hàng
                    </ListGroupItem>
                </ListGroup>
            </Fragment>
        );
    }
}
export default SideBar;
