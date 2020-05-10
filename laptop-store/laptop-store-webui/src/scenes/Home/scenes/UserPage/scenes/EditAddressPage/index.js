import React, { Component } from "react";
import { Container, Row, Col, Form, FormGroup, Label, Input, CustomInput, Button } from "reactstrap";
import { FaBook } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";

class EditAddressPage extends Component {

    buildAddressBody = () => {
        const receiverName = document.getElementById("receiverName").value;
        const phone = document.getElementById("phone").value;
        const city = document.getElementById("city").value;
        const district = document.getElementById("district").value;
        const ward = document.getElementById("ward").value;
        const street = document.getElementById("street").value;
        const addressNum = document.getElementById("addressNum").value;

        return ({
            receiverName: receiverName,
            phone: phone,
            city: city,
            district: district,
            ward: ward,
            street: street,
            addressNum: addressNum,
        })
    }

    createAddress = async () => {
        const url = "/api/addresses/" + (this.props.location.state.address != null ? ('edit/'+ this.props.location.state.address['id']) : 'create');
   
        const body = this.buildAddressBody();
        const response = await fetch(url, {
            method: this.props.location.state.address != null ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            },
            body: JSON.stringify(body)
        });
        if(response.ok) {
            alert('success');
            window.location.href='/user/address';
        }
        const status = parseInt(response.status);
        switch (status) {
            case 201:
                alert('insert thành công');
                window.location.href='/user/address';
                break;
            case 403:
                this.setState({
                    error: "Not permission",
                    loading: false
                });
                break;
            case 401:
                alert('You have to login to access this page.')
                window.location.href = "/auth/login";
                break;
            default:
                this.setState({
                    error: "Server error",
                    loading: false
                });
        }
    }

    render() {
        const address = this.props.location.state.address;
        return (
            <Container id="content">
                <Row>
                    <Col md="9" className={styles.inner}>
                        <Row className={styles.pageHeader}>
                            <h3>
                                <FaBook /> {address === null ? 'Tạo sổ địa chỉ' : 'Sửa địa chỉ'}
                            </h3>
                        </Row>
                        <Form className={styles.form}>
                            <FormGroup row>
                                <Label for="receiverName" sm="3">
                                    Họ và tên:
                                </Label>
                                <Input
                                    type="text"
                                    name="receiverName"
                                    id="receiverName"
                                    placeholder="Nhập họ và tên"
                                    defaultValue={address != null ? address['receiver_name'] : null}
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="phone" sm="3">
                                    Điện thoại:
                                </Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Nhập số điện thoại"
                                    defaultValue={address != null ? address['phone'] : null}
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
                                    defaultValue={address != null ? address['city'] : null}
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
                                    defaultValue={address != null ? address['district'] : null}
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
                                    defaultValue={address != null ? address['ward'] : null}
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row>
                                <Label for="street" sm="3">
                                    Đường:
                                </Label>
                                <Input
                                    type="text"
                                    name="street"
                                    id="street"
                                    placeholder="Nhập tên đường"
                                    defaultValue={address != null ? address['street'] : null}
                                    className="col-sm-8"
                                />
                            </FormGroup>
                            <FormGroup row className={styles.textArea}>
                                <Label for="addressNum" sm="3">
                                    Địa chỉ:
                                </Label>
                                <Input
                                    type="textarea"
                                    name="addressNum"
                                    id="addressNum"
                                    rows="3"
                                    placeholder="Nhập địa chỉ (hẻm, số nhà)"
                                    defaultValue={address != null ? address['address_num'] : null}
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
                                <Button color="success" className="col-sm-2" onClick={this.createAddress}>Lưu</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}
export default EditAddressPage;
