import React, { Fragment, useState } from "react";
import { Col, Label, Table, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaStar, FaPaperPlane } from "react-icons/fa";
import Rating from "react-rating";
import { buildModal, buildErrorModal } from "../../../../../../services/redux/actions";
import store from "../../../../../../services/redux/store";
import { useParams } from "react-router-dom";
import ratingApi from "../../../../../../services/api/ratingApi";

const RatingBlock = ({ ratingAvg, ratings }) => {
    const [rating, setRating] = useState(0);
    const { productId } = useParams();

    const postRating = async () => {
        const titleInput = document.getElementById("comment-title");
        const detailInput = document.getElementById("comment-detail");
        const refreshInputs = () => {
            titleInput.value = "";
            detailInput.value = "";
            setRating(0);
            const modal = {
                title: "Đã gửi đánh giá",
                message:
                    "Cảm ơn bạn đã gửi đánh giá về sản phẩm, " +
                    "Laptop Store sẽ xem xét duyệt nhận xét của bạn.",
                confirm: () => null,
            };
            store.dispatch(buildModal(modal));
        };

        try {
            const data = {
                title: titleInput.value.trim(),
                detail: detailInput.value.trim(),
                rating: rating,
            };
            await ratingApi.postRating(productId, data);
            refreshInputs();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    const handleRatingChange = (value) => setRating(value);

    const BlockLeft = () => (
        <Col xs="4" className={styles.blockLeft}>
            <Label className={styles.ratingLabel}>Đánh giá trung bình</Label>
            <Label className={styles.ratingPoint}>{ratingAvg.toFixed(1)}/5.0</Label>
            <Label className={styles.commentCount}>({ratings.length} đánh giá)</Label>

            <Table borderless size="sm" className={styles.table}>
                <tbody>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <tr>
                            <td>
                                <Label className={styles.starLabel}>
                                    {star} <FaStar />
                                </Label>
                                <progress
                                    value={
                                        (ratings.filter((rating) => rating["rating"] === star)
                                            .length /
                                            ratings.length) *
                                        100
                                    }
                                    max="100"
                                ></progress>
                                ({ratings.filter((rating) => rating["rating"] === star).length} đánh
                                giá)
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    );

    const BlockRight = () => (
        <Col xs="8" className={styles.blockRight}>
            <div>
                <Label>
                    <b>1. Đánh giá sản phẩm:</b>
                </Label>

                <Button className={styles.submitButton} onClick={postRating} color="primary">
                    <FaPaperPlane />
                    &nbsp; Gửi đánh giá
                </Button>
                <br />

                <Rating
                    onChange={handleRatingChange}
                    initialRating={rating}
                    fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                    emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
                />
            </div>

            <div>
                <Label class="col-form-Label">
                    <b>2. Tiêu đề nhận xét:</b>
                </Label>

                <input
                    type="text"
                    id="comment-title"
                    class="form-control"
                    maxlength="100"
                    placeholder="(Không bắt buộc)"
                />
            </div>

            <div>
                <Label class="col-form-Label">
                    <b>3. Nội dung nhận xét:</b>
                </Label>

                <textarea
                    id="comment-detail"
                    class="form-control"
                    rows="4"
                    placeholder="(Không bắt buộc)"
                ></textarea>
            </div>
        </Col>
    );

    return (
        <Fragment>
            <BlockLeft />
            <BlockRight />
        </Fragment>
    );
};

export default RatingBlock;
