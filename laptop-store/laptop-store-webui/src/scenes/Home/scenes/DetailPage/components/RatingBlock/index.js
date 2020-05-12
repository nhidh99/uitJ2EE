import React, { Component, Fragment } from "react";
import { Col, Label, Table, Button, Form, FormGroup } from "reactstrap";
import styles from './styles.module.scss';
import { FaStar, FaPaperPlane } from "react-icons/fa";
import Rating from "react-rating";
import { getCookie } from "../../../../../../services/helper/cookie";

class RatingBlock extends Component {

    state = {
        rating: 0,
    }
    buildRatingBody = () => {
        const comment_title = document.getElementById("comment_title").value;
        const comment_detail = document.getElementById("comment_detail").value;

        return {
            commentTitle: comment_title,
            commentDetail: comment_detail,
            rating: this.state.rating,
        }
    }

    postRating = async () => {
        const url = "/api/ratings?product-id=" + this.props.product['id']
        const body = this.buildRatingBody();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("access_token"),
            },
            body: JSON.stringify(body),
        });
        const status = parseInt(response.status);
        switch (status) {
            case 201:
                window.location.href = `/product/170001`;
                break;
            case 403:
                this.setState({
                    error: "Not permission",
                    loading: false,
                });
                break;
            case 401:
                alert("You have to login to access this page.");
                window.location.href = "/auth/login";
                break;
            default:
                this.setState({
                    error: "Server error",
                    loading: false,
                });
        }
    };

    handleRatingChange = (value) => {
        this.setState({
            rating: value,
        });
    }

    render() {
        const ratings = this.props.ratings;
        return (
            <Fragment>
                <Col xs="4" className={styles.blockLeft}>
                    <Label className={styles.ratingLabel}>Đánh giá trung bình</Label>
                    <Label className={styles.ratingPoint}>{this.props.product['avg_rating']}/5</Label>
                    <Label className={styles.commentCount}>({ratings?.['length']} đánh giá)</Label>
                    <Table borderless size="sm" className={styles.table}>
                        <tbody>
                            {[5, 4, 3, 2, 1].map(star => (
                                <tr>
                                    <td>
                                        <Label className={styles.starLabel}>{star} <FaStar /></Label>
                                        <progress value={ratings.filter(rating => rating['rating'] === star).length / ratings.length * 100} max="100"></progress>
                                    ({ratings.filter(rating => rating['rating'] === star).length} đánh giá)
                                </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
                <Col xs="8" className={styles.blockRight}>
                    <Form>
                        <FormGroup>
                            <Label><b>1. Đánh giá sản phẩm:</b></Label>
                            <Button className={styles.submitButton} onClick={this.postRating} color="primary">
                                <FaPaperPlane />&nbsp; Gửi nhận xét
                            </Button><br />
                            <Rating
                                onChange={ this.handleRatingChange }
                                initialRating={this.state.rating}
                                fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                                emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label class="col-form-Label"><b>2. Tiêu đề nhận xét:</b></Label>
                            <input type="text" id="comment_title" class="form-control" maxlength="100" placeholder="(Không bắt buộc)" />
                        </FormGroup>

                        <FormGroup>
                            <Label class="col-form-Label"><b>3. Nội dung nhận xét:</b></Label>
                            <textarea id="comment_detail" class="form-control" rows="5" placeholder="(Không bắt buộc)"></textarea>
                        </FormGroup>
                    </Form>
                </Col>
            </Fragment >
        )
    }
}

export default RatingBlock;