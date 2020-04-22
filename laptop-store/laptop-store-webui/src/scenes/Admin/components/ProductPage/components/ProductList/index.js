import React, { Component } from "react";
import { Table, ButtonGroup } from "reactstrap";
import styles from "./styles.module.scss";
import ProductDelete from "../ProductDelete";
import ProductUpdate from "../ProductUpdate";

class ProductList extends Component {
    render() {
        return (
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã sản phẩm</th>
                        <th className={styles.nameCol}>Tên sản phẩm</th>
                        <th className={styles.priceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112843</td>
                        <td className={styles.nameCol}>
                            Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                            DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)
                        </td>
                        <td className={styles.priceCol}>16,900,000đ</td>
                        <td className={styles.quantityCol}>20</td>
                        <td>
                            <ButtonGroup>
                                <ButtonGroup>
                                    <ProductDelete
                                        productId={5112843}
                                        productName="Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                                        DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)"
                                    />
                                    <ProductUpdate productId={5112843} />
                                </ButtonGroup>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112845</td>
                        <td className={styles.nameCol}>
                            Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                            DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)
                        </td>
                        <td className={styles.priceCol}>14,900,000đ</td>
                        <td className={styles.quantityCol}>12</td>
                        <td>
                            <ButtonGroup>
                                <ProductDelete
                                    productId={5112845}
                                    productName="Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB
                                        DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10)"
                                />
                                <ProductUpdate productId={5112845} />
                            </ButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default ProductList;
