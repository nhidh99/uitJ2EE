/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Table, ButtonGroup, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import ProductDelete from "../ProductDelete";
import ProductEdit from "../ProductEdit";
import Pagination from "react-js-pagination";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import { withRouter } from "react-router-dom";

const ProductList = (props) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [count, setCount] = useState(1);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const page = parseInt(params.get("page"));
        setPage(page ? page : 1);
    }, []);

    useEffect(() => {
        setLoading(true);
        loadData();
    }, [page]);

    // search = async (filter) => {
    //     const response = await fetch(`/api/laptops/${filter}&page=${this.state.activePage}`, {
    //         method: "GET",
    //         headers: { Authorization: "Bearer " + getCookie("access_token") }
    //     });
    //     if (response.ok) {
    //         const products = await response.json();
    //         const productCount = parseInt(response.headers.get("X-Total-Count"));
    //         this.setState({
    //             loading: false,
    //             products: products,
    //             productCount: productCount,
    //         });
    //     }
    // }

    const loadData = async () => {
        const response = await fetch(`/api/laptops?page=${page}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") },
        });

        if (response.ok) {
            const products = await response.json();
            const count = parseInt(response.headers.get("X-Total-Count"));
            setProducts(products);
            setCount(count);
            setLoading(false);
        }
    };

    const pageChange = (pageNumber) => {
        if (pageNumber === page) return;
        props.history.push("/admin/products?page=" + pageNumber);
        setPage(pageNumber);
    };

    const buildRowFromProduct = (product) => (
        <tr>
            <td>{product["id"]}</td>
            <td className={styles.nameCol}>{product["name"]}</td>
            <td>
                <img
                    src={`/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                    alt={product["name"]}
                    title={product["name"]}
                    width={60}
                    height={60}
                    className={styles.img}
                />
            </td>
            <td>{product["quantity"]}</td>
            <td>
                {(product["unit_price"] - product["discount_price"]).toLocaleString()}
                <sup>đ</sup>
            </td>
            <td>
                <ButtonGroup>
                    <ButtonGroup>
                        <ProductDelete product={product} />
                        <ProductEdit product={product} />
                    </ButtonGroup>
                </ButtonGroup>
            </td>
        </tr>
    );

    const ProductTable = () => (
        <Loader show={loading} message={<Spinner />}>
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã sản phẩm</th>
                        <th className={styles.nameCol}>Sản phẩm</th>
                        <th className={styles.imgCol}>Hình ảnh</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.priceCol}>Đơn giá</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    {products.map((product) => buildRowFromProduct(product))}
                </tbody>
            </Table>
        </Loader>
    );

    const ProductPagination = () => (
        <div className={styles.pagination}>
            <Pagination
                activePage={page}
                itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                onChange={pageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );

    return (
        <Fragment>
            <ProductTable />
            <ProductPagination />
        </Fragment>
    );
};

export default withRouter(ProductList);
