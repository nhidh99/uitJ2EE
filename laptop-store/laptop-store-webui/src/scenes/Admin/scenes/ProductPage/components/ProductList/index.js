import React, { Component } from "react";
import { Table, ButtonGroup } from "reactstrap";
import styles from "./styles.module.scss";
import ProductDelete from "../ProductDelete";
import ProductUpdate from "../ProductUpdate";

class ProductList extends Component {
    state = {
        loading: true,
        laptops: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const response = await fetch("/api/laptops", {
            method: "GET",
        });
        if (response.ok) {
            const laptops = await response.json();
            this.setState({
                loading: false,
                laptops: laptops,
            });
        }
    };

    render() {
        const { loading, laptops } = this.state;
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
                    {laptops.map((laptop) => (
                        <tr>
                            <td>{laptop["id"]}</td>
                            <td className={styles.nameCol}>{laptop["name"]}</td>
                            <td>
                                {(laptop["unit_price"] - laptop["discount_price"]).toLocaleString()}
                                đ
                            </td>
                            <td>{laptop["quantity"]}</td>
                            <td>
                                <ButtonGroup>
                                    <ButtonGroup>
                                        <ProductDelete
                                            productId={laptop["id"]}
                                            productName={laptop["name"]}
                                        />
                                        <ProductUpdate productId={laptop["id"]} />
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
