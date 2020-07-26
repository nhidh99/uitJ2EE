/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import ProductsBlock from "./components/ProductsBlock";
import PromotionsBlock from "./components/PromotionsBlock";
import SummaryBlock from "./components/SummaryBlock";
import { Button, Spinner } from "reactstrap";
import { removeFromCart } from "../../../../services/helper/cart";
import { FaBoxOpen } from "react-icons/fa";
import Loader from "react-loader-advanced";
import { withRouter } from "react-router-dom";
import userApi from "../../../../services/api/userApi";
import laptopApi from "../../../../services/api/laptopApi";
import EmptyBlock from "../../../../components/EmptyBlock";
import { MAXIMUM_QUANTITY_IN_CART } from "../../../../constants";

const PaymentPage = (props) => {
    const [addresses, setAddresses] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [promotionQties, setPromotionQties] = useState(0);
    const [cart, setCart] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!cart) return;
        loadDetail();
    }, [cart]);

    useEffect(() => {
        const productPrice = products
            .map((p) => cart[p["id"]] * (p["unit_price"] - p["discount_price"]))
            .reduce((a, b) => a + b, 0);
        setProductPrice(productPrice);
    }, [products]);

    const loadData = async () => {
        try {
            const response = await userApi.getCurrentUser();
            const user = response.data;
            setCart(JSON.parse(user["cart"]));
        } catch (err) {
            console.log("err");
        }
    };

    const loadDetail = async () => {
        await Promise.all([loadProducts(), loadAddresses(), loadPromotions()]);
        setLoading(false);
    };

    const loadProducts = async () => {
        const ids = Object.keys(cart);
        if (ids.length === 0) {
            setProducts([]);
            return;
        }

        try {
            const response = await laptopApi.getByIds(ids);
            const products = response.data;
            const productIds = products.map((product) => product["id"].toString());
            ids.filter((id) => !productIds.includes(id)).forEach((id) => removeFromCart(id));
            setProducts(products);
        } catch (err) {
            console.log("fail");
        }
    };

    const loadAddresses = async () => {
        try {
            const response = await userApi.getCurrentUserAddresses();
            setAddresses(response.data);
        } catch (err) {
            console.log("fail");
        }
    };

    const loadPromotions = async () => {
        const quantities = {};
        const promotions = [];
        const length = Object.keys(cart).length;
        let count = 0;

        Object.keys(cart).map(async (id) => {
            try {
                const response = await laptopApi.getLaptopPromotions(id);
                response.data.forEach((promotion) => {
                    const key = promotion["id"];
                    if (key in quantities) {
                        quantities[key] = cart[id] + quantities[key];
                    } else {
                        quantities[key] = cart[id];
                        promotions.push(promotion);
                    }
                });
            } catch (err) {
                console.log("fail");
            }

            if (++count === length) {
                setPromotionQties(quantities);
                setPromotions(promotions);
            }
        });
    };

    const toggleSubmit = () => {
        setIsSubmitted(!isSubmitted);
    };

    const redirectToCreateAddress = () => {
        props.history.push("/user/address/create");
    };

    const PaymentDetail = () => {
        const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
        return totalQty <= MAXIMUM_QUANTITY_IN_CART ? (
            <div className={styles.container}>
                <div className={styles.address}>
                    <header className={styles.header}>A. ĐỊA CHỈ GIAO HÀNG</header>
                    <Button onClick={redirectToCreateAddress} color="primary">
                        Tạo địa chỉ mới
                    </Button>
                </div>
                <AddressBlock addresses={addresses} />

                <header className={styles.header}>B. DANH SÁCH SẢN PHẨM</header>
                <ProductsBlock products={products} cart={cart} />

                <header className={styles.header}>C. DANH SÁCH KHUYẾN MÃI</header>
                <PromotionsBlock promotions={promotions} quantities={promotionQties} />

                <SummaryBlock
                    productsPrice={productPrice}
                    toggleSubmit={toggleSubmit}
                    cart={cart}
                />
            </div>
        ) : (
            <EmptyBlock
                loading={false}
                icon={<FaBoxOpen />}
                backToHome={true}
                emptyText={`Tối đa ${MAXIMUM_QUANTITY_IN_CART} sản phẩm trong giỏ hàng`}
                borderless
            />
        );
    };

    return (
        <Loader show={isSubmitted} message={<Spinner />} className={styles.loader}>
            {products.length === 0 ? (
                <EmptyBlock
                    loading={loading}
                    backToHome={!loading}
                    icon={<FaBoxOpen />}
                    loadingText="Đang tải giỏ hàng..."
                    emptyText="Giỏ hàng trống"
                    borderless
                />
            ) : (
                <PaymentDetail />
            )}
        </Loader>
    );
};

export default withRouter(PaymentPage);
