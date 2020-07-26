/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { Table } from "reactstrap";
import { convertCPUType, convertResolutionType } from "../../../../services/helper/converter";
import styles from "./styles.module.scss";
import { FaStar } from "react-icons/fa";
import ReactPlaceholder from "react-placeholder/lib";
import laptopApi from "../../../../services/api/laptopApi";

const ComparePage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id1, id2 } = useParams();

    useEffect(() => {
        window.scroll(0, 0);
        loadData();
    }, []);

    const loadData = async () => {
        const [product1, product2] = await Promise.all([fetchProduct(id1), fetchProduct(id2)]);
        setProducts([product1, product2]);
        setLoading(false);
    };

    const fetchProduct = async (productId) => {
        try {
            const response = await laptopApi.getById(productId);
            return response.data;
        } catch (err) {
            console.log("fail");
            return null;
        }
    };

    return loading ? (
        <Fragment>
            <ReactPlaceholder type="textRow" className={styles.holderRow} />
            <ReactPlaceholder type="rect" className={styles.holderRect} />
        </Fragment>
    ) : (
        <Fragment>
            <header className={styles.header}>
                So sánh laptop <b>{products[0]["name"]}</b> và laptop <b>{products[1]["name"]}</b>
            </header>

            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th />
                        {products.map((product) => (
                            <td>
                                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                                    <img
                                        src={`/api/images/600/laptops/${product["id"]}/${product["alt"]}.jpg`}
                                        alt={product["name"]}
                                        width={200}
                                        height={200}
                                    />
                                    <label className={styles.productName}>{product["name"]}</label>
                                    <br />

                                    <label className={styles.price}>
                                        {product["unit_price"].toLocaleString()}
                                        <sup>đ</sup>
                                    </label>
                                    <label className={styles.rating}>
                                        {" "}
                                        - {product["avg_rating"].toFixed(1)}{" "}
                                        <FaStar className={styles.icon} color="darkorange" />
                                    </label>
                                </Link>
                            </td>
                        ))}
                    </tr>

                    <tr>
                        <th colSpan={3} className={styles.topic}>
                            BỘ XỬ LÝ
                        </th>
                    </tr>

                    <tr>
                        <th>Công nghệ CPU</th>
                        {products.map((product) => (
                            <td>
                                {convertCPUType(product["cpu"]["type"])} {product["cpu"]["detail"]}
                            </td>
                        ))}
                    </tr>

                    <tr>
                        <th>Tốc độ CPU</th>
                        {products.map((product) => (
                            <td>{product["cpu"]["speed"].toFixed(1)} GHz</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Tốc độ tối đa</th>
                        {products.map((product) => (
                            <td>{product["cpu"]["max_speed"].toFixed(1)} GHz</td>
                        ))}
                    </tr>

                    <tr>
                        <th colSpan={3} className={styles.topic}>
                            RAM - Ổ CỨNG
                        </th>
                    </tr>

                    <tr>
                        <th>RAM</th>
                        {products.map((product) => (
                            <td>{product["ram"]["size"]} GB</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Loại RAM</th>
                        {products.map((product) => (
                            <td>
                                {product["ram"]["type"]}{" "}
                                {product["ram"]["extra_slot"] === 1 ? " (+1 khe RAM)" : ""}
                            </td>
                        ))}
                    </tr>

                    <tr>
                        <th>Tốc độ Bus RAM</th>
                        {products.map((product) => (
                            <td>{product["ram"]["bus"]} MHz</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Ổ cứng</th>
                        {products.map((product) => (
                            <td>{`${product["hard_drive"]["type"]} 
                            ${
                                product["hard_drive"]["size"] === 1024
                                    ? "1 TB"
                                    : `${product["hard_drive"]["size"]} GB`
                            } 
                            ${product["hard_drive"]["detail"]}`}</td>
                        ))}
                    </tr>

                    <tr>
                        <th colSpan={3} className={styles.topic}>
                            MÀN HÌNH
                        </th>
                    </tr>

                    <tr>
                        <th>Kích thước màn hình</th>
                        {products.map((product) => (
                            <td>{product["monitor"]["size"]} inch</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Độ phân giải</th>
                        {products.map((product) => (
                            <td>
                                {convertResolutionType(product["monitor"]["resolution_type"])} (
                                {product["monitor"]["resolution_width"]} x{" "}
                                {product["monitor"]["resolution_height"]})
                            </td>
                        ))}
                    </tr>

                    <tr>
                        <th>Card màn hình</th>
                        {products.map((product) => (
                            <td>{product["graphics_card"]}</td>
                        ))}
                    </tr>

                    <tr>
                        <th colSpan={3} className={styles.topic}>
                            THÔNG SỐ KHÁC
                        </th>
                    </tr>

                    <tr>
                        <th>Cổng kết nối</th>
                        {products.map((product) => (
                            <td>{product["ports"]}</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Khối lượng</th>
                        {products.map((product) => (
                            <td>{product["weight"]} kg</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Độ dày</th>
                        {products.map((product) => (
                            <td>{product["thickness"]} mm</td>
                        ))}
                    </tr>

                    <tr>
                        <th>Thiết kế</th>
                        {products.map((product) => (
                            <td>{product["design"]}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    );
};

export default ComparePage;
