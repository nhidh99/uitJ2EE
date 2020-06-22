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
import { ROLE_ADMIN, ROLE_GUEST } from "../../constants";

class Banner extends Component {
    render() {
        const { role } = this.props;
        return (
            <div className={styles.container}>
                <div className={styles.banner}>
                    <BannerLeft />
                    <BannerRight role={role} />
                </div>
            </div>
        );
    }

    componentDidMount () {
        var search = document.getElementById("search");
        search.addEventListener("keypress", function(event) {
            if(event.keyCode === 13) {
                let url = "/result?type=name&value=" + search.value;
                window.location.replace(url);
            }
        })
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
                <Input id="search" type="text" placeholder="Tìm kiếm..."/>
            </InputGroup>
        </div>
    </div>
);

const BannerRight = ({ role }) => (
    <div className={styles.bannerRight}>
        <table cellspacing="10">
            <tbody>
                <tr>
                    <BannerCategory href="/" icon={<FaInfoCircle />} title="Thông tin" />

                    {role === ROLE_ADMIN ? (
                        <BannerCategory href="/admin/orders" icon={<FaEdit />} title="Quản lí" />
                    ) : null}

                    <BannerCategory href="/" icon={<FaBoxes />} title="Đơn hàng" />

                    <BannerCategory href="/cart" icon={<CartIcon />} title="Giỏ hàng" />

                    {role === ROLE_GUEST ? (
                        <BannerCategory href="/auth/login" icon={<FaUser />} title="Đăng nhập" />
                    ) : (
                        <BannerCategory href="/user/info" icon={<FaUser />} title="Tài khoản" />
                    )}
                </tr>
            </tbody>
        </table>
    </div>
);

const BannerCategory = (props) => {
    const { href, icon, title } = props;
    return (
        <Link to={href}>
            <td className={styles.category}>
                <div className={styles.icon}>{icon}</div>
                <Label className={styles.label}>{title}</Label>
            </td>
        </Link>
    );
};

const CartIcon = () => (
    <Fragment>
        <FaShoppingCart />
        &nbsp;
        <Badge pill id="cart-quantity" className={styles.cartCount}>
            {Object.values(getCart()).reduce((a, b) => a + b, 0)}
        </Badge>
    </Fragment>
);

export default Banner;
