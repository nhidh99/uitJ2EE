/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Table, ButtonGroup, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import Loader from "react-loader-advanced";
import Pagination from "react-js-pagination";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import { withRouter } from "react-router-dom";
import RatingDelete from "../RatingDelete";
import RatingDetail from "../RatingDetail";
import store from "../../../../../../services/redux/store";
import { buildErrorModal } from "../../../../../../services/redux/actions";
import ratingApi from "../../../../../../services/api/ratingApi";

const RatingList = (props) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [count, setCount] = useState(1);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const page = parseInt(params.get("page"));
        setPage(page ? page : 1);
    }, []);

    useEffect(() => {
        if (!page) return;
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const status = params.get("status");
        if (id === null && status === null) {
            loadData();
        } else {
            search(id, status);
        }
    }, [page]);

    const search = async (id, status) => {
        try {
            const response = await ratingApi.searchRatings(id, status, page);
            const ratings = await response.json();
            setRatings(ratings);
            setCount(count);
            setLoading(false);
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    const loadData = async () => {
        try {
            const response = await ratingApi.getByPage(page);
            const ratings = response.data;
            const count = parseInt(response.headers["x-total-count"]);
            setRatings(ratings);
            setCount(count);
            setLoading(false);
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    const pageChange = (pageNumber) => {
        if (pageNumber === page) return;
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const status = params.get("status");
        if (id === null) {
            props.history.push("/admin/ratings?page=" + pageNumber);
        } else {
            props.history.push(
                "/admin/ratings/search?id=" + id + "&status=" + status + "&page=" + pageNumber
            );
        }
        setPage(pageNumber);
    };

    const buildRowFromRating = (rating) => (
        <tr>
            <td className={styles.idCol}>{rating["id"]}</td>
            <td className={styles.nameCol}>{rating["laptop"]["name"]}</td>
            <td>{rating["rating"]}</td>
            <td className={styles.titleCol}>
                {rating["comment_title"] === null
                    ? ""
                    : rating["comment_title"].length > 30
                    ? rating["comment_title"].substring(0, 30) + "..."
                    : rating["comment_title"]}
            </td>
            <td className={styles.detailCol}>
                {rating["comment_detail"] === null
                    ? ""
                    : rating["comment_detail"].length > 30
                    ? rating["comment_detail"].substring(0, 30) + "..."
                    : rating["comment_detail"]}
            </td>
            <td>{rating["approve_status"] ? "Đã duyệt" : "Chưa duyệt"}</td>
            <td className={styles.actionCol}>
                <ButtonGroup>
                    <ButtonGroup>
                        <RatingDelete rating={rating} />
                        <RatingDetail rating={rating} />
                    </ButtonGroup>
                </ButtonGroup>
            </td>
        </tr>
    );

    const RatingTable = () => (
        <Loader show={loading} message={<Spinner />}>
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã đánh giá</th>
                        <th className={styles.nameCol}>Tên sản phẩm</th>
                        <th className={styles.ratingCol}>Đánh giá</th>
                        <th className={styles.titleCol}>Tiêu đề</th>
                        <th className={styles.detailCol}>Nội dung</th>
                        <th className={styles.statusCol}>Tình trạng</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    {ratings.map((rating) => buildRowFromRating(rating))}
                </tbody>
            </Table>
        </Loader>
    );

    const RatingPagination = () => (
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
            <RatingTable />
            <RatingPagination />
        </Fragment>
    );
};

export default withRouter(RatingList);
