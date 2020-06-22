import React, { Component } from "react";
import {
    Label,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
} from "reactstrap";
import styles from "./styles.module.scss";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import ReplyBlock from "./components/ReplyBlock";

class CommentBlock extends Component {
    render() {
        const ratings = this.props.ratings;
        return (
            <ListGroup className={styles.list}>
                {
                    ratings.map((rating) => {
                        const commentDate = rating ? new Date(
                            rating["rating_date"]["year"],
                            rating["rating_date"]["monthValue"] - 1,
                            rating["rating_date"]["dayOfMonth"]
                        ) : null;
                        return <ListGroupItem>
                            <Row>
                                <Col sm="2" className={styles.blockLeft}>
                                    <Label className={styles.commentRating}>
                                        {rating['rating']}&nbsp;
                                    <FaStar />
                                    </Label>
                                    <Label className={styles.commentAuthor}>
                                        {rating['user']['name']}
                                    </Label>
                                    <br />
                                    <Label>{commentDate.toLocaleDateString()}</Label>
                                </Col>

                                <Col sm="10" className={styles.blockRight}>
                                    <Label className={styles.commentTitle}>
                                        {rating['comment_title']}
                                    </Label>
                                    <p>
                                        {rating['comment_detail']}
                                    </p>

                                    <Link
                                        id={"toggler" + rating['id']}
                                        style={{ marginBottom: "1rem" }}
                                    >
                                        Gửi trả lời
                                </Link>
                                    <br />
                                    <br />
                                    <ReplyBlock rating = {rating} replies = {this.props.replies} />
                                </Col>
                            </Row>
                        </ListGroupItem>
                    })
                }

            </ListGroup>
        );
    }
}

export default CommentBlock;
