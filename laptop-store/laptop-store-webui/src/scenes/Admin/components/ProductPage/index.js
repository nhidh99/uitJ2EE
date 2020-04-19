import React, { Component, Fragment } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductList from "./components/ProductList";

class ProductPage extends Component {
    render() {
        return (
            <Fragment>
                <ProductFilter />
                <ProductList />
            </Fragment>
        );
    }
}

export default ProductPage;