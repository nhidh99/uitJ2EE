import React, { Component } from "react";
import { Table, ButtonGroup } from "reactstrap";
import styles from "./styles.module.scss";
import PromotionDelete from "../PromotionDelete";
import PromotionUpdate from "../PromotionUpdate";

class PromotionList extends Component {
    render() {
        return (
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã khuyến mãi</th>
                        <th className={styles.nameCol}>Tên khuyến mãi</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.priceCol}>Trị giá</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112843</td>
                        <td className={styles.nameCol}>Balo Laptop Acer</td>
                        <td>20</td>
                        <td className={styles.priceCol}>250,000đ</td>
                        <td>
                            <ButtonGroup>
                                <ButtonGroup>
                                    <PromotionDelete
                                        promotionId={5112843}
                                        promotionName="Balo Laptop Acer"
                                    />
                                    <PromotionUpdate promotionId={5112843} />
                                </ButtonGroup>
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112845</td>
                        <td className={styles.nameCol}>Balo Laptop Dell</td>
                        <td>20</td>
                        <td className={styles.priceCol}>200,000đ</td>
                        <td>
                            <ButtonGroup>
                                <PromotionDelete
                                    promotionId={5112845}
                                    promotionName="Balo Laptop Dell"
                                />
                                <PromotionUpdate promotionId={5112845} />
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>3112841</td>
                        <td className={styles.nameCol}>Chuột không dây</td>
                        <td>12</td>
                        <td className={styles.priceCol}>180,000đ</td>
                        <td>
                            <ButtonGroup>
                                <PromotionDelete
                                    promotionId={3112841}
                                    promotionName="Chuột không dây"
                                />
                                <PromotionUpdate promotionId={3112841} />
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112846</td>
                        <td className={styles.nameCol}>
                            Bộ Microsoft Office Professional
                        </td>
                        <td>-</td>
                        <td className={styles.priceCol}>600,000đ</td>
                        <td>
                            <ButtonGroup>
                                <PromotionDelete
                                    promotionId={5112846}
                                    promotionName="Bộ Microsoft Office Professional"
                                />
                                <PromotionUpdate promotionId={5112846} />
                            </ButtonGroup>
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.idCol}>5112847</td>
                        <td className={styles.nameCol}>
                            Bộ Microsoft Office Enterprise
                        </td>
                        <td>-</td>
                        <td className={styles.priceCol}>800,000đ</td>
                        <td>
                            <ButtonGroup>
                                <PromotionDelete
                                    promotionId={5112847}
                                    promotionName="Bộ Microsoft Office Enterprise"
                                />
                                <PromotionUpdate promotionId={5112847} />
                            </ButtonGroup>
                        </td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default PromotionList;
