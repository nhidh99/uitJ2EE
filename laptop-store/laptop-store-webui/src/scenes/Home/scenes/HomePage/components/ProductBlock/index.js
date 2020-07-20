import React, { Component } from "react";
import styles from "./styles.module.scss";
import { Button } from "reactstrap";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { convertCPUType } from "../../../../../../services/helper/converter";

class ProductBlock extends Component {
    constructor(props) {
        super(props);
        this.updateResource = this.updateResource.bind(this);
        this.handleReadmoreClicked = this.handleReadmoreClicked.bind(this);
        this.state = {
            isLoading: true,
            productblock: [],
            images: [],
            isAllProduct: false,
        };
    }

    render() {
        let { productblock, isLoading, images } = this.state;
        var products;
        if (productblock.length > 0) {
            products = productblock.map((product, index) => {
                if (!product) {
                    return "";
                }
                let realPrice = product.discount_price
                    ? product.unit_price - product.discount_price
                    : undefined;
                let url = "./product/" + product.id;
                return (
                    <div className={styles.product} key={product.id}>
                        <a href={url}>
                            <div className={styles.productimage}>
                                <img src={images[index]}></img>
                            </div>
                            <table className={styles.productdetail}>
                                <tbody>
                                    <tr>
                                        <td className={styles.name}>{product.name}</td>
                                    </tr>
                                    <tr>
                                        <td
                                            className={styles.price}
                                            style={
                                                product.discount_price
                                                    ? {
                                                          textDecorationLine: "line-through",
                                                          color: "gray",
                                                      }
                                                    : {}
                                            }
                                        >
                                            {product.unit_price.toLocaleString() + "đ"}
                                        </td>
                                    </tr>
                                    {product.discount_price ? (
                                        <tr>
                                            <td className={styles.discountPrice}>
                                                {realPrice.toLocaleString() + "đ"}
                                            </td>
                                        </tr>
                                    ) : (
                                        ""
                                    )}
                                    <tr>
                                        <td>CPU: {convertCPUType(product.cpu.type)}</td>
                                    </tr>
                                    <tr>
                                        <td>RAM: {product.ram.size + "GB"}</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Ổ Cứng:{" "}
                                            {product.hard_drive.type +
                                                " " +
                                                product.hard_drive.size +
                                                "GB"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <Rating
                                            fullSymbol={
                                                <FaStar
                                                    color="#ffc120"
                                                    className={styles.ratingIcon}
                                                />
                                            }
                                            emptySymbol={
                                                <FaStar
                                                    color="lightgray"
                                                    className={styles.ratingIcon}
                                                />
                                            }
                                            initialRating={product.avg_rating}
                                            readonly={true}
                                        />
                                    </tr>
                                </tbody>
                            </table>
                        </a>
                    </div>
                );
            });
        } else {
            products = "";
        }

        return (
            <div className={styles.productblock}>
                <div className={styles.products}>
                    {isLoading ? null : products ? (
                        products
                    ) : (
                        <p
                            style={{
                                fontSize: "18px",
                                color: "darkred",
                                paddingLeft: "5px",
                            }}
                        >
                            Không tìm thấy sản phẩm phù hợp
                        </p>
                    )}
                </div>
                {products && this.state.isAllProduct ? (
                    <Button
                        className={styles.readmore}
                        disabled={this.state.isLoading}
                        onClick={this.handleReadmoreClicked}
                    >
                        Xem thêm...
                    </Button>
                ) : (
                    ""
                )}
            </div>
        );
    }

    updateLoadingState(loading) {
        this.setState({ isLoading: loading });
    }

    handleReadmoreClicked() {}

    updateResource(items, images) {
        console.log("items: " + items);
        this.setState({
            isAllProduct: items.length == 0 ? true : false,
            productblock: this.state.productblock.concat(items),
            isLoading: false,
            images: this.state.images.concat(images),
        });
    }
}

export default ProductBlock;
