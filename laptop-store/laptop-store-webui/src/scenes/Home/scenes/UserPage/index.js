import React from "react";
import { Route, Switch } from "react-router-dom";
import InfoPage from "./scenes/InfoPage";
import AddressPage from "./scenes/AddressPage";
import EditAddressPage from "./scenes/EditAddressPage";
import PasswordPage from "./scenes/PasswordPage";
import OrderPage from "./scenes/OrderPage";
import SideBar from "./components/SideBar";
import styles from "./styles.module.scss";
import { Col, Row } from "reactstrap";
import OrderDetail from "./scenes/OrderDetail";

const UserPage = () => (
    <Row>
        <Col sm="3" className={styles.sideBar}>
            <SideBar />
        </Col>

        <Col sm="9" className={styles.userPage}>
            <Switch>
                <Route exact component={InfoPage} path="/user/info" />

                <Route exact component={AddressPage} path="/user/address" />

                <Route exact component={EditAddressPage} path="/user/address/:id" />

                <Route exact component={PasswordPage} path="/user/password" />

                <Route exact component={OrderPage} path="/user/order" />

                <Route exact component={OrderDetail} path="/user/order/:orderId" />
            </Switch>
        </Col>
    </Row>
);

export default UserPage;
