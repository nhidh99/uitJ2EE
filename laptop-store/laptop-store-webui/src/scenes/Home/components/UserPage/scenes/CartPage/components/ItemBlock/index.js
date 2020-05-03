import React, { Component } from "react";
import { Col, Row, Label, Button, InputGroup, Input } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
class ItemBlock extends Component {
    render() {
        return (
            <React.Fragment>
                <Row className={styles.item}>
                    <Col sm="2" className={styles.blockLeft}>
                        <img src={this.props.imgUrl} width={130} height={120} alt="product" />
                    </Col>
                    <Col sm="8" className={styles.blockCenter}>
                        <Label tag="a" href="/user/cart">
                            Laptop Lenovo Ideapad 520s-14IKB 80X200J2VN Core i3-7130U/ Win10 (14"
                            FHD IPS) - Hàng Chính Hãng
                        </Label>
                        <br />
                        <Label className={styles.priceLabel}>16.666.999đ</Label>
                        <Label className={styles.pricePromotion}>
                            <s>19.900.000đ </s>
                        </Label>
                    </Col>
                    <Col sm={{ size: "auto" }} className={styles.blockRight}>
                        <InputGroup>
                            <Button className={styles.quantityBtn}>-</Button>
                            <Input type="number" className={styles.quantity} />
                            <Button className={styles.quantityBtn}>+</Button>
                        </InputGroup>
                    </Col>
                    <Col>
                        <Button className={styles.remove}>
                            <FaTrashAlt />
                        </Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
}

export default ItemBlock;
