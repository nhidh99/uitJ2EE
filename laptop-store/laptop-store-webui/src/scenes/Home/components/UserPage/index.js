import React, { Component, Fragment } from "react";
import { Route, Switch, Link } from "react-router-dom";
import InfoPage from './components/InfoPage';
import AddressPage from './components/AddressPage';
import EditAddressPage from './components/EditAddressPage';
import PasswordPage from './components/PasswordPage';
import LaterPage from './components/LaterPage';
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
                    <Route exact component={LaterPage} path="/user/save-for-later"/>
                </Switch>
            </Fragment>
        )
    }
}
//
export default UserPage;