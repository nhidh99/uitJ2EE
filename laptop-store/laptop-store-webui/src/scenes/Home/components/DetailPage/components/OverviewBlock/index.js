import React, { Component, Fragment } from "react";
import { Col, Label, Button, Input, Row } from "reactstrap";
import styles from "./styles.module.scss";
import Rating from "react-rating";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { convertCPUType, convertResolutionType } from "../../../../../../services/helper";

class OverviewBlock extends Component {
    state = {
        loading: true,
        promotions: [],
    };

    componentDidMount() {
        this.loadData();
    }

    loadData = async () => {
        const productId = this.props.product["id"];
        const response = await fetch(`/api/laptops/${productId}/promotions`);
        if (response.ok) {
            const promotions = await response.json();
            this.setState({
                loading: false,
                promotions: promotions,
            });
        }
    };

    render() {
        const { product } = this.props;
        const { loading, promotions } = this.state;
        return loading ? null : (
            <Fragment>
                <Col xs="4" className={styles.blockLeft}>
                    <ProductImage product={product} />
                </Col>

                <Col xs="8" className={styles.blockRight}>
                    <ProductOverview product={product} />
                    <hr className={styles.divider} />

                    <ProductInfo product={product} />
                    <hr className={styles.divider} />

                    {promotions.length > 0 ? (
                        <Fragment>
                            <ProductPromotions promotions={promotions} />
                            <hr className={styles.divider} />
                        </Fragment>
                    ) : null}

                    <ProductActions />
                </Col>
            </Fragment>
        );
    }
}

const ProductImage = ({ product }) => (
    <img
        src={`/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
        width="300"
        height="300"
        className={styles.img}
        title={`Laptop ${product["name"]}`}
        alt={product["name"]}
    />
);

const ProductOverview = ({ product }) => (
    <div className={styles.blockChild}>
        <div id="product-name">
            <Label className={styles.productName}>Laptop {product["name"]}</Label>
            <Rating
                initialRating={product["avg_rating"]}
                readonly
                fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
            />
        </div>

        <div id="product-price">
            <Label className={styles.currentPrice}>
                {(product["unit_price"] - product["discount_price"]).toLocaleString()}đ
            </Label>
            <Label className={styles.originPrice}>{product["unit_price"].toLocaleString()}đ</Label>
            <Label className={styles.discountPrice}>
                (Giảm {product["discount_price"].toLocaleString()}đ)
            </Label>
        </div>
    </div>
);

const ProductInfo = ({ product }) => {
    const { cpu, ram, hard_drive, monitor } = product;
    return (
        <div className={styles.blockChild}>
            <Label className={styles.infoLabel}>Thông số cơ bản</Label>
            <br />
            <ul className={styles.infoBlock}>
                <li>
                    <label className={styles.infoItem}>
                        <b>CPU:</b>{" "}
                        {`${convertCPUType(cpu["type"])} ${cpu["detail"]}, ${cpu["speed"]} GHz`}
                    </label>
                </li>
                <li>
                    <label className={styles.infoItem}>
                        <b>RAM:</b> {`${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz`}
                    </label>
                </li>
                <li>
                    <label className={styles.infoItem}>
                        <b>Ổ cứng: </b>
                        {`${hard_drive["type"]} 
                            ${hard_drive["size"] === 1024 ? "1 TB" : `${hard_drive["size"]} GB`} 
                            ${hard_drive["detail"]}`}
                    </label>
                </li>
                <li>
                    <label className={styles.infoItem}>
                        <b>Màn hình: </b>
                        {`${monitor["size"]} inch,
                ${convertResolutionType(monitor["resolution_type"])} 
                (${monitor["resolution_width"]} x ${monitor["resolution_height"]})`}
                    </label>
                </li>
            </ul>
        </div>
    );
};

const ProductPromotions = ({ promotions }) => (
    <div className={styles.blockChild}>
        <Label className={styles.promotionLabel}>Quà khuyến mãi</Label>
        {promotions.map((promotion) => (
            <div className={styles.promotionItem}>
                <img
                    src={`/api/images/200/promotions/${promotion["id"]}/${promotion["alt"]}.jpg`}
                    className={styles.promotionImg}
                    alt="promotions"
                    title={promotion["name"]}
                />
                <Label className={styles.promotionName}>
                    {promotion["name"]} <i>({promotion["price"].toLocaleString()}đ)</i>
                </Label>
            </div>
        ))}
    </div>
);

const ProductActions = () => (
    <div className={styles.blockChild}>
        <Row>
            <Col xs="4" className={styles.quantityCol}>
                <Label className={styles.quantityLabel}>Số lượng:</Label>
                <Input
                    type="number"
                    min={1}
                    max={100}
                    placeholder={1}
                    className={styles.quantityInput}
                />
            </Col>
            <Col xs="4" className={styles.quantityCol}>
                <Button color="success">
                    <FaShoppingCart />
                    &nbsp;&nbsp;Thêm vào giỏ hàng
                </Button>
            </Col>
        </Row>
    </div>
);

export default OverviewBlock;
