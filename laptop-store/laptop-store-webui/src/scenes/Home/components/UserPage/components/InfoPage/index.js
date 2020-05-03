import React, {Component} from 'react';
import {Container, Row, Col, Form, FormGroup, Label, Input, CustomInput} from 'reactstrap';
import {FaUser} from 'react-icons/fa';
import SideBar from '../SideBar';
import styles from './styles.module.scss';

class InfoPage extends Component {
    render() {
        return(
            <Container id="content">
                <Row>
                    <SideBar/>
                    <Col md="9" className={styles.inner}>
                        <Row className={styles.pageHeader}>
                            <h3><FaUser />  Thông tin tài khoản</h3>
                        </Row>
                        <Form className={styles.form}>
                            <FormGroup row>
                                <Label for="fullName" sm="2">Họ và tên:</Label>
                                <Input type="text" name="fullName" id="fullName" placeholder="Nhập họ và tên" className="col-sm-8"/>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="telephone" sm="2">Điện thoại:</Label>
                                <Input type="text" name="telephone" id="telephone" placeholder="Nhập số điện thoại" className="col-sm-8" />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="email" sm="2">Email:</Label>
                                <Input type="email" name="email" id="email" placeholder="Nhập email" className="col-sm-8" />
                            </FormGroup>
                            <FormGroup row>
                                <Label sm="2">Giới tính:</Label>
                                <CustomInput type="radio" name="gender" id="gender-male" value="male" className={styles.inputRadio} label="Nam" />
                                <CustomInput type="radio" name="gender" id="gender-female" value="female" className={styles.inputRadio} label="Nữ" />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="birthday" sm="2">Ngày sinh:</Label>
                                <Input type="date" name="birthday" id="birthday" placeholder="Nhập ngày sinh" className="col-sm-8"/>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm="2"></Label>
                                <Input type="submit" value="Lưu" className="col-sm-2"/>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default InfoPage;