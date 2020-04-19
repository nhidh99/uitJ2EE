import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class Banner extends Component {
    render() {
        return (
            <Fragment>
                <h1>Banner</h1>            
                <Link to="/">Home Page|</Link>
                <Link to="/result">Result Page|</Link>
                <Link to="/detail">Detail Page|</Link>
                <Link to="/user/info">User Page|</Link>
                <Link to="/auth/login">Login Page</Link>
            </Fragment>
        )
    }
}

export default Banner;