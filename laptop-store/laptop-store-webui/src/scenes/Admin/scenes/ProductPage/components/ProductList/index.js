import React, { Component } from "react";
import { Table, ButtonGroup } from "reactstrap";
import styles from "./styles.module.scss";
import ProductDelete from "../ProductDelete";
import ProductEdit from "../ProductEdit";

class ProductList extends Component {
    state = {
        loading: true,
        products: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const response = await fetch("/api/laptops", {
            method: "GET",
        });
        if (response.ok) {
            const products = await response.json();
            this.setState({
                loading: false,
                products: products,
            });
        }
    };

    render() {
        const { loading, products } = this.state;
        return loading ? null : (
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã sản phẩm</th>
                        <th className={styles.nameCol}>Tên sản phẩm</th>
                        <th className={styles.priceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    {products.map((product) => (
                        <tr>
                            <td>{product["id"]}</td>
                            <td className={styles.nameCol}>{product["name"]}</td>
                            <td>
                                {(product["unit_price"] - product["discount_price"]).toLocaleString()}
                                đ
                            </td>
                            <td>{product["quantity"]}</td>
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
        );
    }
}

export default ProductList;
