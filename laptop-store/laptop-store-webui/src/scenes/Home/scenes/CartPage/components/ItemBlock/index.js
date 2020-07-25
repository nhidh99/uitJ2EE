/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Label, Button, Input, InputGroup } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import { convertCPUType } from "../../../../../../services/helper/converter";
import {
    getCart,
    removeFromCart,
    updateCartQuantity,
} from "../../../../../../services/helper/cart";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../../../../../constants";
import laptopApi from "../../../../../../services/api/laptopApi";

const ItemBlock = ({ product, quantity, toggleLoading }) => {
    const [promotions, setPromotions] = useState([]);
    const [qty, setQty] = useState(quantity);
    const { cpu, ram, hard_drive, monitor } = product;

    useEffect(() => {
        loadPromotions();
    }, []);

    useEffect(() => {
        toggleLoading();
    }, [qty]);

    useEffect(() => {
        setQty(quantity);
    }, [quantity]);

    const loadPromotions = async () => {
        try {
            const response = await laptopApi.getLaptopPromotions(product["id"]);
            setPromotions(response.data);
        } catch (err) {
            console.log("fail");
        }
    };

    const minusQuantity = async (productId) => {
        const cart = getCart();
        if (qty > 1 && productId in cart) {
            cart[productId] = qty - 1;
            updateCartQuantity(cart);
            setQty(qty - 1);
        }
    };

    const addQuantity = async (productId) => {
        const cart = getCart();
        if (qty < MAXIMUM_QUANTITY_PER_PRODUCT && productId in cart) {
            cart[productId] = qty + 1;
            updateCartQuantity(cart);
            setQty(qty + 1);
        }
    };

    const updateQuantity = async (productId) => {
        const input = document.getElementById("quantity-" + productId);
        const quantity = parseInt(input.value);
        const cart = getCart();

        if (productId in cart && cart[productId] !== quantity) {
            cart[productId] = quantity;
            updateCartQuantity(cart);
            setQty(quantity);
        }
    };

    const removeProduct = async (productId) => {
        await removeFromCart(productId);
        toggleLoading();
    };

    return qty === 0 ? null : (
        <Row className={styles.row}>
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
                                    `${promotion["name"]} (${promotion["price"].toLocaleString()}đ)`
                            )
                            .join(", ")}
                    </Label>
                )}
            </Col>

            <Col xs="2" className={styles.blockRight}>
                <InputGroup>
                    <Input
                        className={styles.updateQuantity}
                        onClick={() => minusQuantity(product["id"])}
                        value="-"
                        type="button"
                    />
                    <NumberFormat
                        id={`quantity-${product["id"]}`}
                        className={`form-control ${styles.quantity}`}
                        thousandSeparator={true}
                        decimalSeparator={false}
                        allowNegative={false}
                        value={qty}
                        onBlur={() => updateQuantity(product["id"])}
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
                        onClick={() => addQuantity(product["id"])}
                        value="+"
                        type="button"
                    />
                    <Button
                        className={styles.remove}
                        color="transparent"
                        onClick={() => removeProduct(product["id"])}
                    >
                        <FaTrashAlt className={styles.trashIcon} />
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default ItemBlock;
