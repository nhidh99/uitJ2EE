import React, { Component, Fragment } from "react";
import { Table, ButtonGroup, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import ProductDelete from "../ProductDelete";
import ProductEdit from "../ProductEdit";
import Pagination from "react-js-pagination";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";

class ProductList extends Component {
    state = {
        loading: true,
        activePage: 1,
        productCount: 1,
        products: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const response = await fetch(`/api/laptops?page=${this.state.activePage}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") },
        });

        if (response.ok) {
            const products = await response.json();
            const productCount = parseInt(response.headers.get("X-Total-Count"));
            this.setState({
                loading: false,
                products: products,
                productCount: productCount,
            });
        }
    };

    pageChange = (pageNumber) => {
        if (pageNumber === this.state.activePage) return;
        this.setState({ loading: true, activePage: pageNumber }, () => this.loadData());
    };

    render() {
        const { loading, products, activePage, productCount } = this.state;
        return (
            <Fragment>
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
                            {products.map((product) => (
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
                                        {(
                                            product["unit_price"] - product["discount_price"]
                                        ).toLocaleString()}
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
                            ))}
                        </tbody>
                    </Table>
                </Loader>

                <div className={styles.pagination}>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                        totalItemsCount={productCount}
                        pageRangeDisplayed={5}
                        onChange={this.pageChange}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
            </Fragment>
        );
    }
}

export default ProductList;
