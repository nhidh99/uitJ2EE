import React, { Component, Fragment } from "react";
import { Col, Label, Button, Input, Row } from "reactstrap";
import styles from './styles.module.scss';
import Rating from "react-rating";
import { FaStar, FaShoppingCart } from 'react-icons/fa';


class OverviewBlock extends Component {
    render() {
        return (
            <Fragment>
                <Col xs="4" className={styles.blockLeft}>
                    <img
                        src="/api/promotions/image"
                        width="300" height="300" alt="laptop"
                    />
                </Col>

                <Col xs="8" className={styles.blockRight}>
                    <div className={styles.blockChild}>
                        <div id="product-name">
                            <Label className={styles.productName}>
                                Laptop Dell Vostro 5490 V4I5106W (Core 5-10210U/ 8GB DDR4 2666MHz/ 256GB M.2 PCIe NVMe/ 14 FHD/ Win10) - Hàng Chính Hiệu
                            </Label>
                        </div>

                        <div id="product-rate">
                            <Rating
                                initialRating={3.6}
                                readonly
                                fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                                emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
                            />
                            <Label className={styles.commentCount}>
                                (15 đánh giá)
                            </Label>
                        </div>

                        <div id="product-price">
                            <Label className={styles.currentPrice}>18,290,000đ</Label>
                            <Label className={styles.originPrice}>19,590,000đ</Label>
                            <Label className={styles.discountPrice}>(Giảm 1,300,000đ)</Label>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.blockChild}>
                        <Label className={styles.promotionLabel}>Quà khuyến mãi</Label>

                        <div className={styles.promotionItem}>
                            <img src={require("../../../../../../images/promotions/chuot-khong-day-genius-nx-7010-ava-1-200x200.jpg")}
                                className={styles.promotionImg} alt="promotions" />
                            <Label className={styles.promotionName}>Chuột không dây <i>(150,000đ)</i></Label>
                        </div>

                        <div className={styles.promotionItem}>
                            <img src={require("../../../../../../images/promotions/balo-lenovo-khuyen-mai-300-200x200.jpg")}
                                className={styles.promotionImg} alt="promotions" />
                            <Label className={styles.promotionName}>Balo Laptop <i>(250,000đ)</i></Label>
                        </div>
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.blockChild}>
                        <Row>
                            <Col xs="4" className={styles.quantityCol}>
                                <Label className={styles.quantityLabel}>
                                    Số lượng:
                                </Label>
                                <Input type="number"
                                    min={1} max={100}
                                    placeholder={1}
                                    className={styles.quantityInput}
                                />
                            </Col>
                            <Col xs="4" className={styles.quantityCol}>
                                <Button color="success">
                                    <FaShoppingCart />&nbsp;&nbsp;Thêm vào giỏ hàng
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Fragment >
        )
    }
}

export default OverviewBlock;