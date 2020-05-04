import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
    FaLaptopCode,
    FaSearch,
    FaShoppingCart,
    FaBoxes,
    FaUser,
    FaInfoCircle,
    FaEdit,
} from "react-icons/fa";
import { Label, Input, InputGroupText, InputGroupAddon, InputGroup, Badge } from "reactstrap";
import styles from "./styles.module.scss";
import { getCart } from "../../services/helper/cart";

class Banner extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.banner}>
                    <BannerLeft />
                    <BannerRight />
                </div>
            </div>
        );
    }
}

const BannerLeft = () => (
    <div className={styles.bannerLeft}>
        <Link className={styles.logo} to="/">
            <FaLaptopCode className={styles.icon} color="white" size={35} />
            <Label className={styles.name}>Laptop Store</Label>
        </Link>

        <div className={styles.searchBar}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <FaSearch />
                    </InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Tìm kiếm..." />
            </InputGroup>
        </div>
    </div>
);

const BannerRight = () => (
    <div className={styles.bannerRight}>
        <table cellspacing="10">
            <tbody>
                <tr>
                    <BannerCategory href="/" icon={<FaInfoCircle />} title="Thông tin" />

                    <BannerCategory href="/admin/orders" icon={<FaEdit />} title="Quản lí" />

                    <BannerCategory href="/" icon={<FaBoxes />} title="Đơn hàng" />

                    <BannerCategory
                        href="/cart"
                        icon={
                            <Fragment>
                                <FaShoppingCart />
                                &nbsp;
                                <Badge pill id="cart-quantity" className={styles.cartCount}>
                                    {Object.values(getCart()).reduce((a, b) => a + b, 0)}
                                </Badge>
                            </Fragment>
                        }
                        title="Giỏ hàng"
                    />

                    <BannerCategory href="/" icon={<FaUser />} title="Đăng nhập" />
                </tr>
            </tbody>
        </table>
    </div>
);

const BannerCategory = ({ href, icon, title }) => (
    <Link to={href}>
        <td className={styles.category}>
            <div className={styles.icon}>{icon}</div>
            <Label className={styles.label}>{title}</Label>
        </td>
    </Link>
);

export default Banner;
