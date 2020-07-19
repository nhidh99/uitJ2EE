import React from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { FaMapMarkerAlt, FaBoxes, FaInfoCircle, FaLock, FaDoorOpen, FaList } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { removeCookie } from "../../../../../../services/helper/cookie";

const SideBar = () => {
    const logout = () => {
        removeCookie("access_token");
        localStorage.setItem("cart", null);
        localStorage.setItem("wish-list", null);
        window.location.href = "/";
    };

    return (
        <ListGroup className={styles.listGroup}>
            <ListGroupItem color="secondary">
                <FaList className={styles.icon} />
                <b>Danh mục</b>
            </ListGroupItem>

            <Link to="/user/info" className={styles.link}>
                <ListGroupItem>
                    <FaInfoCircle className={styles.icon} />
                    Thông tin
                </ListGroupItem>
            </Link>

            <Link to="/user/address" className={styles.link}>
                <ListGroupItem>
                    <FaMapMarkerAlt className={styles.icon} />
                    Sổ địa chỉ
                </ListGroupItem>
            </Link>

            <Link to="/user/order" className={styles.link}>
                <ListGroupItem>
                    <FaBoxes className={styles.icon} />
                    Đơn hàng
                </ListGroupItem>
            </Link>

            <Link to="/user/password" className={styles.link}>
                <ListGroupItem>
                    <FaLock className={styles.icon} />
                    Mật khẩu
                </ListGroupItem>
            </Link>

            <Link className={styles.link}>
                <ListGroupItem onClick={logout}>
                    <FaDoorOpen className={styles.icon} />
                    Đăng xuất
                </ListGroupItem>
            </Link>
        </ListGroup>
    );
};

export default SideBar;
