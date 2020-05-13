import React, { Component, Fragment } from "react";
import { Label, Button } from "reactstrap";
import ItemBlock from "./components/ItemBlock";
import { FaShoppingCart, FaBoxOpen, FaGift, FaMoneyBillWave } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCart, removeFromCart } from "../../../../services/helper/cart";
import { withRouter } from "react-router-dom";

class CartPage extends Component {
    state = {
        loading: true,
        products: [],
        totalPrice: 0,
        totalDiscount: 0,
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        const cart = getCart();
        const products = [];

        let length = Object.keys(cart).length;
        let totalPrice = 0;
        let totalDiscount = 0;
        let count = 0;

        if (length === 0) {
            this.setState({ loading: false });
            return;
        }

        Object.keys(cart).forEach(async (id) => {
            const response = await fetch(`/api/laptops/${id}`);
            if (response.ok) {
                const product = await response.json();
                const quantity = cart[[product["id"]]];
                const discount = product["discount_price"] * quantity;
                const price = (product["unit_price"] - product["discount_price"]) * quantity;

                products.push(product);
                totalPrice += price;
                totalDiscount += discount;
                count++;
            } else {
                if (response.status === 404) {
                    removeFromCart(id);
                    length--;
                }
            }

            if (count === length) {
                products.sort((a, b) => (a["id"] > b["id"] ? 1 : a["id"] < b["id"] ? -1 : 0));
                this.setState({
                    products: products,
                    totalPrice: totalPrice,
                    totalDiscount: totalDiscount,
                    loading: false,
                });
            }
        });
    };

    redirectToPayment = () => {
        this.props.history.push("/payment");
    };

    render() {
        const { products, totalPrice, totalDiscount, loading } = this.state;
        const cart = getCart();

        return (
            <Fragment>
                <div className={styles.title}>
                    <Label className={styles.pageTitle}>Giỏ hàng của tôi</Label>
                    <Button onClick={this.redirectToPayment} className={styles.btn} color="success">
                        <FaShoppingCart className={styles.icon} /> Tiến hành đặt hàng
                    </Button>
                </div>

                {loading || products.length === 0 ? null : (
                    <div className={styles.total}>
                        <span>
                            <b>
                                <FaBoxOpen />
                                &nbsp; Số lượng:&nbsp;&nbsp;
                            </b>
                            {Object.values(cart).reduce((a, b) => a + b, 0)}
                        </span>
                        <span>
                            <b>
                                <FaGift />
                                &nbsp; Tổng giảm giá:&nbsp;&nbsp;
                            </b>
                            {totalDiscount.toLocaleString()}
                            <sup>đ</sup>
                        </span>
                        <span>
                            <b>
                                <FaMoneyBillWave />
                                &nbsp; Tạm tính:&nbsp;&nbsp;
                            </b>
                            {totalPrice.toLocaleString()}
                            <sup>đ</sup>
                        </span>
                    </div>
                )}

                {loading ? null : (
                    <div className={styles.list}>
                        {products.length === 0 ? (
                            <div className={styles.emptyCart}>
                                <FaBoxOpen size={80} />
                                <br />
                                <h4>Giỏ hàng trống</h4>
                                <Button size="lg" color="warning" type="a" href="/">
                                    Quay lại trang mua sắm
                                </Button>
                            </div>
                        ) : (
                            products.map((product) => (
                                <ItemBlock product={product} quantity={cart[product["id"]]} />
                            ))
                        )}
                    </div>
                )}
            </Fragment>
        );
    }
}

export default withRouter(CartPage);
