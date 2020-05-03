import React, {Component} from 'react';
import {Container, Row, Col, ListGroup} from 'reactstrap';
import {FaShoppingCart} from 'react-icons/fa';
import SideBar from '../SideBar';
import styles from './styles.module.scss';
import LaterBlock from './components/LaterBlock';
class LaterPage extends Component {
    render() {
        return(
            <Container id="content">
                <Row>
                    <SideBar/>
                    <Col md="9" className={styles.inner}>
                        <Row className={styles.pageHeader}>
                            <h3><FaShoppingCart />  Sản phẩm xem sau </h3>
                        </Row>
                        <ListGroup>
                            <LaterBlock/>
                            <LaterBlock/>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default LaterPage;