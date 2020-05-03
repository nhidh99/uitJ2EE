import React, { Component } from 'react';
import { Container, Row, Col, Table, Label } from 'reactstrap';
import { FaBoxes } from 'react-icons/fa';
import SideBar from '../SideBar';
import styles from './styles.module.scss';
import TrackingBar from './components/TrackingBar';
class OrderDetailPage extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <SideBar />
                    <Col md="9" className={styles.inner}>
                        <Row className={styles.pageHeader}>
                            <h3><FaBoxes />  Đơn hàng # {this.props.match.params.orderId} </h3>
                        </Row>
                        <TrackingBar />
                        <br />
                        <Row>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <th>Thời gian giao hàng</th>
                                        <td>Thứ 3, ngày 21 tháng 3 năm 2020</td>
                                        <th>Phí vận chuyển</th>
                                        <td>18.000đ</td>
                                    </tr>
                                    <tr>
                                        <th>Giá trị đơn hàng</th>
                                        <td>25.000.000đ</td>
                                        <th>Số lượng sản phẩm</th>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <th>Tên người nhận </th>
                                        <td>VƯƠNG THỊNH ĐẠT</td>
                                        <th>Điện thoại </th>
                                        <td>0782369351</td>
                                    </tr>
                                    <tr>
                                        <th>Địa chỉ nhận </th>
                                        <td colSpan="3">
                                            C352, Khu phố Bình Đức 1, Phường Lái Thiệu, Thị xã Thuận An, tỉnh Bình Dương
                                        </td>
                                    </tr>

                                </tbody>
                            </Table>
                        </Row>
                        <hr className={styles.space} /> 
                        <Row>
                            <Table borderless className={styles.productTable}>
                                <thead>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Giảm giá</th>
                                        <th>Tạm tính</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><Label tag="a" href="/user/save-for-later">Laptop Lenovo Ideapad 520s-14IKB 80X200J2VN Core i3-7130U/ Win10 (14" FHD IPS) - Hàng Chính Hãng</Label></td>
                                        <td>200.209.000đ</td>
                                        <td>1</td>
                                        <td>10.000.000đ</td>
                                        <td>200.199.000đ</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default OrderDetailPage;