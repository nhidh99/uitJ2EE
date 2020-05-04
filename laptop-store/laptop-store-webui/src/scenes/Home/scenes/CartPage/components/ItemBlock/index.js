import React, { Component } from "react";
import { Col, Row, Label, Button, Input, InputGroup } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import { convertCPUType } from "../../../../../../services/helper/converter";
import { getCart } from "../../../../../../services/helper/cart";
import { Link } from "react-router-dom";

class ItemBlock extends Component {
    render() {
        const { product } = this.props;
        const { cpu, ram, hard_drive, monitor } = product;
        const cart = getCart();

        return (
            <Row>
                <Col xs="2" className={styles.blockLeft}>
                    <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                        <img
                            src={`/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                            width={120}
                            height={120}
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
                </Col>

                <Col xs="2" className={styles.blockRight}>
                    <InputGroup>
                        <Input
                            type="number"
                            className={styles.quantity}
                            max={100}
                            defaultValue={cart[product["id"]]}
                        />
                        <Button className={styles.remove} color="transparent">
                            <FaTrashAlt />
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
        );
    }
}

export default ItemBlock;
