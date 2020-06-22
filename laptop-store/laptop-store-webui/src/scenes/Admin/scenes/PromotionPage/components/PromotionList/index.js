/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Table, ButtonGroup, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionDelete from "../PromotionDelete";
import PromotionEdit from "../PromotionEdit";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";
import Pagination from "react-js-pagination";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import { withRouter } from "react-router-dom";

const PromotionList = (props) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [count, setCount] = useState(1);
    const [promotions, setPromotions] = useState([]);

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
        const response = await fetch(`/api/promotions/search?q=${query}&page=${page}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") }
        });
        if (response.ok) {
            const promotions = await response.json();
            const count = parseInt(response.headers.get("X-Total-Count"));
            setPromotions(promotions);
            setCount(count);
            setLoading(false);
        }
    }

    const loadData = async () => {
        const response = await fetch(`/api/promotions?page=${page}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
        });

        if (response.ok) {
            const promotions = await response.json();
            const count = parseInt(response.headers.get("X-Total-Count"));
            setPromotions(promotions);
            setCount(count);
            setLoading(false);
        }
    };

    const pageChange = (pageNumber) => {
        if (pageNumber === page) return;
        const params = new URLSearchParams(window.location.search);
        const query = params.get("q");
        if (query === null) {
            props.history.push("/admin/promotions?page=" + pageNumber);
        } else {
            props.history.push("/admin/promotions/search?q=" + query + "&page=" + pageNumber);
        }
        setPage(pageNumber);
    };

    const buildRowFromPromotion = (promotion) => (
        <tr>
            <td className={styles.idCol}>{promotion["id"]}</td>
            <td className={styles.nameCol}>{promotion["name"]}</td>
            <td>
                <img
                    src={`/api/images/200/promotions/${promotion["id"]}/${promotion["alt"]}.jpg`}
                    alt={promotion["name"]}
                    title={promotion["name"]}
                    width={60}
                    height={60}
                    className={styles.img}
                />
            </td>
            <td className={styles.quantityCol}>
                {promotion["quantity"] ? promotion["quantity"] : "-"}
            </td>
            <td className={styles.priceCol}>
                {Number(promotion["price"]).toLocaleString()}
                <sup>đ</sup>
            </td>
            <td className={styles.actionCol}>
                <ButtonGroup>
                    <ButtonGroup>
                        <PromotionDelete promotion={promotion} />
                        <PromotionEdit promotion={promotion} />
                    </ButtonGroup>
                </ButtonGroup>
            </td>
        </tr>
    );

    const PromotionTable = () => (
        <Loader show={loading} message={<Spinner />}>
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã khuyến mãi</th>
                        <th className={styles.nameCol}>Khuyến mãi</th>
                        <th className={styles.imgCol}>Hình ảnh</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.priceCol}>Trị giá</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    {promotions.map((promotion) => buildRowFromPromotion(promotion))}
                </tbody>
            </Table>
        </Loader>
    );

    const PromotionPagination = () => (
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
            <PromotionTable />
            <PromotionPagination />
        </Fragment>
    );
};

export default withRouter(PromotionList);
