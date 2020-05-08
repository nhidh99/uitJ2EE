import React, { Fragment } from "react";
import ProductFilter from "./components/ProductFilter";
import ProductList from "./components/ProductList";

const ProductPage = () => (
    <Fragment>
        <ProductFilter />
        <ProductList />
    </Fragment>
);

export default ProductPage;
