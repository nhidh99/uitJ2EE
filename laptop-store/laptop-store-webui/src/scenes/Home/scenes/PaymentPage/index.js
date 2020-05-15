import React, { Component, Fragment } from "react";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import ProductsBlock from "./components/ProductsBlock";
import PromotionsBlock from "./components/PromotionsBlock";
import SummaryBlock from "./components/SummaryBlock";
import { Button, Spinner } from "reactstrap";
import { getCart, removeFromCart } from "../../../../services/helper/cart";
import { getCookie } from "../../../../services/helper/cookie";
import { FaBoxOpen } from "react-icons/fa";
import Loader from "react-loader-advanced";

class PaymentPage extends Component {
    state = {
        addresses: [],
        promotions: [],
        promotionQties: {},
        products: [],
        isEmptyCart: false,
        submitted: false,
        loading: true,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        await Promise.all([this.loadProducts(), this.loadAddresses(), this.loadPromotions()]);
        this.setState({ loading: false });
    };

    loadProducts = async () => {
        const cart = getCart();
        if (Object.keys(cart).length === 0) {
            this.setState({ products: [] });
            return;
        }

        const params = new URLSearchParams();
        Object.keys(cart).forEach((id) => params.append("ids", id));

        const response = await fetch("/api/laptops?" + params.toString());
        if (response.ok) {
            const products = await response.json();
            const productIds = products.map((product) => product["id"].toString());
            Object.keys(cart)
                .filter((id) => !productIds.includes(id))
                .forEach((id) => removeFromCart(id));
            this.setState({ products: products });
        }
    };

    loadAddresses = async () => {
        const response = await fetch("/api/addresses", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const addresses = await response.json();
            this.setState({ addresses: addresses });
        }
    };

    loadPromotions = async () => {
        const cart = getCart();
        const quantities = {};
        const promotions = [];
        const length = Object.keys(cart).length;
        let count = 0;

        Object.keys(cart).forEach(async (id) => {
            const response = await fetch(`/api/laptops/${id}/promotions`);
            if (response.ok) {
                const data = await response.json();
                data.forEach((promotion) => {
                    const key = promotion["id"];
                    if (key in quantities) {
                        quantities[key] = cart[id] + quantities[key];
                    } else {
                        quantities[key] = cart[id];
                        promotions.push(promotion);
                    }
                });
            }

            if (++count === length) {
                this.setState({
                    promotionQties: quantities,
                    promotions: promotions,
                });
            }
        });
    };

    toggleSubmit = () => {
        this.setState({ submitted: !this.state.submitted });
    };

    render() {
        const { addresses, promotions, products, promotionQties, loading, submitted } = this.state;
        const cart = getCart();
        const productsPrice = products
            .map((p) => cart[p["id"]] * (p["unit_price"] - p["discount_price"]))
            .reduce((a, b) => a + b, 0);

        return (
            <Loader show={loading} message={<Spinner />}>
                {products.length === 0 ? (
                    <div className={styles.emptyCart}>
                        <FaBoxOpen size={80} />
                        <br />
                        {loading ? (
                            <h5>Đang tải giỏ hàng...</h5>
                        ) : (
                            <Fragment>
                                <h4>Giỏ hàng trống</h4>
                                <Button size="lg" color="warning" type="a" href="/">
                                    Quay lại trang mua sắm
                                </Button>
                            </Fragment>
                        )}
                    </div>
                ) : (
                    <Loader show={submitted} message={<Spinner />}>
                        <div className={styles.container}>
                            <div className={styles.address}>
                                <header className={styles.header}>1. ĐỊA CHỈ GIAO HÀNG</header>
                                <Button color="primary">Tạo địa chỉ mới</Button>
                            </div>
                            <AddressBlock addresses={addresses} />

                            <header className={styles.header}>2. DANH SÁCH SẢN PHẨM</header>
                            <ProductsBlock products={products} />

                            <header className={styles.header}>3. DANH SÁCH KHUYẾN MÃI</header>
                            <PromotionsBlock promotions={promotions} quantities={promotionQties} />

                            <SummaryBlock
                                productsPrice={productsPrice}
                                toggleSubmit={this.toggleSubmit}
                            />
                        </div>
                    </Loader>
                )}
            </Loader>
        );
    }
}

export default PaymentPage;
