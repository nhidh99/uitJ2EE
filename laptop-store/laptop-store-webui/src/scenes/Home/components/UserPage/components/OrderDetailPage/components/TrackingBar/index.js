import React, { Component } from 'react';
import { Progress, Row, Col } from 'reactstrap';
import styles from './styles.module.scss';
class TrackingBar extends Component {

    render() {
        return (
            <div>
                <Progress color="success" value="25"/>
                <Row>
                    <Col>Đặt hàng</Col>
                    <Col>Xác nhận</Col>
                    <Col>Giao cho ĐVVC</Col>
                    <Col className={styles.progressRight}>Giao Hàng</Col>
                    <Col className={styles.progressRight}>Đánh giá</Col>
                </Row>

            </div>

        );
    }
}

export default TrackingBar;