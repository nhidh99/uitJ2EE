import React, { Component } from "react";
import { Table, ButtonGroup } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionDelete from "../PromotionDelete";
import PromotionEdit from "../PromotionEdit";
import { getCookie } from "../../../../../../services/helper/cookie";

class PromotionList extends Component {
    state = {
        loading: true,
        promotions: [],
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch("/api/promotions", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('access_token'),
            }
        });

        if (response.ok) {
            const promotions = await response.json();
            this.setState({
                promotions: promotions,
                loading: false,
            });
        }
    };

    render() {
        const { loading, promotions } = this.state;
        return loading ? null : (
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã khuyến mãi</th>
                        <th className={styles.nameCol}>Tên khuyến mãi</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.priceCol}>Trị giá</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    {promotions.map((promotion) => (
                        <tr>
                            <td className={styles.idCol}>{promotion["id"]}</td>
                            <td className={styles.nameCol}>{promotion["name"]}</td>
                            <td className={styles.quantityCol}>
                                {promotion["quantity"] ? promotion["quantity"] : "-"}
                            </td>
                            <td className={styles.priceCol}>
                                {Number(promotion["price"]).toLocaleString()}
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
        );
    }
}

export default PromotionList;
