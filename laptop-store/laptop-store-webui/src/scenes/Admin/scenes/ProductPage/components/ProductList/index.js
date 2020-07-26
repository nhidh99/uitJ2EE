/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Table, ButtonGroup, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import ProductDelete from "../ProductDelete";
import ProductEdit from "../ProductEdit";
import Pagination from "react-js-pagination";
import Loader from "react-loader-advanced";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import { withRouter } from "react-router-dom";
import laptopApi from "../../../../../../services/api/laptopApi";

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
        if (!page) return;
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
        if (query === null) {
            loadData();
        } else {
            search(query);
        }
    }, [page]);

    const search = async (query) => {
        try {
            const response = await laptopApi.getByQuery(query, page);
            const products = response.data;
            const count = parseInt(response.headers["x-total-count"]);
            setProducts(products);
            setCount(count);
            setLoading(false);
        } catch (err) {
            console.log("fail");
        }
    };

    const loadData = async () => {
        try {
            const response = await laptopApi.getByPage(page);
            const products = response.data;
            const count = parseInt(response.headers["x-total-count"]);
            setProducts(products);
            setCount(count);
            setLoading(false);
        } catch (err) {
            console.log("fail");
        }
    };

    const pageChange = (pageNumber) => {
        if (pageNumber === page) return;
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
        if (query === null) {
            props.history.push("/admin/products?page=" + pageNumber);
        } else {
            props.history.push("/admin/products/search?q=" + query + "&page=" + pageNumber);
        }
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
