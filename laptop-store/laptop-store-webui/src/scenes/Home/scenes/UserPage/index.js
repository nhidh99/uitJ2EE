import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import InfoPage from "./scenes/InfoPage";
import AddressPage from "./scenes/AddressPage";
import EditAddressPage from "./scenes/EditAddressPage";
import PasswordPage from "./scenes/PasswordPage";
import OrderPage from "./scenes/OrderPage";
import PaymentPage from "./scenes/PaymentPage";
import SideBar from "./components/SideBar";
import styles from "./styles.module.scss";
import { Col, Row } from "reactstrap";
import OrderDetail from "./scenes/OrderDetail";
import CartPage from "../CartPage";

class UserPage extends Component {
    render() {
        return (
            <Row>
                <Col sm="3" className={styles.sideBar}>
                    <SideBar />
                </Col>

                <Col sm="9" className={styles.userPage}>
                    <Switch>
                        <Route exact component={InfoPage} path="/user/info" />
                        <Route exact component={AddressPage} path="/user/address" />
                        <Route
                            exact
                            component={EditAddressPage}
                            path="/user/address/(edit|create)"
                        />
                        <Route exact component={PasswordPage} path="/user/password" />
                        <Route exact component={OrderPage} path="/user/order" />
                        <Route exact component={OrderDetail} path="/user/order/:orderId" />
                        <Route exact component={CartPage} path="/user/cart" />
                        <Route exact component={PaymentPage} path="/user/payment" />
                    </Switch>
                </Col>
            </Row>
        );
    }
}
export default UserPage;
