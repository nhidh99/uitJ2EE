import React, { Component } from 'react';
import { Col, Row, ListGroupItem, Label, Button, ButtonGroup } from 'reactstrap';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import styles from './styles.module.scss';
class LaterBlock extends Component {
    render() {
        return (
            <ListGroupItem>
                <Row>
                    <Col sm="3" className={styles.blockLeft}>
                        <img src={require("../../../../../../../../images/laptop/laptop1.jpg")}
                            width={130} height={120} alt="product" />
                    </Col>
                    <Col sm="6" className={styles.blockCenter}>
                        <Label tag="a" href="/user/save-for-later">Laptop Lenovo Ideapad 520s-14IKB 80X200J2VN Core i3-7130U/ Win10 (14" FHD IPS) - Hàng Chính Hãng</Label>
                        <br/>
                        <Label className={styles.priceLabel}>16.666.999đ</Label>
                        <Label className={styles.pricePromotion}><s>19.900.000đ </s></Label>
                    </Col>
                    <Col sm="3" className={styles.blockRight}>
                        <ButtonGroup>
                            <Button color="success"><FaShoppingCart/></Button>
                            <Button color="danger"><FaTrashAlt/></Button>
                        </ButtonGroup>
                    </Col>
                </Row>
            </ListGroupItem>
        );
    }
}

export default LaterBlock;