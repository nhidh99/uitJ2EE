import React, { Component } from "react";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import ProductsBlock from "./components/ProductsBlock";
import PromotionsBlock from "./components/PromotionsBlock";
import SummaryBlock from "./components/SummaryBlock";
import { Button } from "reactstrap";

class PaymentPage extends Component {
    render() {
        return (
            <div className={styles.container}>
                <div className={styles.address}>
                    <header className={styles.header}>1. ĐỊA CHỈ GIAO HÀNG</header>
                    <Button color="primary">Tạo địa chỉ mới</Button>
                </div>
                <AddressBlock />

                <header className={styles.header}>2. DANH SÁCH SẢN PHẨM</header>
                <ProductsBlock />

                <header className={styles.header}>3. DANH SÁCH KHUYẾN MÃI</header>
                <PromotionsBlock />

                <SummaryBlock />
            </div>
        );
    }
}

export default PaymentPage;
