import React, { Component, Fragment } from "react";
import { Table, ButtonGroup, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionDelete from "../PromotionDelete";
import PromotionEdit from "../PromotionEdit";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";
import Pagination from "react-js-pagination";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";

class PromotionList extends Component {
    state = {
        loading: true,
        activePage: 1,
        promotionCount: 1,
        promotions: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const response = await fetch(`/api/promotions?page=${this.state.activePage}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
        });

        if (response.ok) {
            const promotions = await response.json();
            const promotionCount = parseInt(response.headers.get("X-Total-Count"));
            this.setState({
                promotions: promotions,
                loading: false,
                promotionCount: promotionCount,
            });
        }
    };

    pageChange = (pageNumber) => {
        if (pageNumber === this.state.activePage) return;
        this.setState({ loading: true, activePage: pageNumber }, () => this.loadData());
    };

    render() {
        const { loading, promotions, activePage, promotionCount } = this.state;
        return (
            <Fragment>
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
                            {promotions.map((promotion) => (
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
                            ))}
                        </tbody>
                    </Table>
                </Loader>

                <div className={styles.pagination}>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                        totalItemsCount={promotionCount}
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

export default PromotionList;
