import React, { Component } from 'react';
import { Container, Row, Col, Table, Form, FormGroup, Label, Input, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './styles.module.scss';

class PaymentPage extends Component {
    render() {
        return (
            <Container id="content">
                <Row>
                    <Col className={styles.inner}>
                        <Row className={styles.pageHeader}><b>1. ĐỊA CHỈ GIAO HÀNG</b></Row>
                        <table className={styles.table}>
                            <tbody>
                                <tr>
                                    <td className={styles.labelCol}>Chọn địa chỉ:</td>
                                    <td>
                                        <ButtonGroup className={styles.statusBtnGroup}>
                                            <Input type="select" name="address" id="address" className={styles.statusSelect}>
                                                <option>Địa chỉ: Khu phố bình đức 1, Lái Thiêu, Thuận An, Bình Dương </option>
                                                <option>Địa chỉ 2: abcedf</option>
                                            </Input>
                                            <Button color="primary">Tạo địa chỉ</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr>
                                <tr>
                                    <td className={styles.labelCol}>Người nhận:</td>
                                    <td><Input type="text" id="fullName" value="Vương Thịnh Đạt" readOnly="true"></Input></td>
                                </tr>
                                <tr>
                                    <td className={styles.labelCol}>Điện thoại:</td>
                                    <td><Input type="text" id="telephone" value="0782369351" readOnly="true"></Input></td>
                                </tr>
                                <tr>
                                    <td className={styles.labelCol}>Tỉnh/ Thành phố:</td>
                                    <td><Input type="text" id="city" value="Bình Dương" readOnly="true"></Input></td>
                                </tr>
                                <tr>
                                    <td className={styles.labelCol}>Quận huyện:</td>
                                    <td><Input type="text" id="district" value="Thuận An" readOnly="true"></Input></td>
                                </tr>
                                <tr>
                                    <td className={styles.labelCol}>Phường xã:</td>
                                    <td><Input type="text" id="ward" value="Lái Thiêu" readOnly="true"></Input></td>
                                </tr>
                                <tr>
                                    <td className={styles.labelCol}>Địa chỉ:</td>
                                    <td><Input type="textarea" rows="3" id="street" value="C352 Khu phố Bình Đức 1" readOnly="true"></Input></td>
                                </tr>
                                <tr>
                                    <td className={styles.labelCol}>Thời gian giao:</td>
                                    <td><Input type="date" id="timeDeliver" value="2020-05-25" readOnly="true"></Input></td>
                                </tr>
                            </tbody>
                        </table>

                        <Row className={styles.pageHeader}><b>2. DANH SÁCH SẢN PHẨM</b></Row>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5112843 - Laptop Dell Vostro 5490 V4I5106W</td>
                                    <td>16.900.000đ</td>
                                    <td>1</td>
                                    <td>16.900.000đ</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Row className={styles.pageHeader}><b>3. DANH SÁCH KHUYẾN MÃI</b></Row>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>Khuyến mãi</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng</th>
                                    <th>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>5112843 - Balo Laptop Acer</td>
                                    <td>250.000đ</td>
                                    <td>1</td>
                                    <td>250.000đ</td>
                                </tr>
                                <tr>
                                    <td>3112841 - Chuột máy tính</td>
                                    <td>180.000đ</td>
                                    <td>1</td>
                                    <td>180.000đ</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Row className={styles.summarySection}>
                            <Col className={styles.orderButton}>
                                <Button color="success" className={styles.Button}><FaShoppingCart /> ĐẶT MUA</Button>
                            </Col>
                            <Col className={styles.summary} sm={{ size: 'auto', offset: '6' }}>
                                <Label><b>Tạm tính:</b> </Label>
                                <Label><b>Phí vận chuyển:</b></Label>
                                <Label><b>Tổng cộng:</b></Label>
                            </Col>
                            <Col className={styles.summary}>
                                <Label>16.900.000đ</Label>
                                <Label>18.000đ</Label>
                                <Label>16.918.000đ</Label>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default PaymentPage;