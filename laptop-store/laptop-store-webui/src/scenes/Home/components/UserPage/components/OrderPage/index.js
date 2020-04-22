import React, { Component } from 'react';
import {Container, Row, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import {FaBoxes} from 'react-icons/fa';
import SideBar  from '../SideBar';
import styles from './styles.module.scss';
class OrderPage extends Component {
    render() {
        return (
            <Container id="content">
            <Row>
                <SideBar />
                <Col md="9" className={styles.inner}>
                    <Row className={styles.pageHeader}>
                        <h3><FaBoxes />  Đơn hàng của tôi</h3>
                    </Row>
                    <Table className={styles.orderTable}>
                        <thead>
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Ngày mua</th>
                                <th>Sản phẩm</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái đơn hàng</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><Link to="/user/order/551199331">551199331</Link></td>
                                <td>15/12/2018</td>
                                <td>Set Mèo Nổ Tưng Bừng: Combo Mèo Nổ + 4 Bản Mở Rộng...và 01 sản phẩm khác</td>
                                <td>217.000 <u>đ</u></td>
                                <td>Giao hàng thành công</td>
                            </tr>
                            <tr>
                                <td>551199332</td>
                                <td>15/12/2018</td>
                                <td>Set Mèo Nổ Tưng Bừng: Combo Mèo Nổ + 4 Bản Mở Rộng...và 01 sản phẩm khác và 10 sản phẩm nữa</td>
                                <td>217.000 <u>đ</u></td>
                                <td>Giao hàng thành công</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default OrderPage;