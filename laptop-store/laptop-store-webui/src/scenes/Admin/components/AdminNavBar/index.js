import React from "react";
import { Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";
import { FaBoxes, FaLaptop, FaGifts } from "react-icons/fa";
import styles from "./styles.module.scss";

const AdminNavBar = () => (
    <Nav className={styles.nav}>
        <AdminNavItem
            icon={<FaBoxes />}
            href="/admin/orders"
            title="Đơn hàng"
        />
        <AdminNavItem
            icon={<FaLaptop />}
            href="/admin/products"
            title="Sản phẩm"
        />
        <AdminNavItem
            icon={<FaGifts />}
            href="/admin/promotions"
            title="Khuyến mãi"
        />
    </Nav>
);

const AdminNavItem = ({ icon, href, title }) => {
    const selected = window.location.pathname === href;
    return (
        <NavItem
            className={`${styles.item} ${selected ? styles.selected : ""}`}
        >
            <Link to={href} className={styles.link}>
                {icon} &nbsp;{title}
            </Link>
        </NavItem>
    );
};

export default AdminNavBar;
