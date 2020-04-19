import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import styles from './styles.module.scss';
import { FaKey } from 'react-icons/fa';
import SideBar from '../SideBar';
class PasswordPage extends Component {
    render() {
        return (
            <Container id="content">
                <Row>
                    <SideBar />
                    <Col md="9" className={styles.inner}>
                        <Row className={styles.pageHeader}>
                            <h3><FaKey />  Đổi mật khẩu</h3>
                        </Row>
                        <Form className={styles.form}>
                            <FormGroup row>
                                <Label for="old-password" sm="3">Mật khẩu cũ:</Label>
                                <Input type="text" name="old-password" id="old-password" placeholder="Nhập mật khẩu cũ" className="col-sm-8" />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="new-password" sm="3">Mật khẩu mới:</Label>
                                <Input type="text" name="new-password" id="new-password" placeholder="Nhập mật khẩu mới" className="col-sm-8" />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="confirm-password" sm="3">Xác nhận:</Label>
                                <Input type="text" name="confirm-password" id="confirm-password" placeholder="Nhập lại mật khẩu mới" className="col-sm-8" />
                            </FormGroup>
                            <FormGroup row>
                                <Label sm="9"></Label>
                                <Input type="submit" value="Lưu" className="col-sm-2" />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default PasswordPage;