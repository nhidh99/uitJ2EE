import React, { Component } from "react";
import { Col, Row, Label, Button, Input, InputGroup } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import { convertCPUType } from "../../../../../../services/helper/converter";
import {
    getCart,
    updateCartQuantity,
    removeFromCart,
    updateCart,
    updateCartDatabase,
} from "../../../../../../services/helper/cart";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../../../../../constants";

class ItemBlock extends Component {
    state = {
        promotions: [],
    };

    timeout = null;

    componentDidMount() {
        this.loadPromotions();
    }

    loadPromotions = async () => {
        const { product } = this.props;
        const response = await fetch(`/api/laptops/${product["id"]}/promotions`);
        if (response.ok) {
            const promotions = await response.json();
            this.setState({ promotions: promotions });
        }
    };

    minusQuantity = (productId) => {
        const input = document.getElementById("quantity-" + productId);
        const cart = getCart();
        const quantity = parseInt(input.value);

        if (quantity > 1 && productId in cart) {
            input.value = quantity - 1;
            cart[productId] = quantity - 1;
            updateCartQuantity(cart);
            this.reloadPageAfterTimeout();
        }
    };

    addQuantity = (productId) => {
        const input = document.getElementById("quantity-" + productId);
        const cart = getCart();
        const quantity = parseInt(input.value);

        if (quantity < 10 && productId in cart) {
            input.value = quantity + 1;
            cart[productId] = quantity + 1;
            updateCartQuantity(cart);
            this.reloadPageAfterTimeout();
        }
    };

    updateQuantity = (productId) => {
        const input = document.getElementById("quantity-" + productId);
        const cart = getCart();
        const quantity = parseInt(input.value);

        if (productId in cart && cart[productId] !== quantity) {
            cart[productId] = quantity;
            updateCart(cart);
            window.location.reload();
        }
    };

    reloadPageAfterTimeout = () => {
        const cart = getCart();
        clearTimeout(this.timeout);
        this.timeout = setTimeout(async () => {
            updateCartDatabase(cart);
            window.location.reload();
        }, 600);
    };

    removeProduct = (productId) => {
        removeFromCart(productId);
        window.location.reload();
    };

    render() {
        const { product, quantity } = this.props;
        const { promotions } = this.state;
        const { cpu, ram, hard_drive, monitor } = product;

        return (
            <Row>
                <Col xs="2" className={styles.blockLeft}>
                    <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                        <img
                            src={`/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                            width={135}
                            height={135}
                            alt={product["name"]}
                            title={product["name"]}
                        />
                    </Link>
                </Col>

                <Col xs="8" className={styles.blockCenter}>
                    <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                        <Label className={styles.name}>
                            {product["name"]} (
                            {`${convertCPUType(cpu["type"])}/${ram["size"]}GB-${ram["bus"]}MHz/${
                                hard_drive["type"]
                            }-${
                                hard_drive["size"] !== 1024
                                    ? hard_drive["size"] + "GB"
                                    : hard_drive["size"] / 1024 + "TB"
                            }/${monitor["size"]}-inch`}
                            )
                        </Label>
                    </Link>

                    <br />
                    <Label className={styles.priceLabel}>
                        {(product["unit_price"] - product["discount_price"]).toLocaleString()}đ
                    </Label>
                    <Label className={styles.pricePromotion}>
                        <s>{product["unit_price"].toLocaleString()}đ</s>
                    </Label>

                    <br />
                    {promotions.length === 0 ? null : (
                        <Label>
                            <b>
                                <i>Quà khuyến mãi:&nbsp;&nbsp;</i>
                            </b>
                            {promotions
                                .map(
                                    (promotion) =>
                                        `${promotion["name"]} (${promotion[
                                            "price"
                                        ].toLocaleString()}đ)`
                                )
                                .join(", ")}
                        </Label>
                    )}
                </Col>

                <Col xs="2" className={styles.blockRight}>
                    <InputGroup>
                        <Input
                            className={styles.updateQuantity}
                            onClick={() => this.minusQuantity(product["id"])}
                            value="-"
                            type="button"
                        ></Input>
                        <NumberFormat
                            id={`quantity-${product["id"]}`}
                            className={`form-control ${styles.quantity}`}
                            thousandSeparator={true}
                            decimalSeparator={false}
                            allowNegative={false}
                            defaultValue={quantity}
                            onBlur={() => this.updateQuantity(product["id"])}
                            isAllowed={(values) => {
                                const { formattedValue, floatValue } = values;
                                return (
                                    !formattedValue.startsWith("0") &&
                                    floatValue <= MAXIMUM_QUANTITY_PER_PRODUCT
                                );
                            }}
                        />
                        <Input
                            className={styles.updateQuantity}
                            onClick={() => this.addQuantity(product["id"])}
                            value="+"
                            type="button"
                        >
                            -
                        </Input>
                        <Button
                            className={styles.remove}
                            color="transparent"
                            onClick={() => this.removeProduct(product["id"])}
                        >
                            <FaTrashAlt />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        );
    }
}

export default ItemBlock;
