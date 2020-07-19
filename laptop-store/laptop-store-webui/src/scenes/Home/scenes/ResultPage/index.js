/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { FaStar, FaSearch } from "react-icons/fa";
import { withRouter, Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import "react-placeholder/lib/reactPlaceholder.css";
import EmptyBlock from "../../../../components/EmptyBlock";
import queryString from "query-string";
import laptopApi from "../../../../services/api/laptopApi";

const ResultPage = (props) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setFilterBar();
        setProducts([]);
        setLoading(true);
        loadData();
    }, [props.location.search]);

    const setFilterBar = () => {
        const filter = queryString.parse(props.location.search);
        if ("name" in filter) {
            const searchInput = document.getElementById("btn-search");
            searchInput.value = filter["name"];
        }
    };

    const loadData = async () => {
        try {
            const filter = queryString.parse(props.location.search);
            const response = await laptopApi.getByFilter(filter);
            setProducts(response.data);
            setLoading(false);
        } catch (err) {
            console.log("fail");
        }
    };

    const Item = ({ product }) => {
        return (
            <Link to={`/product/${product["alt"]}/${product["id"]}`} className={styles.itemBlock}>
                <LazyLoad height={200} offset={400} once>
                    <img
                        width={200}
                        height={200}
                        className={styles.itemImg}
                        src={`/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                        alt="Laptop"
                    />
                </LazyLoad>

                <label className={styles.itemInfo}>
                    <label className={styles.itemRating}>
                        {product["avg_rating"].toFixed(1)}{" "}
                        <FaStar className={styles.icon} size={10} />
                    </label>{" "}
                    - RAM {product["ram"]["size"]}GB - {product["hard_drive"]["type"]}{" "}
                    {product["hard_drive"]["size"] === 1024
                        ? "1TB"
                        : `${product["hard_drive"]["size"]}GB`}
                </label>
                <br />

                <label className={styles.itemName}>{product["name"]}</label>
                <br />

                <label className={styles.itemUnitPrice}>
                    {product["unit_price"].toLocaleString()}
                    <sup>đ</sup>
                </label>

                <label className={styles.itemOriginPrice}>
                    {(product["unit_price"] + product["discount_price"]).toLocaleString()}
                    <sup>đ</sup>
                </label>
                <br />
            </Link>
        );
    };

    return (
        <div className={styles.category}>
            <header className={styles.categoryHeader}>Kết quả tìm kiếm</header>
            <div className={styles.itemList}>
                {products.length === 0 ? (
                    <EmptyBlock
                        loading={loading}
                        icon={<FaSearch />}
                        loadingText="Đang tìm kiếm laptop"
                        emptyText="Không tìm thấy sản phẩm phù hợp"
                        borderless
                    />
                ) : (
                    products.map((product) => <Item product={product} />)
                )}
            </div>
        </div>
    );
};

export default withRouter(ResultPage);
