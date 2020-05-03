import React, { Component } from 'react';
import { Container, Col, Row, Label, Button } from 'reactstrap';
import ItemBlock from './components/ItemBlock';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './styles.module.scss';
class CartPage extends Component {
    render() {
        return (
            <Container className={styles.content}>
                <Row>
                    <Col className={styles.title}>
                        <Row className={styles.pageHeader}>
                            <Label className={styles.pageTitle}>Giỏ hàng của tôi</Label>
                            <Button tag="a" href ="/user/payment" className={styles.checkoutBtn} color="success"><FaShoppingCart /> Tiến hành đặt hàng</Button>
                        </Row>
                    </Col>
                    <Row className={styles.section}>
                        <ItemBlock imgUrl={require("../../../../../../images/laptop/laptop1.jpg")}/>
                        <ItemBlock imgUrl={require("../../../../../../images/laptop/laptop2.jpg")}/>
                        <ItemBlock imgUrl={require("../../../../../../images/laptop/laptop3.jpg")}/>
                        <ItemBlock imgUrl={require("../../../../../../images/laptop/laptop4.jpg")}/>
                        <hr className={styles.lineBetween}/>
                        <Col md={{ size: 'auto'}} className={styles.checkout}>
                            <Row>
                                Tổng cộng:<span className={styles.total}>19.999.999đ</span>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Container>
        );
    }
}

export default CartPage;