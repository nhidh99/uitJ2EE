import React, { Component } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import { FaBook } from "react-icons/fa";
import SideBar from "../../components/SideBar";
import styles from "./styles.module.scss";

class EditAddressPage extends Component {
    render() {
        return (
            <Container id="content">
                <Row>
                    <SideBar />
                    <Col md="9" className={styles.inner}>
                        <Row className={styles.pageHeader}>
                            <h3>
                                <FaBook /> Tạo sổ địa chỉ
                            </h3>
                        </Row>
                        <Form className={styles.form}>
                            <FormGroup row>
                                <Label for="fullName" sm="3">
                                    Họ và tên:
                                </Label>
                                <Input
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Nhập họ và tên"
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="telephone" sm="3">
                                    Điện thoại:
                                </Label>
                                <Input
                                    type="text"
                                    name="telephone"
                                    id="telephone"
                                    placeholder="Nhập số điện thoại"
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="city" sm="3">
                                    Tỉnh/ Thành phố:
                                </Label>
                                <Input
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Nhập tỉnh/ thành phố"
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="district" sm="3">
                                    Quận huyện:
                                </Label>
                                <Input
                                    type="text"
                                    name="district"
                                    id="district"
                                    placeholder="Nhập quận huyện"
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="ward" sm="3">
                                    Phường xã:
                                </Label>
                                <Input
                                    type="text"
                                    name="ward"
                                    id="ward"
                                    placeholder="Nhập phường xã"
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row className={styles.textArea}>
                                <Label for="street" sm="3">
                                    Địa chỉ:
                                </Label>
                                <Input
                                    type="textarea"
                                    name="street"
                                    id="street"
                                    rows="3"
                                    placeholder="Nhập địa chỉ (tên đường, số nhà)"
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label sm="3"></Label>
                                <CustomInput
                                    type="checkbox"
                                    name="default-address"
                                    id="default-address"
                                    className={styles.inputCheckBox}
                                    label="Đặt làm địa chỉ mặc định"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label sm="3"></Label>
                                <Input type="submit" value="Lưu" className="col-sm-2" />
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default EditAddressPage;
