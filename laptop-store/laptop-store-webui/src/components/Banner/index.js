import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
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
import store from "../../services/redux/store";
import { toggleFilter, closeFilter } from "../../services/redux/actions";

const Banner = (props) => {
    const redirectToPage = (href, toggle) => {
        if (href) {
            props.history.push(href);
        }
        store.dispatch(toggle ? toggleFilter() : closeFilter());
    };

    const searchProductsByName = (e) => {
        if (e.keyCode === 13) {
            const name = e.target.value;
            const params = new URLSearchParams();
            params.append("name", name);
            const url = `/search?${params.toString()}`;
            props.history.push(url);
        }
    };

    const BannerLeft = () => (
        <div className={styles.bannerLeft}>
            <Link className={styles.logo} to="/" onClick={() => store.dispatch(closeFilter())}>
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
                    <Input
                        className={styles.searchInput}
                        id="btn-search"
                        type="text"
                        placeholder="Tìm kiếm..."
                        onKeyUp={searchProductsByName}
                    />
                </InputGroup>
            </div>
        </div>
    );

    const BannerRight = () => {
        const role = props.role;
        return (
            <div className={styles.bannerRight}>
                <table cellspacing="10">
                    <tbody>
                        <tr>
                            <BannerCategory href="/" icon={<FaInfoCircle />} title="Thông tin" />

                            {role === ROLE_ADMIN ? (
                                <BannerCategory
                                    href="/admin/orders"
                                    icon={<FaEdit />}
                                    title="Quản lí"
                                />
                            ) : null}

                            <BannerCategory
                                href={role === ROLE_GUEST ? "/auth/login" : "/user/order"}
                                icon={<FaBoxes />}
                                title="Đơn hàng"
                            />

                            <BannerCategory href="/cart" icon={<CartIcon />} title="Giỏ hàng" />

                            {role === ROLE_GUEST ? (
                                <BannerCategory
                                    href="/auth/login"
                                    icon={<FaUser />}
                                    title="Đăng nhập"
                                />
                            ) : (
                                <BannerCategory
                                    href="/user/info"
                                    icon={<FaUser />}
                                    title="Tài khoản"
                                />
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const BannerCategory = (props) => {
        const { href, icon, title, toggle } = props;
        return (
            <span className={styles.bannerCategory} onClick={() => redirectToPage(href, toggle)}>
                <td className={styles.category}>
                    <div className={styles.icon}>{icon}</div>
                    <Label className={styles.label}>{title}</Label>
                </td>
            </span>
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

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <BannerLeft />
                <BannerRight />
            </div>
        </div>
    );
};

export default withRouter(Banner);
