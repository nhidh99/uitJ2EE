import React, { Component, Fragment } from "react";
import { Label, Button } from "reactstrap";
import ItemBlock from "./components/ItemBlock";
import { FaShoppingCart } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCart } from "../../../../services/helper/cart";

class CartPage extends Component {
    state = {
        products: [],
        prices: [],
        loading: true,
    };

    async componentDidMount() {
        await this.loadData();
        this.setState({ loading: false });
    }

    loadData = async () => {
        const cart = getCart();
        return Object.keys(cart).forEach(async (id) => {
            const response = await fetch(`/api/laptops/${id}`);
            if (response.ok) {
                const product = await response.json();
                const price =
                    (product["unit_price"] - product["discount_price"]) * cart[product["id"]];
                this.setState({
                    products: [...this.state.products, product],
                    prices: [...this.state.prices, price],
                });
            }
        });
    };

    render() {
        const { products, loading, prices } = this.state;

        return (
            <Fragment>
                <div className={styles.title}>
                    <Label className={styles.pageTitle}>Giỏ hàng của tôi</Label>
                    <Button tag="a" href="/user/payment" className={styles.btn} color="success">
                        <FaShoppingCart className={styles.icon} /> Tiến hành đặt hàng
                    </Button>
                </div>

                {loading ? null : (
                    <div className={styles.list}>
                        {products.map((product) => (
                            <ItemBlock product={product} />
                        ))}
                        <div className={styles.total}>
                            Tạm tính:&nbsp;
                            <span className={styles.price}>
                                {prices.reduce((a, b) => a + b, 0).toLocaleString()}
                                <sup>đ</sup>
                            </span>
                        </div>
                    </div>
                )}
            </Fragment>
        );
    }
}

export default CartPage;
