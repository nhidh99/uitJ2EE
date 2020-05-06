import React, { Component, Fragment } from "react";
import { Col, Label, Table, Button, Form, FormGroup } from "reactstrap";
import styles from './styles.module.scss';
import { FaStar, FaPaperPlane } from "react-icons/fa";
import Rating from "react-rating";

class RatingBlock extends Component {
    render() {
        return (
            <Fragment>
                <Col xs="4" className={styles.blockLeft}>
                    <Label className={styles.ratingLabel}>Đánh giá trung bình</Label>
                    <Label className={styles.ratingPoint}>4.8/5</Label>
                    <Label className={styles.commentCount}>(15 đánh giá)</Label>
                    <Table borderless size="sm" className={styles.table}>
                        <tbody>
                            <tr>
                                <td>
                                    <Label className={styles.starLabel}>5 <FaStar /></Label>
                                    <progress value="80" max="100"></progress>
                                    80%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Label className={styles.starLabel}>4 <FaStar /></Label>
                                    <progress value="20" max="100"></progress>
                                    20%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Label className={styles.starLabel}>3 <FaStar /></Label>
                                    <progress value="0" max="100"></progress>
                                    0%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Label className={styles.starLabel}>2 <FaStar /></Label>
                                    <progress value="0" max="100"></progress>
                                    0%
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Label className={styles.starLabel}>1 <FaStar /></Label>
                                    <progress value="0" max="100"></progress>
                                    0%
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
                <Col xs="8" className={styles.blockRight}>
                    <Form>
                        <FormGroup>
                            <Label><b>1. Đánh giá sản phẩm:</b></Label>
                            <Button className={styles.submitButton} color="primary">
                                <FaPaperPlane />&nbsp; Gửi nhận xét
                            </Button><br/>
                            <Rating
                                fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                                emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label class="col-form-Label"><b>2. Tiêu đề nhận xét:</b></Label>
                            <input type="text" class="form-control" maxlength="100" placeholder="(Không bắt buộc)" />
                        </FormGroup>

                        <FormGroup>
                            <Label class="col-form-Label"><b>3. Nội dung nhận xét:</b></Label>
                            <textarea class="form-control" rows="5" placeholder="(Không bắt buộc)"></textarea>
                        </FormGroup>
                    </Form>
                </Col>
            </Fragment >
        )
    }
}

export default RatingBlock;