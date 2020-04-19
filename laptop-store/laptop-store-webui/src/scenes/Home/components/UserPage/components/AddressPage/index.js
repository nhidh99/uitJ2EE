import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import { FaBook, FaPlus } from 'react-icons/fa';
import SideBar from '../SideBar';
import styles from './styles.module.scss';

class AddressPage extends Component {
    render() {
        return (
            <Container id="content">
                <Row>
                    <SideBar />
                    <Col md="9" className={styles.inner}>
                        <Row className={styles.pageHeader}>
                            <h3><FaBook />  Sổ địa chỉ</h3>
                        </Row>

                        <Row className={styles.add}>
                            <Link to="/user/address/create"><FaPlus /><span>Thêm địa chỉ</span></Link>
                        </Row>
                    </Col>
                </Row>
            </Container>
            
        )
    }
}
export default AddressPage;