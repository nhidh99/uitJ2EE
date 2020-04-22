import React, { Component, Fragment } from "react";
import { Route, Switch, Link } from "react-router-dom";
import InfoPage from './components/InfoPage';
import AddressPage from './components/AddressPage';
import EditAddressPage from './components/EditAddressPage';
import PasswordPage from './components/PasswordPage';
import LaterPage from './components/LaterPage';
import OrderPage from './components/OrderPage';
import OrderDetailPage from './components/OrderDetailPage';
import CartPage from "./components/CartPage";
import PaymentPage from "./components/PaymentPage";
class UserPage extends Component {
    render() {
        return (
            <Fragment>
                <Link to="/">Back to Home|</Link>
                <Switch>
                    <Route exact component={InfoPage} path="/user/info"/>     
                    <Route exact component={AddressPage} path="/user/address"/>
                    <Route exact component={EditAddressPage} path="/user/address/create"/>
                    <Route exact component={PasswordPage} path="/user/password"/>
                    <Route exact component={OrderPage} path="/user/order"/>
                    <Route exact component={OrderDetailPage} path="/user/order/:orderId"/>
                    <Route exact component={LaterPage} path="/user/save-for-later"/>
                    <Route exact component={CartPage} path="/user/cart"/>
                    <Route exact component={PaymentPage} path="/user/payment"/>
                </Switch>
            </Fragment>
        )
    }
}
export default UserPage;