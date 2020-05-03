import React, { Component } from 'react';
import {Col, ListGroup, ListGroupItem} from 'reactstrap';
import {FaBook, FaWrench, FaMapMarkerAlt, FaBell, FaUser, FaBoxes, FaRegEye, FaShoppingCart} from 'react-icons/fa';
import styles from './styles.module.scss';
class SideBar extends Component {
    render() {
        return (
            
            <Col md="3" className={styles.sideBar}>
                <ListGroup>
                    <ListGroupItem color="success"><FaUser />  Tài khoản</ListGroupItem>
                    <ListGroupItem tag="a" href="/user/info"><FaBook />  Thông tin tài khoản</ListGroupItem>
                    <ListGroupItem tag="a" href="/user/notifications"><FaBell />  Thông báo của tôi</ListGroupItem>
                    <ListGroupItem tag="a" href="/user/address"><FaMapMarkerAlt />  Sổ địa chỉ</ListGroupItem>
                    <ListGroupItem tag="a" href="/user/password"><FaWrench />  Cài đặt tài khoản</ListGroupItem>
                </ListGroup>
                <br/>
                <ListGroup>
                    <ListGroupItem color="success"><FaShoppingCart />  Hàng hóa</ListGroupItem>
                    <ListGroupItem tag="a" href="/user/order"><FaBoxes/>  Đơn hàng</ListGroupItem>
                    <ListGroupItem tag="a" href="/user/save-for-later"><FaRegEye />  Xem sau</ListGroupItem>
                </ListGroup>
            </Col>
        )
    }

}
export default SideBar;