import React, { Component } from "react";
import { Label, Col, UncontrolledCollapse, Button, Row, ListGroup, ListGroupItem, Table } from "reactstrap";
import styles from './styles.module.scss';
import { FaStar, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

class CommentBlock extends Component {
    render() {
        return (
            <ListGroup>
                <ListGroupItem>
                    <Row>
                        <Col sm="2" className={styles.blockLeft}>
                            <Label className={styles.commentRating}>5&nbsp;<FaStar /></Label>
                            <Label className={styles.commentAuthor}>Nguyễn Văn A</Label><br />
                            <Label>12/04/2020</Label>
                        </Col>

                        <Col sm="10" className={styles.blockRight}>
                            <Label className={styles.commentTitle}>Cực Kì Hài Lòng</Label>
                            <p>
                                Laptop Lenovo Legion Y540-15IRH 81SY0037VN Core i5-9300H/ GTX 1650 4GB/ Dos (15.6 FHD
                                IPS) là một cổ máy chơi game đáp ứng được cả hai nhu cầu của người dùng: Thời thượng
                                trong công việc và mạnh mẽ để chơi game. Lenovo Y540 có một thiết kế gọn gàng với khung
                                nhôm chắc chắn, vỏ ngoài màu xám sắt lạnh lùng và hệ thống chiếu sáng xung quanh lên đến
                                16 triệu màu của công nghệ CorSair ICUE, đã tạo ra một chiếc laptop gaming thách thức
                                mọi giới hạn và kì vọng của game thủ.
                            </p>
                            <Link to="#toggler" id="toggler" style={{ marginBottom: '1rem' }}>Gửi trả lời</Link><br /><br />
                            <UncontrolledCollapse toggler="#toggler">
                                <textarea class={styles.replyInput} rows="5" maxlength="500"
                                    placeholder="Gửi trả lời của bạn (tối đa 500 từ)">
                                </textarea><br />
                                <Button className={styles.submitButton} color="primary">
                                    <FaPaperPlane />&nbsp; Gửi trả lời
                                </Button><br /><br />
                            </UncontrolledCollapse>
                            <Table hover borderless striped className={styles.replyTable}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Label className={styles.replyAuthor}>Nguyễn Văn C</Label>
                                            <Label className={styles.replyDate}>18/04/2020</Label>
                                            <p className={styles.reply}>Mình cũng thích máy này</p>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <Label className={styles.replyAuthor}>Nguyễn Văn D</Label>
                                            <Label className={styles.replyDate}>16/04/2020</Label>
                                            <p className={styles.reply}>Đồng ý kiến</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </ListGroupItem>

                <ListGroupItem>
                    <Row>
                        <Col sm="2" className={styles.blockLeft}>
                            <Label className={styles.commentRating}>5&nbsp;<FaStar /></Label>
                            <Label className={styles.commentAuthor}>Nguyễn Văn A</Label><br />
                            <Label>12/04/2020</Label>
                        </Col>

                        <Col sm="10" className={styles.blockRight}>
                            <Label className={styles.commentTitle}>Cực Kì Hài Lòng</Label>
                            <p>
                                Laptop Lenovo Legion Y540-15IRH 81SY0037VN Core i5-9300H/ GTX 1650 4GB/ Dos (15.6 FHD
                                IPS) là một cổ máy chơi game đáp ứng được cả hai nhu cầu của người dùng: Thời thượng
                                trong công việc và mạnh mẽ để chơi game. Lenovo Y540 có một thiết kế gọn gàng với khung
                                nhôm chắc chắn, vỏ ngoài màu xám sắt lạnh lùng và hệ thống chiếu sáng xung quanh lên đến
                                16 triệu màu của công nghệ CorSair ICUE, đã tạo ra một chiếc laptop gaming thách thức
                                mọi giới hạn và kì vọng của game thủ.
                            </p>
                            <Link to="#toggler-2" id="toggler-2" style={{ marginBottom: '1rem' }}>Gửi trả lời</Link><br /><br />
                            <UncontrolledCollapse toggler="#toggler-2">
                                <textarea class={styles.replyInput} rows="5" maxlength="500"
                                    placeholder="Gửi trả lời của bạn (tối đa 500 từ)">
                                </textarea><br />
                                <Button className={styles.submitButton} color="primary">
                                    <FaPaperPlane />&nbsp; Gửi trả lời
                                </Button><br /><br />
                            </UncontrolledCollapse>
                        </Col>
                    </Row>
                </ListGroupItem>
            </ListGroup>
        )
    }
}

export default CommentBlock;