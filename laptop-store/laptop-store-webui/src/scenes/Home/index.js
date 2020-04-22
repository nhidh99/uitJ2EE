import React, { Component, Fragment } from "react";
import Banner from "../../components/Banner";
import { Route, Switch } from "react-router-dom";
import UserPage from "./components/UserPage";
import ResultPage from "./components/ResultPage";
import HomePage from "./components/HomePage";
import DetailPage from "./components/DetailPage";
import styles from "./styles.module.scss";
class Home extends Component {
    render() {
        return (
            <Fragment>
                <Banner />
                <div className={styles.container}>
                    <Switch>
                        <Route exact component={DetailPage} path="/detail" />
                        <Route exact component={HomePage} path="/" />
                        <Route exact component={ResultPage} path="/result" />
                        <Route exact component={UserPage} path="/user/(info|password|address|order|save-for-later|cart|payment)" />
                        <Route exact component={UserPage} path="/user/address/(|create)" />
                        <Route exact component={UserPage} path="/user/order/:orderId" />
                    </Switch>
                </div>
            </Fragment>
        );
    }
}

export default Home;

// localhost:3000/